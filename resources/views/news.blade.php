
@extends('template.basepage')
<!-- Подключаем базову страницу -->

@section('title', 'Новости')

@section('content')

    <h1 class="clear-sans text-center"><b>Новости</b></h1>
    <div class="container news">
        <!-- Первая новость -->
        <div class="well news-single">
            <div class="media">
            	<a class="pull-left" href="#">
          		<img class="media-object news-img" src="base/img/news/2.png">
        		</a>
        		<div class="media-body">
          		<h4 class="media-heading">Тренировки в Горном Алтае </h4>
                <p class="text-right">Татьянкина Ирина</p>
                <p class="clear-sans about-description-text">Будь <a target="_blank" href="https://vk.com/feed?section=search&q=%23vforme">#vforme</a> летом! Креативный фитнес проект <b>VFORME</b> расширяет свои горизонты: С 17 июня по 21 июля набираем группы для тренировок в Горном Алтае<p>
                <p class="clear-sans about-description-text"><b>Всего 3 смены:</b>
                    <ul>
                        <li>17.06-27.06;</li>
                        <li>27.06-07.07;</li>
                        <li>11.07-21.07</li>
                    </ul>
                </p>
                <p class="clear-sans about-description-text"><b>Для кого?</b></p>
                <p class="clear-sans about-description-text">Для тебя, супруга (супруги), родственников, друзей, соседей!!! Заниматься может любой желающий (в зависимости от приобретенного тарифа, от 8000 до 24 000 рублей на человека за сезон).</p>
                <p class="clear-sans about-description-text">Мы едем не только тренироваться до двух раз в день, но и вдыхать всю красоту Горного Алтая, сплавляться по горной Катуни, купаться, загорать, много гулять, встречать рассвет и провожать закат на берегу реки, забывая про телефоны и прочие гаджеты; погружаться в атмосферу своей семьи или близких.</p>
                <ul class="list-inline list-unstyled">
        			<li><span><i class="glyphicon glyphicon-calendar"></i>Добавлено  29 марта 2017 </span></li>
      			</ul>
             </div>
          </div>
        </div>

    </div>
@endsection
