<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateEventsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('events', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('season_id')->unsigned();
            $table->string('name', 1024)->nullable();
            $table->string('description', 2048)->nullable();
            $table->date('date_hold')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });

        // Связь с таблицей seasons
        Schema::table('events', function($table) {
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
        Schema::dropIfExists('events');
    }
}
