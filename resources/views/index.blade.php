
@extends('template.basepage')
<!-- Подключаем базову страницу -->

@section('title', 'Главная страница')

@section('content')
<!-- Слайдер -->
<div id="carousel" class="carousel slide hidden-xs" data-ride="carousel">
  <!-- Indicators -->
  <ol class="carousel-indicators">
    <li data-target="#carousel" data-slide-to="0" class="active"></li>
    <li data-target="#carousel" data-slide-to="1"></li>
    <li data-target="#carousel" data-slide-to="2"></li>
    <li data-target="#carousel" data-slide-to="3"></li>
    <li data-target="#carousel" data-slide-to="4"></li>
  </ol>

  <!-- Wrapper for slides -->
  <div class="carousel-inner" role="listbox">

    <div class="item active content-carousel-img">
      <img src="base/img/carousel/1.jpg" alt="Картинка">
    </div>

    <div class="item content-carousel-img">
      <img src="base/img/carousel/2.jpg" alt="Картинка">
    </div>


    <div class="item content-carousel-img">
      <img src="base/img/carousel/3.jpg" alt="Картинка">
    </div>


    <div class="item content-carousel-img">
      <img src="base/img/carousel/4.jpg" alt="Картинка">
    </div>

    <div class="item content-carousel-img">
      <img src="base/img/carousel/5.jpg" alt="Картинка">
    </div>

  </div>

  <a class="left carousel-control" href="#carousel" role="button" data-slide="prev">
    <span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
    <span class="sr-only">Вперед</span>
  </a>
  <a class="right carousel-control" href="#carousel" role="button" data-slide="next">
    <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
    <span class="sr-only">Назад</span>
  </a>
</div>

<!-- Мотивация -->
<div class="motivation-text">
    <p class="motivation-text-head text-center">Привет! Наконец-то ты зашла!</p>
    <p class="motivation-text-base text-center">
        Все! Теперь можешь не втягивать свой живот, вызов принят.
    </p>
    <p class="motivation-text-base text-center">
        Мы твои <a href="/contact">ЖИРОСЖИГАТЕЛИ</a>, и мы знаем, как научить тебя жить без апельсиновых корок, выпирающих ушей, желеобразных частей тела.
    </p>
    <p class="motivation-text-base text-center">
         Поверь! Ты полюбишь себя и спорт!
     </p>
    <p class="motivation-text-base text-center">
        Заглянув в <a href="/photogallery">АРХИВ ПОХУДИЗМА</a>, ты окажешься в атмосфере жаркой ликвидации.
    </p>
    <p class="motivation-text-base text-center">
        Возможно, мы напугаем тебя. Возможно, ты покинешь сайт прямо сейчас. Но скорее всего, ты захочешь присоединиться и попасть в прожигающий <a href="/about">СЕЗОН</a>.
    </p>
    <p class="motivation-text-base text-center">
        Долой иллюзии!
    </p>
    <p class="motivation-text-base text-center">
        Ты будешь плакать в планке, ненавидеть нас в стульчике-плие, проклинать проект в берпи...но при этом видеть результат!
    </p>
    <p class="motivation-text-base text-center">
        Наличие невозвратного билета будет постоянно сдерживать тебя от поднятия белого флага.
    </p>

        <p class="motivation-text-head text-center">Как найти кассу и приобрести билет?!</p>
        <p class="motivation-text-head text-center">Никуда не сворачивай! Ты на правильном пути! Вот <a href="/dashboard">НУЖНЫЙ КАБИНЕТ</a>.</p>
        <p class="motivation-text-head text-center"> До окончания приобретения невозвратного билета осталось:</p>
        <script src="http://megatimer.ru/s/2aa9553af8683d3ab5eb9d96c978bb72.js"></script>
</div>
<hr>
<div class="container">
</div>
@endsection
