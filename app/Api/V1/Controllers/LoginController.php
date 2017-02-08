<?php

namespace App\Api\V1\Controllers;

use Symfony\Component\HttpKernel\Exception\HttpException;
use Tymon\JWTAuth\JWTAuth as JWTAuth;
use App\Http\Controllers\Controller;
use App\Api\V1\Requests\LoginRequest;
use Tymon\JWTAuth\Exceptions\JWTException;
use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;
use App\User;

class LoginController extends Controller
{
    public function login(LoginRequest $request, JWTAuth $JWTAuth)
    {
        // Получаем данные
        $credentials = $request->only(['email', 'password']);

        try {
            // По email определяем роль пользователя
            $user_id = (User::where('email', $credentials['email'])->get())[0]['id'];
            $user_group_name = (User::where('email', $credentials['email'])->find($user_id)->user_group()->get())[0]['name'];
            // Авторизация через токен
            $token = $JWTAuth->attempt($credentials,['user_group' => $user_group_name]);

            if(!$token) {
                throw new AccessDeniedHttpException();
            }
            
        } catch (JWTException $e) {
            throw new HttpException(500);
        }

        return response()
            ->json([
                'status' => 'ok',
                'token'  => $token
            ]);
    }
}
