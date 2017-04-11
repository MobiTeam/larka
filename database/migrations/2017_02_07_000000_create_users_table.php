<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    //  Таблица пользователя
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('user_groups_id')->unsigned()->default(2);
            $table->string('email')->unique();
            $table->string('password');
            $table->string('family_name')->nullable();
            $table->string('name')->nullable();
            // $table->string('patronymic')->nullable();
            $table->date('born_date')->nullable();
            $table->string('sex', 32)->nullable();
            $table->string('phone')->unique()->nullable();
            $table->string('photo_link')->nullable();
            $table->integer('is_activated')->default('0');
            $table->double('balance')->default(0);
            $table->string('activated_token', 60)->unique()->nullable();
            $table->timestamps();
            $table->softDeletes();
        });
        // Связь с таблицей user groups
        Schema::table('users', function($table) {
            $table->foreign('user_groups_id')->references('id')->on('user_groups');
       });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('users');
    }
}
