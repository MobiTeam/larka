<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title>В-Форме - @yield('title')</title>
        <meta name="keywords" content="Фитнес, Креативный фитнес, Фитнес в Ханты-Мансийске, в-форме">
        <link rel="stylesheet" href="base/css/bootstrap.min.css">
        <link rel="stylesheet" href="base/css/bootstrap-theme.min.css">
        <link rel="stylesheet" href="base/css/ClearSans.css">
        <link rel="stylesheet" href="base/css/main.css">
         <link rel="stylesheet" href="base/fancybox/jquery.fancybox.css" type="text/css" media="screen" />
        <script src="base/js/jquery.min.js"></script>
        <script src="base/js/bootstrap.min.js"></script>
    </head>
    <body>
        <div class="container center-block main-container">
            <!-- Шапка -->
            <div class="main-header row">
                <div class="col-xs-4 col-md-4 main-header-img text-center hidden-xs">
                    <a href="/">
                        <img class="main-header-logo" src="base/img/logo2.png" alt="">
                    </a>
                </div>
                <div class="col-xs-12 col-md-8 main-header-nav">
                    <!-- Меню navbar -->
                            <nav class="navbar navbar-default navbar-custom">

                              <!-- Бренд и переключатель, который вызывает меню на мобильных устройствах -->
                              <div class="navbar-header">
                                <!-- Кнопка с полосочками, которая открывает меню на мобильных устройствах -->
                                <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#main-menu" aria-expanded="false">
                                  <span class="sr-only">Toggle navigation</span>
                                  <span class="icon-bar"></span>
                                  <span class="icon-bar"></span>
                                  <span class="icon-bar"></span>
                                </button>
                              </div>

                              <!-- Содержимое меню (коллекция навигационных ссылок, формы и др.) -->
                              <div class="collapse navbar-collapse" id="main-menu" >
                                  <!-- Список ссылок, расположенных слева -->
                                  <ul class="nav navbar-nav navbar-center">
                                      <li>
                                          <a href="/photogallery" class="main-nav-a {{ Request::segment(1) === 'photogallery' ? 'active' : null }}">
                                                <img class="main-nav-logo" src="base/img/photo.png" alt="">
                                                <br>
                                                Архив похудизма
                                          </a>
                                      </li>

                                      <li>
                                          <a href="/news" class="main-nav-a {{ Request::segment(1) === 'news' ? 'active' : null }}">
                                                <img class="main-nav-logo" src="base/img/news.png" alt="">
                                                <br>
                                                Новости
                                          </a>
                                      </li>

                                    <li>
                                        <a href="/dashboard" class="main-nav-a {{ Request::segment(1) === 'dashboard' ? 'active' : null }}">
                                              <img class="main-nav-logo" src="base/img/lk.png" alt="">
                                              <br>
                                              Нужный кабинет
                                        </a>
                                    </li>

                                    <li>
                                        <a href="/contact" class="main-nav-a {{ Request::segment(1) === 'contact' ? 'active' : null }}">
                                              <img class="main-nav-logo" src="base/img/contacts.png" alt="">
                                              <br>
                                              Жиросжигатели
                                        </a>
                                    </li>

                                    <li>
                                        <a href="/about" class="main-nav-a {{ Request::segment(1) === 'about' ? 'active' : null }}">
                                              <img class="main-nav-logo" src="base/img/about_season.png" alt="">
                                              <br>
                                              Про сезон
                                        </a>
                                    </li>
                                    <li>
                                        <a href="/justify" class="main-nav-a {{ Request::segment(1) === 'justify' ? 'active' : null }}">
                                              <img class="main-nav-logo" src="base/img/justify.png" alt="">
                                              <br>
                                              Контакты
                                        </a>
                                    </li>
                                  </ul>
                              </div>
                            </nav>
                </div>
            </div>

            <!-- Тело -->
            <div class="main-content row">
                @yield('content')
            </div>
            <div class="separate"></div>

            <!--  -->
            <div class="footer row">
                <div class="col-xs-12 footer-social">
                    <span class="text-center footer-social-text">Присоединяйся к нам в социальных сетях:</span>
                    <br>
                    <a href="https://vk.com/vforme_hm" target="_blank">
                        <img class="footer-social-vk" src="base/img/social/vk.png" alt="">
                    </a>
                    <a href="https://www.instagram.com/irina_vforme" target="_blank">
                        <img class="footer-social-insta" src="base/img/social/instagram.png" alt="">
                    </a>
                </div>
                <div class="col-xs-12 footer-information">© VForme {{ date('Y') }}</div>
            </div>
        </div>

<script type="text/javascript" src="base/fancybox/jquery.fancybox.pack.js"></script>
<script type="text/javascript">
        $(document).ready(function(){
            $('#carousel').carousel({
              interval: 3500
          });
          $("a.fancyimage").fancybox();
        });
</script>
    </body>
</html>
