
@extends('template.basepage')
<!-- Подключаем базову страницу -->

@section('title', 'Новости')

@section('content')

    <h1 class="clear-sans text-center"><b>Новости</b></h1>
    <div class="container news">
            <!-- Вторая новость -->
        <div class="well news-single">
            <div class="media">
                <a class="pull-left" href="#">
                <img class="media-object news-img" src="base/img/news/3.jpg">
                </a>
                <div class="media-body">
                <h4 class="media-heading">ФИТНЕС ПРОЕКТ и СЕМЕЙНЫЙ ЛАГЕРЬ!!! </h4>
                <p class="text-right">Татьянкина Ирина</p>
                <p class="clear-sans about-description-text">Коктебель!<br> 
                    Это район Феодосии, рядом горы, скалы, море! Это богатые историей, любимые места Клементьева, Волошина, Айвазовского! 
                <p>           
                <p class="clear-sans about-description-text">Зачем мы туда едем?<br>
                    Отдыхать! Заниматься спортом! Творить и развиваться!
                    Глубже понять свои взаимоотношения с семьей!
                <p>  
                <p class="clear-sans about-description-text">Основные направления нашей программы:<br>
                    фитнес, арт-терапия, свободный театр, экспериментариум, живопись
                <p>
                <p class="clear-sans about-description-text">В этом году у нас очень крутые организаторы:<br>
                    <ul>
                        <li><a href="https://vk.com/irina_dyubko">Ирина Дюбко</a> - мама маленькой принцессы, фитнес тренер,
                            руководитель креативного фитнес проекта <a href="https://www.instagram.com/irina_vforme/">VFORME</a></li>
                        <li><a href="https://vk.com/olga_ivasyuk">Ольга Ивасюк</a> - мама двух девчонок, педагог-психолог, 
                            руководитель центра развития и творчества "Наша Школа" 
                        </li>
                        <li><a href="https://vk.com/id2328046">Оксана Мухарашева</a> многодетная мама, опытный
                            путешественник с детьми, 
                            творческая <a href="instagram.com/oksa_muha">личность</a>
                        </li>
                    </ul>
                </p>
                <p class="clear-sans about-description-text">По финансам 
                    ОРГ.ВЗНОС (с семьи): 
                    <ul>
                        <li>10 000 - при оплате до конца мая;</li>
                        <li>14 000 - при оплате до конца июня; </li>
                        <li>18 000 - при оплате до конца июля</li>
                    </ul>
                </p>
                <p class="clear-sans about-description-text">Проживание<br>
                    База отдыха находится у подножия потухшего вулкана Карадаг прямо на берегу МОРЯ!<br>
                    Питание будет организовано в кафе неподалеку, где работает линия раздачи, и каждая семья может выбрать СВОИ ЛЮБИМЫЕ блюда.<br>    
                    Минимальная СТОИМОСТЬ проживания и питания на семью 20 000р.!!! (двое взрослых и ребенок) 
                </p>
                <p class="clear-sans about-description-text">Контакты: 
                    <ul>
                        <li><a href="https://vk.com/id2328046">Оксана Мухарашева</a>: 8(904)872-07-65</li>
                        <li><a href="https://vk.com/olga_ivasyuk">Ольга Ивасюк</a>: 8(904)886-82-22 <a href="https://vk.com/nashashkolahm">"Наша школа" развития и творчества</a> </li>
                        <li><a href="https://vk.com/irina_dyubko">Ирина Дюбко</a>: 8(922)441-83-12</li>
                    </ul>
                </p>
                <p class="clear-sans about-description-text"><b>Подробности в группе <a href="https://vk.com/go_family_camp">Вконтакте</a>:</b>
                </p>        
                <ul class="list-inline list-unstyled">
                    <li><span><i class="glyphicon glyphicon-calendar"></i>Добавлено  28 мая 2017 </span></li>
                </ul>
             </div>
          </div>
        </div>

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
