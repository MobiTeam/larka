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

    // POST amount
    public function create(Request $request)
    {
        // Получаем данные
        $currentUser = JWTAuth::parseToken()->authenticate();
        $inputData = $request->only(['amount']);
        $amount = str_replace(',', '.', $inputData['amount']);
        // Сохраняем запись с пустым payments_id, для отправки заказа в сбербанк
        $currentUserId = $currentUser['id'];
        $userPayments = new User_payments();
        $userPayments->user_id = $currentUserId;
        $userPayments->amount = $amount;
        $userPayments->save();
        // Получаем id записи для отправки в сбербанк
        $userPaymentsId = $userPayments->id;

        // Создаём нового клиента
        $client = new Client([ 'userName' => \Config::get('sberbank.login'), 'password' => \Config::get('sberbank.password'), 'apiUri' => Client::API_URI_TEST ]);

        // Обязательные параметры
        $orderId     = $userPayments->id;
        // Переводим в копейки
        $orderAmount = $amount * 100;
        $returnUrl   = \Config::get('app.url').'api/response-sberbank/create-success';

        // Необязательные параметры
        $params['failUrl']  = \Config::get('app.url').'api/response-sberbank/create-fail';
        // Отправляем запрос в сбербанк для получения формы и номера оплаты
        $result = $client->registerOrder($orderId, $orderAmount, $returnUrl, $params);

        $paymentOrderId = $result['orderId'];
        $paymentFormUrl = $result['formUrl'];
        // Сохраняем номер оплаты
        $userPayments->payments_id = $paymentOrderId;
        $userPayments->save();
        // Возвращаем результат на клиент
        return $result;
    }

    public function createSuccess(Request $request)
    {
        echo "1";
        // return $request->all();
    }

    public function createFail()
    {
        echo "2";
        return $request->all();
    }

}
