
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
    <p class="motivation-text-head text-center">Привет! Слава богу ты зашла!</p>
    <p class="motivation-text-base text-justify">
        Ждали именно тебя! Можешь не втягивать живот, мы уже все знаем про тебя.
    </p>
    <p class="motivation-text-base text-justify">
        Ждали когда ты оторвешь свою пятую точку от мягкого удобного и такого красивого дивана, или в условиях плотного и занятого графика найдешь час с небольшим на себя, только на себя!
    </p>
    <p class="motivation-text-base text-justify">
        Поверь-назад пути нет. Можешь уже ставить крест на своей лени и лишних сантиметрах на любимых окружностях. Если ты здесь, то у тебя уже есть <b>ЦЕЛЬ</b>. Иди к ней: тренируйся на максимум, помни про сбалансированное питание. Помоги себе стать лучше, чем ты можешь быть. Чем упорнее ты работаешь над этой комплексностью, тем успешнее становишься. Генетика – это просто отговорка. Разница между тем, кто ты есть, и тем, кем хочешь быть – это то, что ты делаешь.
    </p>
    <p class="motivation-text-base text-justify">
        Главный твой враг - это ты сама, потому что ваши силы постоянно равны.
    </p>
    <p class="motivation-text-base text-justify">
        Не ищи отмазок для собственной совести: на улице прохладно, и потому бегать пойду завтра; день был сложный – отменю-ка я тренировку; нервничала много – дай-ка кусочек крохотной печеньки ...
    </p>
        <p class="motivation-text-head text-center">НАЧИНАЙ ПАХАТЬ ПРЯМО СЕЙЧАС!</p>
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
