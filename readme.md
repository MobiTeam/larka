
# Фитнесс Ugra-fit
## Создание базы данных
### CREATE DATABASE fitness CHARSET=utf8 COLLATE=utf8_unicode_ci

##Миграции
###Запуск миграций
---
1.php artisan migrate:rollaback
---
2.php artisan migrate
### Запуск сидов
---
1.php artisan db:seed
---
2.php artisan db:seed --class=UserGroupTableSeeder
---
3.php artisan db:seed --class=UsersTableSeeder
