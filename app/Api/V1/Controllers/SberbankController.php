<?php

namespace App\Api\V1\Controllers;

use JWTAuth;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\library\Sberbank\CreatePayments;
use App\library\Sberbank\Currency;
use App\User_payments;
use App\Log_payments;
use App\User;
use App\library\Sber\SberbankAcquiring\Client;
use App\library\Sber\SberbankAcquiring\OrderStatus;

class SberbankController extends Controller
{
    // Получаем все данные по оплатам пользователя
    public function index()
    {
        $token = JWTAuth::getToken();
        $user = JWTAuth::toUser($token);
        $userPayments = User::find($user['id'])->user_payments()->get();
        return response()->json(['userPayments' => $userPayments], 200);
    }

    // Создать форму для оплаты
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

    // Успешная оплата
    public function createSuccess(Request $request)
    {
        // Получаем ID заказа и ставим статус оплачено для заказа
        $paymentOrderId = $request->input(['orderId']);
        $payments = User_payments::where('payments_id', $paymentOrderId)->first();
        $payments->isApproved = 1;
        $payments->save();

        // Получаем текущий баланс пользователя
        $user = User::find($payments['user_id'])->first();
        $currentUserBalance = $user->balance;

        // Прибавляем к текущему балансу одобренную сумму
        $balance = $currentUserBalance + $payments->amount;
        $user->balance = $balance;
        $user->save();

        // Заносим данные по оплате в логи
        $log = new Log_payments();
        $log->user_id = $payments['user_id'];
        $log->payments_id = $payments->payments_id;
        $log->amount = $payments->amount;
        $log->type = 1;
        $log->isApproved = 1;
        $log->save();

        return response()->json([
            'status' => 'ok'
        ], 200);
    }

    // Оплата не прошла
    public function createFail(Request $request)
    {
        $paymentOrderId = $request->input(['orderId']);
        $payments = User_payments::where('payments_id', $paymentOrderId)->first();
        $payments->isApproved = 0;
        $payments->save();

        // Заносим данные по ошибочной оплатев логи
        $log = new Log_payments();
        $log->user_id = $payments['user_id'];
        $log->payments_id = $payments->payments_id;
        $log->amount = $payments->amount;
        $log->type = 1;
        $log->isApproved = 0;
        $log->save();

        return response()->json([
            'status' => 'fail'
        ], 200);
    }

}
