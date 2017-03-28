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

// Главная страница
Route::get('/', function () {
    return view('index');
});
// Фотогаллерея
Route::get('photogallery', function () {
    return view('photogallery');
});
// Новости
Route::get('news', function () {
    return view('news');
});
// Контакты
Route::get('contact', function () {
    return view('contact');
});
// Контакты
Route::post('feedback', 'FeedbacksController@store');

// О нас
Route::get('about', function () {
    return view('about');
});

// Все роутинги, которых нет здесь и на странице api.php, шлем на view react
Route::get('{any?}', function ($any = null) {
    return view('react');
})->where('any', '.*');
