<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateEventTimeTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('event_times', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('event_id')->unsigned();
            $table->string('name', 1024)->nullable();
            $table->string('description', 2048)->nullable();
            $table->integer('capacity')->nullable();
            $table->timeTz('time_hold_start')->nullable();
            $table->timeTz('time_hold_finish')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });

        // Связь с таблицей events
        Schema::table('event_times', function($table) {
            $table->foreign('event_id')->references('id')->on('events');
       });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('event_times');
    }
}
