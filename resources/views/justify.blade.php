
@extends('template.basepage')
<!-- Подключаем базову страницу -->

@section('title', 'Контакты')

@section('content')

<h1 class="clear-sans text-center"><b>Контактные данные организации</b></h1>
<div class="about-description">

    <table class="table table-condensed table-bordered table-justify">
        <tbody>
            <!-- Реквизиты -->
            <tr class="warning">
                <th class="table-justify-tr-info" colspan="2">Реквизиты зарезервированного расчетного счета </th>
            </tr>
            <tr>
                <td>ID запроса:</td>
                <td>1377815</td>
            </tr>
            <tr>
                <td>Расчетный счет:</td>
                <td>40702810867460001479</td>
            </tr>
            <tr>
                <td>Корреспондентский счет:</td>
                <td>30101810800000000651</td>
            </tr>
            <tr>
                <td>БИК:</td>
                <td>047102651</td>
            </tr>
            <tr>
                <td>Адрес отделения Банка, в котором зарезервирован счет</td>
                <td>Ханты-Мансийский АО - Югра, г.Ханты-Мансийск, улица Дзержинского, 16</td>
            </tr>
            <!-- Информация о заявителе -->
            <tr class="warning">
                <th class="table-justify-tr-info" colspan="2"> Информация о заявителе </th>
            </tr>
            <tr>
                <td>Полное наименование организации:</td>
                <td>ОБЩЕСТВО С ОГРАНИЧЕННОЙ ОТВЕТСТВЕННОСТЬЮ "В-ФОРМЕ"</td>
            </tr>
            <tr>
                <td>Вид деятельности:</td>
                <td>Коммерческая организация</td>
            </tr>
            <tr>
                <td>ИНН:</td>
                <td>8601058970</td>
            </tr>
            <tr>
                <td>КПП:</td>
                <td>860101001</td>
            </tr>
            <tr>
                <td>ОГРН:</td>
                <td>1168617074636</td>
            </tr>
            <tr>
                <td>ОКОПФ:</td>
                <td></td>
            </tr>
            <tr>
                <td>Объем годовой выручки:</td>
                <td>до 400 млн. руб</td>
            </tr>

            <!-- Информация о заявителе -->
            <tr class="warning">
                <th class="table-justify-tr-info" colspan="2"> Адрес (место нахождения) юридического лица </th>
            </tr>
            <tr>
                <td>Страна:</td>
                <td>Россия</td>
            </tr>
            <tr>
                <td>Индекс:</td>
                <td>628012</td>
            </tr>
            <tr>
                <td>Населенный пункт:</td>
                <td>Город Ханты-Мансийск</td>
            </tr>
            <tr>
                <td>Улица:</td>
                <td>Промышленная</td>
            </tr>
            <tr>
                <td>Квартира:</td>
                <td></td>
            </tr>

            <!-- Сведения -->
            <tr class="warning">
                <th class="table-justify-tr-info" colspan="2"> Адрес (место нахождения) юридического лица </th>
            </tr>
            <tr>
                <td>Фамилия, Имя, Отчество:</td>
                <td>Татьянкин Виталий Михайлович</td>
            </tr>
            <tr>
                <td>E-mail:</td>
                <td>bambar@bk.ru</td>
            </tr>
            <tr>
                <td>Контактный телефон:</td>
                <td>79505010598</td>
            </tr>
        </tbody>
    </table>
ОПЛАТА
    <p class="clear-sans about-description-text">Пользуясь веб-сервисов вы принимаете <a href="public/base/docs/Пользовательское соглашение и политика конфиденциальности.docx">Пользовательское соглашение </a>принятое для данного ресурса</p>


</div>


@endsection
