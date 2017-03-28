
@extends('template.basepage')
<!-- Подключаем базову страницу -->

@section('title', 'Контакты')

@section('content')

    <h1 class="clear-sans text-center"><b>Наши контакты</b></h1>
    <div class="about-description">
        @if (session('status'))
            <div class="alert alert-success">
                {{ session('status') }}
            </div>
        @endif
        <!-- Тренера -->
        <div class="row">
            <div class="col-xs-12 col-md-3"></div>
            <div class="col-xs-12 col-md-9"></div>
        </div>

        <!-- Мы на карте -->
        <div class="row">
            <div class="col-xs-12 col-md-3">
                <h4 class="clear-sans"><b>Мы находимся по следующему адресу:<br></b>
                    г.Ханты-Мансийск, ул. Студенческая, д.31
                </h4>
            </div>
            <div class="col-xs-12 col-md-9 hidden-xs">
                <script type="text/javascript" charset="utf-8" async src="https://api-maps.yandex.ru/services/constructor/1.0/js/?um=constructor%3A0b61699e993d57b83d27e36bfe60625bc524561858c143d3e6254447e2f90e43&amp;width=100%25&amp;height=450&amp;lang=ru_RU&amp;scroll=true"></script>            </div>
        </div>
        <br>
        <!-- Форма обратной связи -->
        <div class="row">
            <h4 class="clear-sans"><b>Если у вас имеются вопросы, вы можете задать его нам!</b></h4>
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





    </div>

@endsection
