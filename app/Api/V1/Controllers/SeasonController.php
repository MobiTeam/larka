<?php

namespace App\Api\V1\Controllers;

use App\Season;
use App\Image;
use JWTAuth;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\UploadedFile;
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
        $season = Season::all();
        if(!$season)
            return response()->json(['seasons' => []], 200);
        return $season;
    }

    /**
     * Создание нового сезона
     */
    public function create(Request $request)
    {
        // Указываем какие переменные получить из POST
        // Получаем основные данные для сезона
        $inputData = $request->only(['name', 'description', 'date_start', 'date_finish']);
        $season = new Season($inputData);
        $season->save();

        // Допустимые расширения картинки
        $availExt = ['jpg', 'jpeg', 'png', 'bmp'];
        // Проверяем пришла ли картинка
        $statusMessage = 'created';
        $badFileName = '';
        if($request->hasFile('file')){
            foreach ($request->file('file') as $key=>$value) {
                // Файл имеет неправильное расширение
                if (array_search(strtolower($value->getClientOriginalExtension()), $availExt) === false) {
                    $fileName = $value->getClientOriginalName();
                    $badFileName .= $fileName.',';
                    $statusMessage = $badFileName.'';
                    $statusCode = 206;
                }
                // Файл имеет корректное расширение
                else{
                    // Новое наименование файла
                    $imageName = 'season_'.$season['id'].'_'.$key.'_'.date('d.m.Y').'.'.$value->getClientOriginalExtension();
                    // Оригинальное имя файла
                    $fileName = $value->getClientOriginalName();
                    // Путь сохранения файла
                    $path = $value->move('images/seasons', $imageName);
                    // Создание нового экземпляра файла
                    $sourceFile = ['source'=>$path, 'name'=>$fileName];
                    $images = new Image($sourceFile);
                    $season->images()->save($images);
                    $statusCode = 201;
                }
            }
            // Сохраняем стандартную картинку
            $season->default_image = $path;
            $season->save();
        }
        // Запрос пришел без файлов (204)
        else {
            $statusMessage = 'created without files';
            $statusCode = 201;
        }
        /*
        201 - успешно сохранено и загружено со всеми файлами или сохранено без файлов, т.к. они не пришли
        206 - сохранено и загружено, но некоторые файлы имели неверное расширение
        */
        return response()->json(['message' => $statusMessage], $statusCode);
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
