
@extends('template.basepage')
<!-- Подключаем базову страницу -->

@section('title', 'Контакты')

@section('content')

<h1 class="clear-sans text-center"><b>Данные организации</b></h1>
<div class="about-description">
<div class="panel-group" id="accordion" role="tablist" aria-multiselectable="true">
    <!--  -->
  <div class="panel panel-info">
    <div class="panel-heading" role="tab" id="headingOne">
      <h4 class="panel-title jusfify-accrodion-panel-title">
        <a role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
          Способы оплаты
        </a>
      </h4>
    </div>
    <div id="collapseOne" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="headingOne">
      <div class="panel-body jusfify-accrodion-panel-body">
         <p><b>Банковской картой:</b><br>
              Для оплаты товара с помощью банковской карты необходимо в личном кабинете перейти вовкладку «Баланс» ввести сумму оплаты и нажать на кнопку «Пополнить».
          </p>
          <p>
              Оплата происходит через ПАО СБЕРБАНК с использованием Банковских карт следующих платежных систем:
              <ul>
                  <li>МИР</li>
                  <li>VISA Internationar</li>
                  <li>Mastercard Worldwide</li>
              </ul>
          </p>
            <div class="jusfify-accrodion-pay-banks">
                <a href="https://www.sberbank.ru/ru/person"><img src="base/img/banks/sberbank.jpg" alt=""></a>
                <a href="http://mironline.ru/"><img src="base/img/banks/mir.png" alt=""></a>
                <a href="http://www.visa.com.ru/ru/ru-ru/index.shtml"><img src="base/img/banks/visa.png" alt=""></a>
                <a href="https://www.mastercard.ru/ru-ru.html"><img src="base/img/banks/mastercard.png" alt=""></a>
            </div>
      </div>
    </div>
  </div>
  <!--  -->
  <div class="panel panel-info">
    <div class="panel-heading" role="tab" id="headingTwo">
      <h4 class="panel-title jusfify-accrodion-panel-title">
        <a class="collapsed" role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
            Описание процесса передачи данных
        </a>
      </h4>
    </div>
    <div id="collapseTwo" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingTwo">
          <div class="panel-body jusfify-accrodion-panel-body">
            Для оплаты (ввода реквизитов Вашей карты) Вы будете перенаправлены на платежный шлюз <b>ПАО СБЕРБАНК</b>. Соединение с платежным шлюзом и передача информации осуществляется в защищенном режиме с использованием протокола шифрования SSL. В случае если Ваш банк поддерживает технологию безопасного проведения интернет-платежей Verified By Visa или MasterCard SecureCode для проведения платежа также может потребоваться ввод специального пароля. Конфиденциальность сообщаемой персональной информации обеспечивается ПАО СБЕРБАНК. Введенная информация не будет предоставлена третьим лицам за исключением случаев, предусмотренных законодательством РФ. Проведение платежей по банковским картам осуществляется в строгом соответствии с требованиями платежных систем <b>МИР, Visa Int. и MasterCard Europe Sprl</b>.
        </div>
    </d iv>
  </div>
  </div>
  <!--  -->
  <div class="panel panel-info">
    <div class="panel-heading" role="tab" id="headingThree">
      <h4 class="panel-title jusfify-accrodion-panel-title">
        <a class="collapsed" role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
          Описание возврата товара/услуги
        </a>
      </h4>
    </div>
    <div id="collapseThree" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingThree">
      <div class="panel-body jusfify-accrodion-panel-body">
        Денежные средства возвращаются пропорционально доли не оказанных услуг.       </div>
    </div>
  </div>
  <!--  -->
  <div class="panel panel-info">
    <div class="panel-heading" role="tab" id="headingFour">
      <h4 class="panel-title jusfify-accrodion-panel-title">
        <a class="collapsed" role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
          Контактные данные организации
        </a>
      </h4>
    </div>
    <div id="collapseFour" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingFour">
      <div class="panel-body">
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
                      <td>Дом:</td>
                      <td>7</td>
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
       </div>
    </div>
  </div>
  <!--  -->
  <div class="panel panel-info">
    <div class="panel-heading" role="tab" id="headingSix">
      <h4 class="panel-title jusfify-accrodion-panel-title">
        <a class="collapsed" role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseSix" aria-expanded="false" aria-controls="collapseSix">
          Пользовательское соглашение
        </a>
      </h4>
    </div>
    <div id="collapseSix" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingSix">
      <div class="panel-body jusfify-accrodion-panel-body">
          <p>Пользовательское соглашение – это соглашение пользователей ресурса (сайта ) с одной стороны и ресурсом (сайт) с другой стороны, в котором прописаны ряд условий между
сторонами. </p>
          Используя веб-сервис вы принимаете <a href="public/base/docs/Пользовательское соглашение и политика конфиденциальности.docx">Пользовательское соглашение </a>принятое для данного ресурса!   </div>
    </div>
  </div>
</div>


</div>


@endsection
