<?php

namespace App\Api\V1\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\library\Sberbank\Payments;
use App\library\Sberbank\Currency;

class SberbankController extends Controller
{

    public function index()
    {
        return Currency::RUB;
        
    }

}
