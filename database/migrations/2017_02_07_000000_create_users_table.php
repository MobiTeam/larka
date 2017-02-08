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
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('user_groups_id')->unsigned()->default(2);
            $table->string('name')->nullable();
            $table->string('email')->unique();
            $table->string('password');
            $table->string('login')->nullable();
            $table->string('sex', 12)->nullable();
            // $table->string('fullname');
            $table->string('phone')->unique()->nullable();
            $table->string('photo_link')->nullable();
            $table->integer('is_activated')->default('0');
            $table->string('activated_token', 60)->unique()->nullable();
            $table->rememberToken();
            $table->timestamps();
            $table->softDeletes();

            // $table->foreign('user_group_id')->references('id')->on('user_group');
        });

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
