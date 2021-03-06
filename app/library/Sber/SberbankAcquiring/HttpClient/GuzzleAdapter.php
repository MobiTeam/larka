<?php

namespace App\library\Sber\SberbankAcquiring\HttpClient;

use GuzzleHttp\ClientInterface;

/**
 * Adapter for the guzzle.
 *
 * @see http://docs.guzzlephp.org/en/latest/
 */
class GuzzleAdapter implements HttpClientInterface
{
    private $client;

    public function __construct(ClientInterface $client)
    {
        $this->client = $client;
    }

    public function request($uri, $method = 'GET', array $headers = array(), array $data = array())
    {
        $response = $this->client->request($method, $uri, array('headers' => $headers, 'form_params' => $data));

        return array($response->getStatusCode(), $response->getBody());
    }
}
