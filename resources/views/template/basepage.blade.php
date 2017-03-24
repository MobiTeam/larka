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
        <script src="base/js/jquery.min.js"></script>
        <script src="base/js/bootstrap.min.js"></script>
    </head>
    <body>
        <div class="container center-block main-container">
            <!-- Шапка -->
            <div class="main-header row">
                <div class="col-xs-4 main-header-img text-center hidden-xs">
                    <a href="/">
                        <img class="main-header-logo" src="base/img/logo.png" alt="">
                    </a>
                </div>
                <div class="col-xs-8 main-header-nav">
                    <nav class="navbar">
                      <div class="container-fluid main-nav">
                        <ul class="nav navbar-nav navbar-center">

                            <li>
                                <a href="/photogallery" class="main-nav-a">
                                      <img class="main-nav-logo" src="base/img/photo.png" alt="">
                                      <br>
                                      Фотогаллерея
                                </a>
                            </li>

                            <li>
                                <a href="/news" class="main-nav-a">
                                      <img class="main-nav-logo" src="base/img/news.png" alt="">
                                      <br>
                                      Новости
                                </a>
                            </li>

                          <li>
                              <a href="/dashboard" class="main-nav-a">
                                    <img class="main-nav-logo" src="base/img/lk.png" alt="">
                                    <br>
                                    Личный кабинет
                              </a>
                          </li>

                          <li>
                              <a href="/contact" class="main-nav-a">
                                    <img class="main-nav-logo" src="base/img/contacts.png" alt="">
                                    <br>
                                    Контакты
                              </a>
                          </li>

                          <li>
                              <a href="/about" class="main-nav-a">
                                    <img class="main-nav-logo" src="base/img/about_season.png" alt="">
                                    <br>
                                    Про сезон
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
                    <a href="https://vk.com/vforme_hm">
                        <img class="footer-social-vk" src="base/img/social/vk.png" alt="">
                    </a>
                    <a href="https://www.instagram.com/irina_vforme">
                        <img class="footer-social-insta" src="base/img/social/instagram.png" alt="">
                    </a>
                </div>
                <div class="col-xs-12 footer-information">© VForme {{ date('Y') }}</div>
            </div>

        </div>

<script type="text/javascript">
        $(document).ready(function(){
            $('#carousel').carousel({
              interval: 3500
            })
        });
</script>
    </body>
</html>
