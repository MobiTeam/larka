<?php

namespace App\Api\V1\Controllers;

use App\Season;
use App\Image;
use JWTAuth;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Tymon\JWTAuth\Exceptions\JWTException;
use Dingo\Api\Routing\Helpers;

/*
    api/season/season (GET) / index - возвращает информацию по всем сезонам (200 код)
    api/season/create (POST) / create - Создание сезона.получает POST и сохраняет сезоны (201 код и 500 ошибка)
    api/season/show/ID (GET) / show - по номеру id показывает информацию по сезону. (200 код или 404, если сезона с таким id)
    api/season/update/ID (PUT) / update - по номеру id обновляет данные по сезону. (200 код или 404, если сезона с таким id)
    api/season/delete/ID (DELETE) / delete - по номеру id удаляет данные по сезону. (200 код или 404, если сезона с таким id)
*/

class SeasonController extends Controller
{

    use Helpers;

    /**
     * Отображаем все сезоны
     */
    public function index()
    {
        return Season::all();
    }

    /**
     * Создание нового сезона
     */
    public function create(Request $request)
    {
        // Указываем какие переменные получить из POST
        $inputData = $request->only(['name', 'description', 'date_start', 'date_finish']);

        // $sourceFile = $request->only('source');
        $sourceFile = ['source'=>'23'];
        $images = new Image($sourceFile);
        $season = new Season($inputData);
        $season->save();
        // $season->images()->save($images);
        return response()->json(['status' => 'created'], 201);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Показать созданный сезон по его id
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $season = Season::find($id);
        if(!$season)
            throw new NotFoundHttpException;
        return $season;
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Обновление сезона
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $season = Season::find($id);
        if(!$season)
            throw new NotFoundHttpException;
        $inputData = $request->only(['name', 'description', 'date_start', 'date_finish']);
        $season->fill($inputData);
        if($season->save())
            return response()->json(['status' => 'updated'], 200);
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
        $season = Season::find($id);
        if(!$season)
            throw new NotFoundHttpException;
        if($season->delete())
            return response()->json(['status' => 'deleted', 'id'=>$id], 200);
        else
            return $this->response->error('could not delete', 500);
    }
}
