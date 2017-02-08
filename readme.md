
# Фитнесс Ugra-fit
## Создание базы данных
### CREATE DATABASE fitness CHARSET=utf8 COLLATE=utf8_unicode_ci

##Миграции
###Запуск миграций
php artisan migrate
### Запуск сидов
php artisan db:seed
php artisan db:seed --class=UserGroupTableSeeder
