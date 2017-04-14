<?php

namespace App\Api\V1\Controllers;

use JWTAuth;
use Carbon\Carbon;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Tymon\JWTAuth\Exceptions\JWTException;
use Dingo\Api\Routing\Helpers;

class TgroupSeasonController extends Controller
{
    use Helpers;

    public function create_relation(Request $resuest)
    {
        return "123";
    }

}
