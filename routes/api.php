<?php

use Dingo\Api\Routing\Router;

/** @var Router $api */
$api = app(Router::class);

// Первая версия api
$api->version('v1', function (Router $api) {
    // добавляется префикс в адресной строке auth/api
    $api->group(['prefix' => 'auth'], function(Router $api) {
        // Регистрация (Work)
        $api->post('signup', 'App\\Api\\V1\\Controllers\\SignUpController@signUp');
        // Авторизация(Work)
        $api->post('login', 'App\\Api\\V1\\Controllers\\LoginController@login');
        // Получение данных пользователя и refresh токена (Work)
        $api->post('relogin', 'App\\Api\\V1\\Controllers\\LoginController@relogin');
        // Сброс пароля (In process)
        $api->post('recovery', 'App\\Api\\V1\\Controllers\\ForgotPasswordController@sendResetEmail');
        // Изменение пароля (In process)
        $api->post('reset', 'App\\Api\\V1\\Controllers\\ResetPasswordController@resetPassword');
        // Уничтожить токен (Work)
        $api->post('destroy', 'App\\Api\\V1\\Controllers\\ForgotTokenController@forgotToken');
        // Активация токена (Work)
        $api->get('activated', 'App\\Api\\V1\\Controllers\\SignUpController@activationToken');
    });

    // Только авторизованные и с токеном
    $api->group(['middleware' => 'jwt.auth'], function(Router $api) {
        $api->get('protected', function() {
            return response()->json([
                'message' => 'Access to this item is only for authenticated user. Provide a token in your request!'
            ]);
        });

        $api->get('refresh', [
            'middleware' => 'jwt.refresh',
            function() {
                return response()->json([
                    'message' => 'By accessing this endpoint, you can refresh your access token at each request. Check out this response headers!'
                ]);
            }
        ]);

        $api->get('book', 'App\Api\V1\Controllers\BookController@index');
        $api->post('book/store', 'App\Api\V1\Controllers\BookController@store');

        $api->group(['prefix' => 'user'], function(Router $api) {
            $api->get('user', 'App\Api\V1\Controllers\UserController@index');
            $api->post('update', 'App\Api\V1\Controllers\UserController@update');
        });


    });

    $api->get('hello', function() {
        return response()->json([
            'message' => 'This is a simple example of item returned by your APIs. Everyone can see it.'
        ]);
    });
});
