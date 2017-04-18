<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTgroupSeasonTable extends Migration
{
    /**
     * Run the migrations.
     * Relation user with season group
     * @return void
     */
    public function up()
    {
        Schema::create('user_tsgroups', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('user_id')->unsigned()->nullable();
            $table->foreign('user_id')->references('id')
                  ->on('users')->onDelete('set null');

            $table->integer('info_group_id')->unsigned()->nullable();
            $table->foreign('info_group_id')->references('id')
                  ->on('info_groups')->onDelete('set null');

            // Осталось оплатить
            $table->double('leftPayd')->nullable();   
            // Полностью ли оплачено
            $table->integer('isFullyPaid')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('user_tsgroups');
    }
}
