<?php

namespace App\Api\V1\Controllers;

use JWTAuth;
use Dingo\Api\Routing\Helpers;
use Symfony\Component\HttpKernel\Exception\HttpException;
use App\Http\Controllers\Controller;
use Tymon\JWTAuth\Exceptions\JWTException;
use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;

use Illuminate\Http\Request;

class ForgotTokenController extends Controller
{

   use Helpers;

    public function forgotToken() {
      $token = JWTAuth::getToken();
      if ($token) {
          JWTAuth::setToken($token)->invalidate();
      }
          return $this->response->noContent()->setStatusCode(200);
    }
}
