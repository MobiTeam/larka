<?php

    namespace App\library\Sberbank;

    /**
     *  Handle order status
     */
    class OrderStatus
    {

        // An order was successfully registered, but is'nt paid yet
        // Обработка запроса прошла без системных ошибок
        const CREATED = 0;
        // An order's amount was successfully holded (for two-stage payments only)
        const APPROVED = 1;
        // An order was deposited
        // If you want to check whether payment was successfully paid - use this constant
        const DEPOSITED = 2;
        // An order was reversed
        const REVERSED = 3;
        // An order was refunded
        const REFUNDED = 4;
        // An order authorization was initialized by card emitter's ACS
        const AUTHORIZATION_INITIALIZED = 5;
        // An order was declined
        const DECLINED = 6;

/*        function __construct(argument)
        {
            # code...
        }*/
    }



 ?>
