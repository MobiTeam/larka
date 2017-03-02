<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateSeasonImagesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('image_season', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('season_id')->unsigned()->nullable();
            $table->foreign('season_id')->references('id')
                  ->on('seasons')->onDelete('cascade');

            $table->integer('image_id')->unsigned()->nullable();
            $table->foreign('image_id')->references('id')
                  ->on('images')->onDelete('cascade');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('image_season');
    }
}
