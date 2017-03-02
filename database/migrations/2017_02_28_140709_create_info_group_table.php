<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateInfoGroupTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('info_groups', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('season_id')->unsigned();
            $table->string('name', 512)->nullable();
            $table->string('description', 2048)->nullable();
            $table->integer('capacity');
            $table->integer('count_training');
            $table->double('price');
            $table->double('day_price');
            $table->timestamps();
            $table->softDeletes();
        });

        Schema::table('info_groups', function($table) {
            $table->foreign('season_id')->references('id')->on('seasons');
       });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('info_groups');
    }
}
