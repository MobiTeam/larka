
@extends('template.basepage')
<!-- Подключаем базову страницу -->

@section('title', 'Архив похудизма')

@section('content')
    <h1 class="clear-sans text-center"><b>Фотогаллерея</b></h1>
    <div class="container">
        <div class="row">
        @foreach ($photos as $photo)
        <div class="col-md-3 col-sm-4 col-xs-6 thumb">
          <a class="fancyimage" rel="group" href="base/img/photogallery/{{ $photo }}">
            <img class="img-responsive" src="base/img/photogallery/{{ $photo }}" />
          </a>
        </div>
        @endforeach
        <div class="col-md-3 col-sm-4 col-xs-6 thumb">
          <a class="fancyimage" rel="group" href="base/img/trainer/Irina.jpg">
            <img class="img-responsive" src="base/img/trainer/Irina.jpg" />
          </a>
        </div>
    </div>
  </div>

@endsection
