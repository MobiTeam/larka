<?php

namespace App\library\Sber\SberbankAcquiring\HttpClient;

use App\library\Sber\SberbankAcquiring\Exception\NetworkException;

/**
 * Simple HTTP client interface.
 *
 */
interface HttpClientInterface
{
    /**
     * Send an HTTP request.
     *
     * @param string $uri
     * @param string $method
     * @param array  $headers
     * @param array  $data
     *
     * @throws NetworkException
     *
     * @return array A response
     */
    public function request($uri, $method = 'GET', array $headers = array(), array $data = array());
}
