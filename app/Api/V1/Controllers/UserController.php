<?php

namespace App\Api\V1\Controllers;

use Carbon\Carbon;
use App\User;
use JWTAuth;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Dingo\Api\Routing\Helpers;
use Symfony\Component\HttpKernel\Exception\HttpException;

class UserController extends Controller
{

    use Helpers;

    public function index()
    {
         $currentUser = JWTAuth::parseToken()->authenticate();
         return $currentUser->toArray();
    }

    public function update(Request $request)
    {
        $currentUser = JWTAuth::parseToken()->authenticate();
        // Указываем какие переменные получить
        $inputData = $request->only(['family_name', 'name', 'born_date', 'sex', 'phone', 'photo_link']);
        $currentUser->family_name = $inputData['family_name'];
        $currentUser->name        = $inputData['name'];
        $currentUser->born_date   = $inputData['born_date'];
        // $currentUser->born_date   = Carbon::createFromFormat('d.m.Y', $inputData['born_date'])->format('Y-m-d');
        $currentUser->sex         = $inputData['sex'];
        $currentUser->phone       = $inputData['phone'];
        $currentUser->photo_link  = $inputData['photo_link'];
        $dat = $inputData['born_date'];
        $currentUser->save();
        return response()
            ->json([
                'status' => $inputData,
            ]);

    }

}
