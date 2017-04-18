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
        $infoUserGroup = $user->tsgroup()->get();
        $userGroup = [];
        // Добавление сколько осталось заплатить к информации о группах, в которых состоит пользователь
        foreach ($infoUserGroup->toArray() as $key => $value) {
            $paydGroupUser = (User_tsgroup::where([
                                                 ['user_id',$user->id],
                                                 ['info_group_id',$value['id']]])->get()->first())->toArray();
            $userGroup[$key] = $value;
            $userGroup[$key]['leftPayd'] = $paydGroupUser['leftPayd'];
        }
        return $userGroup;
    }

    // Привязка пользователя к тренировочной сезонной группе полностью
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
                $userTsgroup->leftPayd = 0;
                $userTsgroup->save();

                return response()->json(['message' => 'Запись проведена успешно!'], 200);
            }
            else {
                return response()->json(['message' => 'Все места в группе уже заняты!'], 403);
            }
        }
        else {
            return response()->json(['message' => 'Недостаточно средств для записи в группу!'], 403);
        }
    }

    // Привязка пользователя к тренировочной сезонной группе через бронирование
    public function create_booking_relation(Request $resuest)
    {
        // Получаем пользователя и его баланс
        $token = JWTAuth::getToken();
        $user = JWTAuth::toUser($token);
        // Средства на балансе у пользователя
        $userBalance = $user->balance;
        // Получаем номер группы, в которую он хочет записаться
        $group_id = $resuest->input('info_group_id');
        $Group = info_group::find($group_id);
        // Стоимость бронирования сезона
        $costBookingGroup = $Group->booking_price;
        // Проверяем хватает ли пользователю средств для бронирования сезона
        if ($userBalance >= $costBookingGroup) {
            // Проверяем имеются ли свободные места
            $emptyCapacity = ($Group->capacity) - (info_group::find($group_id)->users()->count());
            if ($emptyCapacity > 0) {
                // Вычитаем сумму вступления в группу из баланса пользователя
                $user->balance -=$costBookingGroup;
                $user->save();

                // Заносим данные по оплате в логи
                $log = new Log_payments();
                $log->user_id = $user->id;
                // За какую группу оплата
                $log->payments_id = $group_id;
                $log->amount = $costBookingGroup;
                $log->type = 2;
                $log->isApproved = 1;
                $log->save();

                // Привязываем пользователя к определенной группе
                $userTsgroup = new User_tsgroup();
                $userTsgroup->user_id = $user->id;
                $userTsgroup->info_group_id = $group_id;
                // Заносим информацию о том, сколько необходимо пользователю доплатить
                $userTsgroup->leftPayd = ($Group->price) - $costBookingGroup;
                $userTsgroup->save();

                return response()->json(['message' => 'Запись проведена успешно, со временем необходимо оплатить сезон полностьюю'], 200);
            }
            else {
                return response()->json(['message' => 'Все места в группе уже заняты!'], 403);
            }
        }
        else{
            return response()->json(['message' => 'Недостаточно средств для бронирования!'], 403);
        }
    }

    // Доплата суммы бронирования
    public function booking_pay(Request $request)
    {

    }


}
