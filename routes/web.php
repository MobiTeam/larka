<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::get('sendemail', function () {

    $data = array(
        'email' => "Viking0607@mail.ru",
        'password' => "123",
        'api_token' => "Блабла"
    );

    Mail::send('emails.registration', $data, function ($message) {

        $message->from('ugrafitness@gmail.com', 'Learning Laravel');

        $message->to('Viking0607@mail.ru')->subject('Learning Laravel test email');

    });

    return "Your email has been sent successfully";

});
