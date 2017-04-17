<?php

namespace App\Api\V1\Controllers;

use JWTAuth;
use App\User_tsgroup;
use App\Info_group;
use App\Log_payments;
use App\User;
use Carbon\Carbon;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Tymon\JWTAuth\Exceptions\JWTException;
use Dingo\Api\Routing\Helpers;


// Тренировочные группы сезона и пользователи

class UserTsgroupController extends Controller
{
    use Helpers;

    public function index()
    {
        $token = JWTAuth::getToken();
        $user = JWTAuth::toUser($token);
        // $groups =
        return $user->tsgroup()->get();
    }

    public function create_relation(Request $resuest)
    {
        // Получаем пользователя и его баланс
        $token = JWTAuth::getToken();
        $user = JWTAuth::toUser($token);
        // Средства на балансе у пользователя
        $userBalance = $user->balance;
        // Получаем номер группы, в которую он хочет записаться
        $group_id = $resuest->input('info_group_id');
        $Group = info_group::find($group_id);
        // Стоимость сезона
        $costGroup = $Group->price;
        // Проверяем хватает ли пользователю средств для записи на сезон
        if ($userBalance >= $costGroup) {
            // Проверяем имеются ли свободные места
            $emptyCapacity = ($Group->capacity) - (info_group::find($group_id)->users()->count());
            if ($emptyCapacity > 0) {
                // Вычитаем сумму вступления в группу из баланса пользователя
                $user->balance -=$costGroup;
                $user->save();

                // Заносим данные по оплате в логи
                $log = new Log_payments();
                $log->user_id = $user->id;
                // За какую группу оплата
                $log->payments_id = $group_id;
                $log->amount = $costGroup;
                $log->type = 2;
                $log->isApproved = 1;
                $log->save();

                // Привязываем пользователя к определенной группе
                $userTsgroup = new User_tsgroup();
                $userTsgroup->user_id = $user->id;
                $userTsgroup->info_group_id = $group_id;
                $userTsgroup->save();

                return response()->json(['message' => 'Запись проведена успешно!'], 200);
            }
            else {
                return response()->json(['message' => 'Все места в группе уже заняты!'], 403);
            }
        }
        else{
            return response()->json(['message' => 'Недостаточно средств для записи в группу!'], 403);
        }
    }
}
