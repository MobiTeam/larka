<?php

namespace App\Api\V1\Controllers;

use Config;
use App\User;
use Tymon\JWTAuth\JWTAuth;
use App\Http\Controllers\Controller;
use App\Api\V1\Requests\SignUpRequest;
use Dingo\Api\Routing\Helpers;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Illuminate\Support\Facades\Mail;

class SignUpController extends Controller
{
    use Helpers;

    public function signUp(SignUpRequest $request, JWTAuth $JWTAuth)
    {

        $email = $request->email;
        $pass  = $this->passGenerate();
        $api_token = password_hash(uniqid(), PASSWORD_BCRYPT);

        $user = new User();

        if (User::where('email', $email)->count() > 0) {
          return $this->response->noContent()->setStatusCode(500);
        }
        else {
          $user->email = $email;
          $user->password = $pass;
          $user->activated_token = $api_token;
          $user->save();

          $data = array(
              'email'     => $email,
              'password'  => $pass,
              'api_token' => $api_token,
              'year'      => date('Y')
          );

          Mail::send('emails.registration', $data, function ($message) use ($email) {
              $message->from('ugrafitness@gmail.com', 'Ugra-fit');

              $message->to($email)->subject('Регистрация нового пользователя');
          });

          if(!Config::get('boilerplate.sign_up.release_token')) {
              return response()->json([
                  'status' => 'ok',
              ], 201);
          }

          $token = $JWTAuth->fromUser($user);
          return response()->json([
              'status' => 'ok',
              'token' => $token
          ], 201);
        }
    }


    private function passGenerate(){
      $alphabet = "abcdefghijklmnopqrstuwxyzABCDEFGHIJKLMNOPQRSTUWXYZ0123456789";
      $pass = array(); //remember to declare $pass as an array
      $alphaLength = strlen($alphabet) - 1; //put the length -1 in cache
      for ($i = 0; $i < 8; $i++) {
          $n = rand(0, $alphaLength);
          $pass[] = $alphabet[$n];
      }
      return implode($pass); //turn the array into a string
  }
}
