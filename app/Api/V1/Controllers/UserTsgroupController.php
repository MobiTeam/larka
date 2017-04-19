<?php

namespace App\Api\V1\Controllers;

use JWTAuth;
use App\User_tsgroup;
use App\Info_group;
use App\Log_payments;
use App\Season;
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

    // Вывод всех людей вступивших в группы
    public function list(Request $request)
    {
        $token = JWTAuth::getToken();
        $user = JWTAuth::toUser($token);
        $result = [];
        // Проверяем является ли пользователь тренером или администратором
        if ($user->user_groups_id == 1 || $user->user_groups_id == 4) {
            // Получаем текущие действующие сезоны
            $seasons = Season::where('date_finish', '>=', \DB::raw('CURRENT_DATE'))->orderBy('date_finish')->get();
            foreach ($seasons as $key => $value) {
                // Получаем все группы текущего сезона
                $groups = Season::find($value->id)->info_groups()->get()->toArray();
                foreach ($groups as $key => $value) {
                    $result[$key] = $value;
                    // Получаем всех пользователей состоящих в группе
                    $users = Info_group::find($value['id'])->users()->get()->toArray();
                    foreach ($users as $key2 => $value2) {
                        $result[$key]['users'][$key2] = $value2;
                        $result[$key]['users'][$key2]['left_payd'] = (User_tsgroup::where([
                                                                     ['user_id',$value2['id']],
                                                                     ['info_group_id',$value['id']]])->get()->first())->leftPayd;
                    }
                }
            }
            return $result;
        }
        else {
            return response()->json(['message' => 'Доступ запрещен!'], 403);
        }
    }

    // Привязка пользователя к тренировочной сезонной группе c с полной оплатой
    public function create_relation(Request $request)
    {
        // Получаем пользователя и его баланс
        $token = JWTAuth::getToken();
        $user = JWTAuth::toUser($token);
        // Средства на балансе у пользователя
        $userBalance = $user->balance;
        // Получаем номер группы, в которую он хочет записаться
        $group_id = $request->input('info_group_id');
        $Group = info_group::find($group_id);
        // Стоимость сезона
        $costGroup = $Group->price;
        // Проверяем, состоит ли пользователь уже в этой группе
        $checkUserGroup = User_tsgroup::where([
                                             ['user_id',$user->id],
                                             ['info_group_id',$group_id]])->get()->count();
        if(!($checkUserGroup > 0)) {
            // Проверяем хватает ли пользователю средств для записи на сезон
            if ($userBalance >= $costGroup) {
                // Проверяем имеются ли свободные места
                $emptyCapacity = ($Group->capacity) - (info_group::find($group_id)->users()->count());
                if ($emptyCapacity > 0) {
                    // Заносим данные по оплате в логи
                    $log = new Log_payments();
                    $log->user_id = $user->id;
                    // За какую группу оплата
                    $log->payments_id = $group_id;
                    $log->amount = $costGroup;
                    $log->type = 2;
                    $log->isApproved = 1;
                    $log->save();

                    // Вычитаем сумму вступления в группу из баланса пользователя
                    $user->balance -=$costGroup;
                    $user->save();

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
        else {
            return response()->json(['message' => 'Вы уже состоите в этой группе!'], 403);
        }
    }

    // Привязка пользователя к тренировочной сезонной группе через бронирование
    public function create_booking_relation(Request $request)
    {
        // Получаем пользователя и его баланс
        $token = JWTAuth::getToken();
        $user = JWTAuth::toUser($token);
        // Средства на балансе у пользователя
        $userBalance = $user->balance;
        // Получаем номер группы, в которую он хочет записаться
        $group_id = $request->input('info_group_id');
        $Group = info_group::find($group_id);
        // Стоимость бронирования сезона
        $costBookingGroup = $Group->booking_price;

        // Проверяем, состоит ли пользователь уже в этой группе
        $checkUserGroup = User_tsgroup::where([
                                             ['user_id',$user->id],
                                             ['info_group_id',$group_id]])->get()->count();
        if(!($checkUserGroup > 0)) {
            // Проверяем хватает ли пользователю средств для бронирования сезона
            if ($userBalance >= $costBookingGroup) {
                // Проверяем имеются ли свободные места
                $emptyCapacity = ($Group->capacity) - (info_group::find($group_id)->users()->count());
                if ($emptyCapacity > 0) {
                    // Заносим данные по оплате в логи
                    $log = new Log_payments();
                    $log->user_id = $user->id;
                    // За какую группу оплата
                    $log->payments_id = $group_id;
                    $log->amount = $costBookingGroup;
                    $log->type = 2;
                    $log->isApproved = 1;
                    $log->save();

                    // Вычитаем сумму бронирования группы из баланса пользователя
                    $user->balance -=$costBookingGroup;
                    $user->save();

                    // Привязываем пользователя к определенной группе
                    $userTsgroup = new User_tsgroup();
                    $userTsgroup->user_id = $user->id;
                    $userTsgroup->info_group_id = $group_id;
                    // Заносим информацию о том, сколько необходимо пользователю доплатить
                    $userTsgroup->leftPayd = ($Group->price) - $costBookingGroup;
                    $userTsgroup->save();

                    return response()->json(['message' => 'Запись проведена успешно, со временем необходимо оплатить сезон полностью'], 200);
                }
                else {
                    return response()->json(['message' => 'Все места в группе уже заняты!'], 403);
                }
            }
            else {
                return response()->json(['message' => 'Недостаточно средств для бронирования!'], 403);
            }
        }
        else {
            return response()->json(['message' => 'Вы уже состоите в этой группе!'], 403);
        }
    }

    // Доплата необходимой суммы после бронирования
    public function booking_pay(Request $request)
    {
        // Получаем пользователя и его баланс
        $token = JWTAuth::getToken();
        $user = JWTAuth::toUser($token);
        // Средства на балансе у пользователя
        $userBalance = $user->balance;
        // Получаем номер группы, за которую ему необходимо доплатить бронирование
        $group_id = $request->input('info_group_id');
        // Получаем по пользователю и группе данные из смежной таблицы
        $pivotUserGroup = (User_tsgroup::where([
                                             ['user_id',$user->id],
                                             ['info_group_id',$group_id]])->get()->first());
        // Сумма, которую осталось оплатить пользователю
        $leftUserPayd = $pivotUserGroup->leftPayd;
        // Проверяем хватает ли пользователю средств для погашения суммы
        if ($userBalance >= $leftUserPayd) {
            // Заносим данные по оплате в логи
            $log = new Log_payments();
            $log->user_id = $user->id;
            // За какую группу оплата
            $log->payments_id = $group_id;
            $log->amount = $leftUserPayd;
            $log->type = 2;
            $log->isApproved = 1;
            $log->save();

            // Вычитаем сумму оплаты из баланса пользователя
            $user->balance -=$leftUserPayd;
            $user->save();

            // Вычитаем оплаченную сумму из связной таблицы
            $pivotUserGroup->leftPayd -=$leftUserPayd;
            $pivotUserGroup->save();

            // Вернуть эту группу по типу index
            $currentGroups = Info_group::find($group_id);
            $result = $currentGroups;
            $result['leftPayd'] = (User_tsgroup::where([
                                                     ['user_id', $user->id],
                                                     ['info_group_id', $group_id ]])->get()->first())->leftPayd;

            return response()->json(['group' => $result], 200);
        }
        else {
            return response()->json(['message' => 'Недостаточно средств для оплаты!'], 403);
        }

    }


}
