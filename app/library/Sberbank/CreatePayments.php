<?php

namespace App\library\Sberbank;

/**
 * Работа с оплатой сбербанка
 */
class CreatePayments
{
    // Логин магазина, полученный при подключении
    private $userName;
    // Пароль магазина, полученный при подключении
    private $password;
    // Выполняемое действие, т.е. регистрация нового заказа
    private $actionUri = 'register.do';

    function __construct()
    {
        $this->userName = \Config::get('sberbank.login');
        $this->password = \Config::get('sberbank.password');
    }
    // Адреса API
    // Боевой адрес
    const API_URI      = 'https://securepayments.sberbank.ru/payment/rest/';
    // Тестовый адрес
    const API_URI_TEST = 'https://3dsec.sberbank.ru/payment/rest/';

    // Адрес успешного завершения
    protected $apiUriSuccess = "http://fitness.local/sberbank_response";
    // Адрес неуспешного завершения оплаты
    protected $apiUriFail = "http://fitness.local/sberbank_response";
    // Язык в кодировке ISO 639-1
    // Сумма заказа
    protected $amount;
    // Номер (идентификатор) заказа в системе магазина, уникален для каждого магазина в пределах системы
    protected $orderNumber;

    public function registerOrder($amountNew, $orderNumberNew)
    {
        $this->amount = $amountNew;
        $this->orderNumber = $orderNumberNew;
        return $this->executeRegisterOrder();
    }

    public function executeRegisterOrder()
    {
        // $uri = self::API_URI_TEST . $this->$actionUri;

        $headers = array(
            'Cache-Control: no-cache',
        );
        $data = [];
        $data['userName'] = $this->userName;
        $data['password'] = $this->password;
        $data['amount']   = $this->amount;
        $data['orderNumber'] = $this->orderNumber;
        $data ['returnUrl'] = $this->apiUriSuccess;
        $data ['failUrl'] = $this->apiUriFail;

        print_r ($data);
        return '';
    }


}

 ?>
