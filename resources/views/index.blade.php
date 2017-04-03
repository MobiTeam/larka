
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
  </ol>

  <!-- Wrapper for slides -->
  <div class="carousel-inner" role="listbox">

    <div class="item active content-carousel-img">
      <img src="base/img/carousel/5.jpg" alt="Картинка">
    </div>

    <div class="item content-carousel-img">
      <img src="base/img/carousel/2.jpg" alt="...">
    </div>


    <div class="item content-carousel-img">
      <img src="base/img/carousel/6.jpg" alt="...">
    </div>


    <div class="item content-carousel-img">
      <img src="base/img/carousel/4.jpg" alt="...">
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
    <p class="motivation-text-base text-justify">
        Все! Теперь можешь не втягивать свой живот, вызов принят.
    </p>
    <p class="motivation-text-base text-justify">
        Мы твои <a href="/contact">ЖИРОСЖИГАТЕЛИ</a>, и мы знаем, как научить тебя жить без апельсиновых корок, выпирающих ушей, желеобразных частей тела.</p>
    <p class="motivation-text-base text-justify">
        Ты полюбишь себя и спорт!
     </p>
    <p class="motivation-text-base text-justify">
        Загляни в <a href="/photogallery">АРХИВ ПОХУДИЗМА</a>, ты окажешься в атмосфере жаркой ликвидации.
    </p>
    <p class="motivation-text-base text-justify">
        Возможно, мы напугаем тебя. Возможно, ты покинешь сайт прямо сейчас. Но скорее всего, ты захочешь присоединиться и попасть в прожигающий <a href="/about">СЕЗОН</a>.
    </p>
    <p class="motivation-text-base text-justify">
        Долой иллюзии!
    </p>
    <p class="motivation-text-base text-justify">
        Ты будешь плакать в планке, ненавидеть нас в стульчике-плие, проклинать проект в берпи...но при этом видеть результат!
    </p>
    <p class="motivation-text-base text-justify">
        Наличие невозвратного билета будет постоянно сдерживать тебя от поднятия белого флага.
    </p>

        <p class="motivation-text-head text-center">Как найти кассу и приобрести билет?!</p>
        <p class="motivation-text-head text-center">Никуда не сворачивай! Ты на правильном пути! Вот <a href="/dashboard">НУЖНЫЙ КАБИНЕТ</a>.</p>
        <p class="motivation-text-head text-center">Успей записаться<span class="post-scriptum-text">*</span> к следующему занятию, которое начнется через:</p>
        <script src="http://megatimer.ru/s/5ab985c7e0f85e911d8c313824212987.js"></script>
</div>
<hr>
<div class="container">
    <p class="post-scriptum-text">*Запись производится через нужный кабинет</p>
</div>
<!-- <div class="separate"></div> -->
<!-- Про нас -->
<!--<div class="about-text container">
    <div class="col-xs-12 col-sm-4">
        <p class="about-text-head">Наш инстаграмм</p>
        <a href="">
            <img src="http://placehold.it/320x280" alt="">
        </a>
        <p class="about-text-footer">Наш Инстаграм ежедневно обновляется.<br>Заглядывайте.</p>
    </div>

    <div class="col-xs-12 col-sm-4">
        <p class="about-text-head">Наш личный кабинет</p>
        <a href="">
            <img src="http://placehold.it/320x280" alt="">
        </a>
        <p class="about-text-footer">Наш личный кабинет поможет вам...</p>
    </div>

    <div class="col-xs-12 col-sm-4">
        <p class="about-text-head">Наши контакты</p>
        <a href="">
            <img src="http://placehold.it/320x280" alt="">
        </a>
        <p class="about-text-footer">Записывайте к нам...</p>
    </div>
</div>-->
@endsection
