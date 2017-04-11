<?php

namespace App\Api\V1\Controllers;

use JWTAuth;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\library\Sberbank\CreatePayments;
use App\library\Sberbank\Currency;
use App\User_payments;
use App\library\Sber\SberbankAcquiring\Client;
use App\library\Sber\SberbankAcquiring\OrderStatus;

class SberbankController extends Controller
{

    public function index()
    {
        return Currency::RUB;
    }

    public function create(Request $request)
    {
        // Получаем данные
        $currentUser = JWTAuth::parseToken()->authenticate();
        $inputData = $request->only(['amount']);

        // Сохраняем запись с пустым payments_id, для отправки заказа в сбербанк
        $currentUserId = $currentUser['id'];
        $userPayments = new User_payments();
        $userPayments->user_id = $currentUserId;
        $userPayments->amount = $inputData['amount'];
        $userPayments->save();
        // Получаем id записи для отправки в сбербанк
        $userPaymentsId = $userPayments->id;

        // Создаём нового клиента
        $client = new Client([ 'userName' => \Config::get('sberbank.login'), 'password' => \Config::get('sberbank.password') ]);

        // Обязательные параметры
        $orderId     = $userPayments->id;
        $orderAmount = $inputData['amount'];
        $returnUrl   = \Config::get('app.url').'api/sberbank/create-success';

        // Необязательные параметры
        $params['failUrl']  = \Config::get('app.url').'api/sberbank/create-fail';

        $result = $client->registerOrder($orderId, $orderAmount, $returnUrl, $params);

        print_r($result);

        // print_r();exit;



        return (new CreatePayments())->registerOrder(13, 2000);
    }

    public function createSuccess()
    {
        return "SUCCESS";
    }

    public function createFail()
    {
        return "FAIL";
    }

}
