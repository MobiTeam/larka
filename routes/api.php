<?php

use Dingo\Api\Routing\Router;

/** @var Router $api */
$api = app(Router::class);

// Первая версия api
$api->version('v1', function (Router $api) {
    // добавляется префикс в адресной строке auth/api
    $api->group(['prefix' => 'auth'], function(Router $api) {
        // Регистрация
        $api->post('signup', 'App\\Api\\V1\\Controllers\\SignUpController@signUp');
        // Авторизация(Работает)
        $api->post('login', 'App\\Api\\V1\\Controllers\\LoginController@login');
        // Сброс пароля
        $api->post('recovery', 'App\\Api\\V1\\Controllers\\ForgotPasswordController@sendResetEmail');
        // Изменение пароля
        $api->post('reset', 'App\\Api\\V1\\Controllers\\ResetPasswordController@resetPassword');
        // Уничтожить токен(Работает)
        $api->post('destroy', 'App\\Api\\V1\\Controllers\\ForgotTokenController@forgotToken');
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
        
    });

    $api->get('hello', function() {
        return response()->json([
            'message' => 'This is a simple example of item returned by your APIs. Everyone can see it.'
        ]);
    });
});
