<?php

namespace App\Api\V1\Controllers;

use App\Season;
use JWTAuth;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Tymon\JWTAuth\Exceptions\JWTException;
use Dingo\Api\Routing\Helpers;

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
        // Указываем какие переменные получить
        $inputData = $request->only(['name', 'description', 'date_start', 'date_finish']);
        $season = new Season($inputData);
        $season->save();
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
        if($season->delete())
            return response()->json(['status' => 'deleted'], 200);
        else
            return $this->response->error('could not delete', 500);
    }
}
