<?php

namespace App\Api\V1\Controllers;

use JWTAuth;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Dingo\Api\Routing\Helpers;
use App\Season;
use App\Event;
use App\Event_time;
use App\Info_group;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

/*
    1 - Создание связи 1 событие 1 раз для пользователя
    2 - Изменение времени для данного события
    3 - Отписаться от данного события
    4 - Просмотр кто в сезоне на какое время записан
    5 - Список всех сезонов->событий->времен и свободных мест на них
    6 - Просмотр куда записан пользователь в этом сезоне и когда
*/

class UserEventController extends Controller
{
    /**
     * Вывести список всех сезонов с событиями и временами и пользователями
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $data = [];
        $seasons = Season::where('date_finish', '>=', \DB::raw('CURRENT_DATE'))->get()->toArray();
        // Сезоны
        foreach ($seasons as $key=>$season) {
            $data[$key] = $season;
            $events = Season::find($season['id'])->events()->get()->toArray();
            // События
            foreach ($events as $key2 => $event) {
                $data[$key]['event'][$key2] = $event;
                $eventTimes = Event::find($event['id'])->times()->get()->toArray();
                // Время событий
                foreach ($eventTimes as $key3 => $eventTime) {
                    $data[$key]['event'][$key2]['event_time'][$key3] = $eventTime;
                    $data[$key]['event'][$key2]['event_time'][$key3]['users'] =
                        Event_time::find($eventTime['id'])->users()->get()->toArray();

                }
            }
        }

        return $data;
    }

    /**
     * Вывести текущие сезоны и события на которые записан пользователь и на которые надо записаться
     *
     * @return \Illuminate\Http\Response
     */
    public function list()
    {
        // Получаем пользователя
        $token = JWTAuth::getToken();
        $user = JWTAuth::toUser($token);

        $data = [];
        // Получаем все действующие сезоны пользователя
        $seasonUserGroup = $user->tsgroup()->get(['season_id'])->toArray();
        foreach ($seasonUserGroup as $key => $value) {
            // Получаем все события сезона
            $season = Season::find($value['season_id'])->toArray();
            $events = Season::find($value['season_id'])->events()->get()->toArray();
            $data[$key] = $season;
            // Все события
            foreach ($events as $key2 => $value2) {
                $data[$key]['events'][$key2] = $value2;
                $allEventTimes = Event::find($value2['id'])->times()->get()->toArray();
                $statusEvents = 0;
                // Все времена события
                foreach ($allEventTimes as $key3 => $value3) {
                    $eventTime = Event_time::find($value3['id'])->toArray()['id'];
                    // Проверяем записан ли пользователь на данное событие
                    if ($statusEvents == 0) {
                        $checkUserRelationEventTime = DB::table('user_event_time')
                                                        ->where('user_id', $user->id)
                                                        ->where('event_time_id', $eventTime)
                                                        ->count();
                        if ($checkUserRelationEventTime > 0) {
                            $statusEvents = 1;
                        }
                    }
                }
                $data[$key]['events'][$key2]['status'] = $statusEvents;
            }
        }
        return $data;
    }

    /**
     * Создание связи для события и пользователя
     *
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request)
    {
        // Получаем пользователя
        $token = JWTAuth::getToken();
        $user = JWTAuth::toUser($token);
        // Получаем время на которое пользователь хочет записаться
        $eventTimeId = $request->only(['event_time_id']);

        // Проверяем на записан ли пользователь на другое время данного события
        // ID события на которое хочется записаться пользователь
        $eventId = (Event_time::find($eventTimeId)->first()->toArray())['event_id'];
        $allEventTimeIdThisEvent = Event::find($eventId)
                                        ->times()
                                        ->get(['id'])
                                        ->toArray();
        $checkUserRelationEventTime = DB::table('user_event_time')
                                        ->where('user_id', $user->id)
                                        ->whereIn('event_time_id', $allEventTimeIdThisEvent)
                                        ->count();
        if (!($checkUserRelationEventTime > 0)) {
            // Проверяем имеются ли места на данное время
            $capacityEventTime = (Event_time::find($eventTimeId)->first()->toArray())['capacity'];
            $countRecotdThisEventTime = DB::table('user_event_time')
                                          ->where('event_time_id', $eventTimeId)
                                          ->count();
            if ($capacityEventTime - $countRecotdThisEventTime > 0) {
                $user->event_times()->attach($eventTimeId);
                return response()->json(['message' => 'Запись на данное время проведена успешно!'], 200);
            }
            else {
                return response()->json(['message' => 'К сожалению, все места на данное время заняты'], 403);
            }

        }
        else {
            return response()->json(['message' => 'Вы уже записаны на данное событие!'], 403);
        }

        return response()->json(['message' => 'Произошла ошибка'], 500);
    }

    /**
     * Изменить выбранное время события
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request)
    {
        // Получаем пользователя
        $token = JWTAuth::getToken();
        $user = JWTAuth::toUser($token);

        // Время на которое хочет записаться пользователь
        $eventTimeId = $request->only(['event_time_id']);

        // Проверяем имеются ли места на данное время
        $capacityEventTime = (Event_time::find($eventTimeId)->first()->toArray())['capacity'];
        $countRecotdThisEventTime = DB::table('user_event_time')
                                      ->where('event_time_id', $eventTimeId)
                                      ->count();
        if ($capacityEventTime - $countRecotdThisEventTime > 0) {
            // ID события на которое хочется записаться пользователь
            $eventId = (Event_time::find($eventTimeId)->first()->toArray())['event_id'];
            $allEventTimeIdThisEvent = Event::find($eventId)
                                            ->times()
                                            ->get(['id'])
                                            ->toArray();
            // Удаляем связь пользователя со всеми временами данного события
            $user->event_times()->detach($allEventTimeIdThisEvent);
            // Записываем пользователя на новое время
            $user->event_times()->attach($eventTimeId);
            return response()->json(['message' => 'Запись на данное время проведена успешно!'], 200);
        }
        else {
            return response()->json(['message' => 'К сожалению, все места на данное время заняты'], 403);
        }
    }

    /**
     * Удалить связь времени и пользователя
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request)
    {
        // Получаем пользователя
        $token = JWTAuth::getToken();
        $user = JWTAuth::toUser($token);
        // Время от которого хочется отписаться пользователь
        $eventTimeId = $request->only(['event_time_id']);
        $user->event_times()->detach($eventTimeId);
        return response()->json(['message' => 'Запись на данное время отменена'], 200);
    }


}
