
@extends('template.basepage')
<!-- Подключаем базову страницу -->

@section('title', 'Жиросжигатели')

@section('content')

    <h1 class="clear-sans text-center"><b>Наши контакты</b></h1>
    <div class="about-description">
        @if (session('status'))
            <div class="alert alert-success">
                {{ session('status') }}
            </div>
        @endif
            <!-- Тренера -->
            <div class="row container">
                <h4 class="clear-sans"><b>Наши фитнес инструкторы:</b></h4>
                <!-- Первый тренер -->
                <div class="col-xs-12 col-md-6 col-lg-5">
                    <img class="media-object about-trainer-img" src="base/img/trainer/Irina2.jpg" alt="">
                </div>
                <div class="col-xs-12 col-md-6 col-lg-7">
                    <h3 class="text-center clear-sans about-trainer-text-head">Ирина</h3>
                    <p class="clear-sans about-description-text">Мама маленькой принцессы <a href="https://vk.com/feed?section=search&q=%23фитнес_мама_хм">#фитнес_мама_хм</a>, работаем в паре на занятиях "Мама + малыш":)</p>
                    <p class="clear-sans about-description-text">Окончила магистратуру по специальности "Спорт", личные достижения - КМС по волейболу</p>
                    <p class="clear-sans about-description-text"><b>Квалификация  на сегодняшний день:</b>
                        <ul>
                            <li>Инструктор групповых программ, г. Москва </li>
                            <li>Инструктор по силовому тренингу, г. Челябинск </li>
                            <li>Инструктор по аэробике I, г. Москва </li>
                            <li>Инструктор направления "mind&body", г. Барнаул </li>
                            <li>Инструктор по тренингу беременных, г. Москва </li>
                            <li>Инструктор направления ТАЙ Бо, г. Екатеринбург </li>
                        </ul>
                    </p>
                    <p class="clear-sans about-description-text"><b>Телефон: </b><a href="tel:89224418312"> +7 922 441-83-12 </a></p>
                    <p class="clear-sans about-description-text"><b>Почта: </b><a href="mailto:irina.dyubko@gmail.com">irina.dyubko@gmail.com</a></p>
                </div>
            </div>
            <hr>
            <!-- Второй тренер -->
            <div class="row container">
                <div class="col-xs-12 col-md-6 col-lg-7">
                    <h3 class="text-center clear-sans about-trainer-text-head">Мария</h3>
                    <p class="clear-sans about-description-text">Студентка Педагогического колледжа фитнеса, направление:"Фитнес-инструктор международного класса", г.Санкт-Петербург</p>
                    <p class="clear-sans about-description-text"><b>Квалификация  на сегодняшний день:</b>
                        <ul>
                            <li>Инструктор групповых программ, г. Санкт-Петербург </li>
                            <li>Инструктор по аквааэробике, г. Санкт-Петербург </li>
                        </ul>
                    </p>
                    <p class="clear-sans about-description-text"><b>Телефон:</b><a href="tel:89044662777"> +7 902 828-62-90 </a></p>
                </div>
                <div class="col-xs-12 col-md-6 col-lg-5">
                    <img class="media-object about-trainer-img" src="base/img/trainer/Masha3.jpg" alt="">
                </div>
            </div>
        <hr>
        <!-- Мы на карте -->
        <div class="row container">
            <div class="col-xs-12 col-md-3">
                <h4 class="clear-sans"><b>Наши занятия проходят по следующему адресу:<br></b>
                    г.Ханты-Мансийск, ул. Студенческая, д.31
                </h4>
            </div>
            <div class="col-xs-12 col-md-9 hidden-xs">
<script type="text/javascript" charset="utf-8" async src="https://api-maps.yandex.ru/services/constructor/1.0/js/?um=constructor%3A0b61699e993d57b83d27e36bfe60625bc524561858c143d3e6254447e2f90e43&amp;width=100%25&amp;height=461&amp;lang=ru_RU&amp;scroll=true"></script>        </div>
        </div>
        <hr>
        <!-- Форма обратной связи -->
        <div class="row container">
            <h4 class="clear-sans"><b>Если у вас имеются вопросы, вы можете задать их нам!</b></h4>
            <form method="post" action="feedback">
                {!! csrf_field() !!}
                <div class="col-xs-6">
                    <div class="form-group">
                      <label for="name">Имя</label>
                      <input type="text" class="form-control" id="name" placeholder="Ваше имя" name="name" required="required">
                    </div>
                    <div class="form-group">
                      <label for="email">Email</label>
                      <input type="email" class="form-control" name="email" id="email" placeholder="Ваш почтовый адрес" required="required">
                    </div>
                    <button type="submit" class="btn btn-warning">Отправить</button>
                </div>

                <div class="col-xs-6">
                    <label for="description">Описание вопроса</label>
                    <textarea name="description" id="description" class="form-control" placeholder="Введите описание вопроса" cols="60" rows="5" required="required"></textarea>
                </div>
            </form>

        </div>

@endsection
