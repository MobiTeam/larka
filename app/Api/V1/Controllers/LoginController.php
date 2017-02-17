<?php

namespace App\Api\V1\Controllers;
use App\User;
use JWTAuth as JWT;
use App\Http\Controllers\Controller;
use App\Api\V1\Requests\LoginRequest;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;
use Tymon\JWTAuth\JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Facades\JWTFactory;



class LoginController extends Controller
{

    /*
      POST - email and password
      response:
      200 - ok (successfull)
      401 - Unauthorized - Not activated
      403 - Forbidden (incorrect password or email)
      500 - error
    */
    public function login(LoginRequest $request, JWTAuth $JWTAuth)
    {
        // Получаем данные email и password
        $credentials = $request->only(['email', 'password']);

        try {
            // По email определяем роль пользователя

            // Проверяем существует ли пользователь с данным email, в случае отсутствия выдаём 403 ошибку
            if ((User::where('email', $credentials['email'])->count()) == 0){
                throw new AccessDeniedHttpException();
            }

            // Проверяем активирована ли данная почта, в случае, если нет выдаём 401 ошибку
            if (((User::where('email', $credentials['email'])->get())[0]['is_activated']) == 0) {
               throw new HttpException(401);
            }

            // Проверяем с помощью JWTAuth логин и пароль пользователя
            $user_id = (User::where('email', $credentials['email'])->get())[0]['id'];
            $user_group_name = (User::where('email', $credentials['email'])->find($user_id)->user_group()->get())[0]['name'];
            // Авторизация через токен
            $token = $JWTAuth->attempt($credentials,['user_group' => $user_group_name]);
            // В случае неправильного пароля выдаём 403 ошибку
            if(!$token) {
                throw new AccessDeniedHttpException();
            }
        // Если произошла ошибка выдаём 500 ошибку
        } catch (JWTException $e) {
            throw new HttpException(500);
        }

        $claims = JWT::getJWTProvider()->decode($token);
        // Возвращаем 200 код, свежий токен и payload юзера
        return response()
            ->json([
                'status' => 'ok',
                'token'  => $token,
                'payload'=> $claims,
            ]);
    }

    /*
    В Authorization Bearer{} передаём token
    Если всё нормально - возвращаем 200 код
    Если токен просрочен, пользователя нет и т.п. - возвращаем 500
    */
    public function relogin() {
      try {
          if (! $user = JWT::parseToken()->authenticate()) {
                return $this->response->noContent()->setStatusCode(500);
                // return response()->json(['user_not_found'], 500);
          }
      } catch (Tymon\JWTAuth\Exceptions\TokenExpiredException $e) {
          return $this->response->noContent()->setStatusCode(500);
        //   return response()->json(['token_expired'], $e->getStatusCode());
      } catch (Tymon\JWTAuth\Exceptions\TokenInvalidException $e) {
          return $this->response->noContent()->setStatusCode(500);
        //   return response()->json(['token_invalid'], $e->getStatusCode());
      } catch (Tymon\JWTAuth\Exceptions\JWTException $e) {
          return $this->response->noContent()->setStatusCode(500);
        //   return response()->json(['token_absent'], $e->getStatusCode());
      }
      // Убиваем полученный токен
      JWT::setToken(JWT::getToken())->invalidate();
      // Получаем новый токен для юзера
      $token = JWT::fromUser($user);
      $claims = JWT::getJWTProvider()->decode($token);
      return response()
          ->json([
              'token' => $token,
              'payload' => $claims,
          ]);
    }
}
