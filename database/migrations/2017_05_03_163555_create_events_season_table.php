<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateEventsSeasonTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        // Schema::create('season_event', function (Blueprint $table) {
        //     $table->increments('id');
        //     $table->integer('season_id')->unsigned()->nullable();
        //     $table->foreign('season_id')->references('id')
        //           ->on('seasons')->onDelete('set null');
        //
        //     $table->integer('events_id')->unsigned()->nullable();
        //     $table->foreign('events_id')->references('id')
        //           ->on('events')->onDelete('set null');
        //     $table->timestamps();
        //     $table->softDeletes();
        // });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('season_event');
    }
}
