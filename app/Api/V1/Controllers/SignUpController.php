<?php

namespace App\Api\V1\Controllers;

use Config;
use App\User;
use Tymon\JWTAuth\JWTAuth;
use App\Http\Controllers\Controller;
use App\Api\V1\Requests\SignUpRequest;
use Dingo\Api\Routing\Helpers;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;
use Illuminate\Support\Facades\Mail;

use Illuminate\Http\Request;

class SignUpController extends Controller
{
    use Helpers;
    /*
      POST - valid email
      response:
      201 - created (successfull)
      409 - email exists
      422 - email not valid
      500 - error
    */
    public function signUp(SignUpRequest $request, JWTAuth $JWTAuth)
    {
        $email = $request->email;
        $pass  = $this->passGenerate();
        $api_token = password_hash(uniqid(), PASSWORD_BCRYPT);

        $user = new User();

        if (User::where('email', $email)->count() > 0) {
          return $this->response->noContent()->setStatusCode(409);
        }
        else {
          $user->email = $email;
          $user->password = $pass;
          $user->activated_token = $api_token;
          $user->save();

          $data = array(
              'email'     => $email,
              'password'  => $pass,
              'api_token' => $api_token,
              'year'      => date('Y')
          );
          // Отправление письма
          Mail::send('emails.registration', $data, function ($message) use ($email) {
              $message->from('noreply@xn----ctbk1ajm0a.xn--p1ai', 'В-Форме');

              $message->to($email)->subject('Регистрация нового пользователя');
          });

          return response()->json(['status' => 'ok'], 201);

          // В зависимости от статуса sign_up.release_token в конфиге слать просто ответ или сразу с токеном
/*          if(!Config::get('boilerplate.sign_up.release_token')) {
              return response()->json([
                  'status' => 'ok',
              ], 201);
          }

          $token = $JWTAuth->fromUser($user);
          return response()->json([
              'status' => 'ok',
              'token' => $token
          ], 201);*/

        }
    }

    // Активация токена
    // Получаем GET запросом токен и ищим совпадение в базе данных, в случае успеха - активируем и редиректим на страницу логина
    public function activationToken(Request $request) {
      $activatedToken = $request->token;
      if (((User::where('activated_token', $activatedToken)->count()) == 0)) {
          return $this->response->noContent()->setStatusCode(403);
      }
      else {
        User::where('activated_token', $activatedToken)->update(['is_activated' => 1]);
        return redirect()->to('/login');
      }

    }

    // Функция генерации пароля
    private function passGenerate(){
      $alphabet = "abcdefghijklmnopqrstuwxyzABCDEFGHIJKLMNOPQRSTUWXYZ0123456789";
      $pass = array(); //remember to declare $pass as an array
      $alphaLength = strlen($alphabet) - 1; //put the length -1 in cache
      for ($i = 0; $i < 6; $i++) {
          $n = rand(0, $alphaLength);
          $pass[] = $alphabet[$n];
      }
      return implode($pass); //turn the array into a string
  }
}
