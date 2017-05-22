<?php

namespace App\Api\V1\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Dingo\Api\Routing\Helpers;
use App\Season;
use App\Event;
use App\Event_time;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;


/*
 * Контроллер времени событий сезона
 */
class EventTimeController extends Controller
{
    /**
     * Вывести все события с временами
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $event = Event::where('date_hold', '>=', \DB::raw('CURRENT_DATE'))->get()->toArray();
        $data = [];
        foreach ($event as $key => $value) {
            $data[$key] = $value;
            $eventTime = Event::find($value['id'])->times()->get()->toArray();
            $data[$key]['events'] = $eventTime;
        }
        return $data;
    }

    /**
     * Вывести все текущие времена для выбранного события
     *
     * @return \Illuminate\Http\Response
     */
    public function brief_index($id)
    {
        $eventTime = Event::find($id)->times()->get()->toArray();
        return $eventTime;
    }

    /**
     * Создание времени для события
     *
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request)
    {
        // Указываем какие переменные получить из POST
        // Получаем основные данные для группы
        $inputData = $request->only(['event_id', 'name','description', 'capacity', 'time_hold_start', 'time_hold_finish']);
        $eventTime = new Event_time($inputData);
        if($eventTime->save())
            return response()->json(['message' => 'created', 'eventTime' => $eventTime->toArray()], 201);
        else
            return $this->response->error('could not update', 500);
    }

    /**
     * Показать выбранное время события
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $eventTime = Event_time::find($id);
        if(!$eventTime)
            throw new NotFoundHttpException;
        return $eventTime;
    }

    /**
     * Обновить выбранное время события
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $eventTime = Event_time::find($id);
        if(!$eventTime)
            throw new NotFoundHttpException;
        // Получаем данные
        $inputData = $request->only(['event_id', 'name','description', 'capacity', 'time_hold_start', 'time_hold_finish']);
        // Заменяем аналогичные параметры, которые уже имеются присланными
        $eventTime->fill($inputData);
        if($eventTime->save())
            return response()->json(['status' => 'updated', 'id'=>$id], 200);
        else
            return $this->response->error('could not update', 500);
    }

    /**
     * Удалить время события
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $eventTime = Event_time::find($id);
        if(!$eventTime)
            throw new NotFoundHttpException;
        if($eventTime->delete())
            return response()->json(['status' => 'deleted', 'id'=>$id], 200);
        else
            return $this->response->error('could not delete', 500);
    }
}
