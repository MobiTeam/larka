<?php

namespace App\Api\V1\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Dingo\Api\Routing\Helpers;
use App\Season;
use App\Event;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

/*
 * Контроллер событий сезона
 */
class EventController extends Controller
{

    use Helpers;
    /**
     * Вывести все действующие события текущих сезонов
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $season = Season::where('date_finish', '>=', \DB::raw('CURRENT_DATE'))->get()->toArray();
        $data = [];
        foreach ($season as $key => $value) {
            $data[$key] = $value;
            $event = Season::find($value['id'])->events()->get()->toArray();
            $data[$key]['events'] = $event;
        }
        return $data;
    }

    /**
     * Вывести все events определенного сезона
     *
     * @return \Illuminate\Http\Response
     */
    public function list()
    {
        $event = Event::where('date_hold', '>=', \DB::raw('CURRENT_DATE'))->get()->toArray();
        return $event;
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request)
    {
        // Указываем какие переменные получить из POST
        // Получаем основные данные для группы
        $inputData = $request->only(['season_id', 'name','description', 'date_hold']);
        $event = new Event($inputData);
        if($event->save())
            return response()->json(['message' => 'created'], 201);
        else
            return $this->response->error('could not update', 500);
    }

    /**
     * Показать событие
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $event = Event::find($id);
        if(!$event)
            throw new NotFoundHttpException;
        return $event;
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $event = Event::find($id);
        if(!$event)
            throw new NotFoundHttpException;
        // Получаем данные
        $inputData = $request->only(['season_id', 'name','description', 'date_hold']);
        // Заменяем аналогичные параметры, которые уже имеются присланными
        $event->fill($inputData);
        if($event->save())
            return response()->json(['status' => 'updated', 'id'=>$id], 200);
        else
            return $this->response->error('could not update', 500);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $event = Event::find($id);
        if(!$event)
            throw new NotFoundHttpException;
        if($event->delete())
            return response()->json(['status' => 'deleted', 'id'=>$id], 200);
        else
            return $this->response->error('could not delete', 500);
    }
}
