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
        // Обновление токена
        $api->get('refresh', [
            'middleware' => 'jwt.refresh',
            function() {
                return response()->json([
                    'message' => 'By accessing this endpoint, you can refresh your access token at each request. Check out this response headers!'
                ]);
            }
        ]);

        // Профиль пользователя (Work)
        $api->group(['prefix' => 'user'], function(Router $api) {
            $api->get('user', 'App\Api\V1\Controllers\UserController@index');
            $api->post('update', 'App\Api\V1\Controllers\UserController@update');
        });

        // Сезоны (Work)
        $api->group(['prefix' => 'season'], function(Router $api) {
            $api->get('season', 'App\Api\V1\Controllers\SeasonController@index');
            $api->get('brief_index', 'App\Api\V1\Controllers\SeasonController@brief_index');
            $api->get('season_group', 'App\Api\V1\Controllers\SeasonController@group');
            $api->post('create', 'App\Api\V1\Controllers\SeasonController@create');
            $api->get('show/{id}', 'App\Api\V1\Controllers\SeasonController@show');
            $api->post('update/{id}', 'App\Api\V1\Controllers\SeasonController@update');
            $api->delete('delete/{id}', 'App\Api\V1\Controllers\SeasonController@destroy');
        });

        // Группы (Work)
        $api->group(['prefix' => 'group'], function(Router $api) {
            $api->get('group', 'App\Api\V1\Controllers\InfoGroupController@index');
            $api->post('create', 'App\Api\V1\Controllers\InfoGroupController@create');
            $api->get('show/{id}', 'App\Api\V1\Controllers\InfoGroupController@show');
            $api->post('update/{id}', 'App\Api\V1\Controllers\InfoGroupController@update');
            $api->delete('delete/{id}', 'App\Api\V1\Controllers\InfoGroupController@destroy');
        });

        // Работа со сбербанком
        $api->group(['prefix' => 'sberbank'], function(Router $api){
            // Все произведенные оплаты пользователя
            $api->get('index', 'App\Api\V1\Controllers\SberbankController@index');
            // Создание оплаты, посылается только amount и token
            $api->post('create', 'App\Api\V1\Controllers\SberbankController@create');
            // Получение статуса заказа
            $api->post('status', 'App\Api\V1\Controllers\SberbankController@statusOrder');
            // Получение списка всех оплат
            $api->get('list', 'App\Api\V1\Controllers\SberbankController@list');
        });

        // Работа с привязкой пользователей к сезонам
        $api->group(['prefix' => 'tsgroup'], function(Router $api){
            $api->get('index', 'App\Api\V1\Controllers\UserTsgroupController@index');
            //
            $api->get('list', 'App\Api\V1\Controllers\UserTsgroupController@list');
            // Запись на сезон
            $api->post('create', 'App\Api\V1\Controllers\UserTsgroupController@create_relation');
            // Бронирование сезона
            $api->post('create_booking', 'App\Api\V1\Controllers\UserTsgroupController@create_booking_relation');
            // Доплата за бронирование
            $api->post('pay_booking', 'App\Api\V1\Controllers\UserTsgroupController@booking_pay');
        });

        // Работа с событиями сезона
        $api->group(['prefix' => 'event'], function(Router $api){
            // Показать все действующие события
            $api->get('index', 'App\Api\V1\Controllers\EventController@index');
            // Показать все действующие события в кратком виде
            $api->get('brief_index/{id}', 'App\Api\V1\Controllers\EventController@brief_index');
            // Получить список всех событий действующих
            $api->get('list', 'App\Api\V1\Controllers\EventController@list');
            // Показ определенного события
            $api->get('show/{id}', 'App\Api\V1\Controllers\EventController@show');
            // Содание события
            $api->post('create', 'App\Api\V1\Controllers\EventController@create');
            // Обновление события
            $api->post('update/{id}', 'App\Api\V1\Controllers\EventController@update');
            // Удаление события
            $api->delete('delete/{id}', 'App\Api\V1\Controllers\EventController@destroy');
        });

        // Работа с временем события сезона
        $api->group(['prefix' => 'event_time'], function(Router $api){
            // Показать все действующие времена и события
            $api->get('index', 'App\Api\V1\Controllers\EventTimeController@index');
            // Показать все действующие времена для конкретного события
            $api->get('brief_index/{id}', 'App\Api\V1\Controllers\EventTimeController@brief_index');
            // Вывести все текущие времена c событием
            // $api->get('list', 'App\Api\V1\Controllers\EventTimeController@list');
            // Показ определенного времени события
            $api->get('show/{id}', 'App\Api\V1\Controllers\EventTimeController@show');
            // Содание времени для события
            $api->post('create', 'App\Api\V1\Controllers\EventTimeController@create');
            // Обновление времени для события
            $api->post('update/{id}', 'App\Api\V1\Controllers\EventTimeController@update');
            // Удаление время события
            $api->delete('delete/{id}', 'App\Api\V1\Controllers\EventTimeController@destroy');
        });

        // Работа с пользователем и событиями
        $api->group(['prefix' => 'user_event'], function(Router $api){
            // Вывести список всех действущих событий с сезонами и временами
            $api->get('index', 'App\Api\V1\Controllers\UserEventController@index');
            // Вывести все события на которые записан пользователь и на которые может записаться
            $api->get('show', 'App\Api\V1\Controllers\UserEventController@listEvent');
            // Вывести все события на которые записан пользователь и на которые может записаться с сезонами
            $api->get('list', 'App\Api\V1\Controllers\UserEventController@list');
            // Показ события пользователю
            // $api->get('show/{id}', 'App\Api\V1\Controllers\UserEventController@show');
            // Содание времени для события
            $api->post('create', 'App\Api\V1\Controllers\UserEventController@create');
            // Обновление времени для события
            $api->post('update', 'App\Api\V1\Controllers\UserEventController@update');
            // Удаление время события
            $api->post('delete', 'App\Api\V1\Controllers\UserEventController@destroy');
        });

    });

    // Работа с ответами сбербанка
    $api->group(['prefix' => 'response-sberbank'], function(Router $api){
        // Обработка ответов от сбербанка
        $api->any('create-success', 'App\Api\V1\Controllers\SberbankController@createSuccess');
        $api->any('create-fail', 'App\Api\V1\Controllers\SberbankController@createFail');
    });

    /**/
});
