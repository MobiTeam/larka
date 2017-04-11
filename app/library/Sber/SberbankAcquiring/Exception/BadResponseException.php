<?php

namespace App\library\Sber\SberbankAcquiring\Exception;

/**
 *
 */
class BadResponseException extends SberbankAcquiringException
{
    private $response;

    public function getResponse()
    {
        return $this->response;
    }

    public function setResponse($response)
    {
        $this->response = $response;

        return $this;
    }
}
