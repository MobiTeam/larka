<?php

namespace App\Api\V1\Controllers;

use JWTAuth;
use App\Info_group;
use App\Season;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\UploadedFile;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Tymon\JWTAuth\Exceptions\JWTException;
use Dingo\Api\Routing\Helpers;

class InfoGroupController extends Controller
{

    use Helpers;

    // Отображаем все группы во всех сезонах и выводим наименование сезона
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $allGroups = Info_group::all();
        $groups=[];
        foreach ($allGroups as $key => $value) {
            $groups[$key]=$value;
            $groups[$key]['season_name'] = Info_group::find($value['id'])->season()->get()->first()->toArray()['name'];
        }
        return response()->json(['info_groups' => $groups], 200);
    }

    /**
     * Создаём новую группу
     *
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request)
    {
        // Указываем какие переменные получить из POST
        // Получаем основные данные для группы
        $inputData = $request->only(['season_id', 'name','description', 'capacity', 'count_training', 'price','booking_price']);
        $group = new Info_group($inputData);
        $group->save();
        return response()->json(['message' => 'created'], 201);
    }

    /**
     * Отображаем созданную группу
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $group = Info_group::find($id);
        $season = $group->season()->get()->first()->toArray();
        $group['season_name'] = $season['name'];
        if(!$group)
            return response()->json(['group' => []], 200);
         return response()->json(['group' => $group->toArray()], 200);
    }

    /**
     * Обновляем группу
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $group = Info_group::find($id);
        if(!$group)
            throw new NotFoundHttpException;
        // Получаем данные
        $inputData = $request->only(['season_id', 'name','description', 'capacity', 'count_training', 'price', 'booking_price']);
        // Заменяем аналогичные параметры, которые уже имеются присланными
        $group->fill($inputData);
        if($group->save())
            return response()->json(['status' => 'updated', 'id'=>$id], 200);
        else
            return $this->response->error('could not update', 500);
    }

    /**
     * Удаляем группу
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $group = Info_group::find($id);
        if(!$group)
            throw new NotFoundHttpException;
        if($group->delete())
            return response()->json(['status' => 'deleted', 'id'=>$id], 200);
        else
            return $this->response->error('could not delete', 500);
    }
}
