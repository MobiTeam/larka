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
        Schema::table('info_groups', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('seasons_id')->unsigned();
            $table->string('name')->nullable();
            $table->string('description')->nullable();
            $table->integer('capacity');
            $table->integer('count_training');
            $table->double('price');
            $table->double('day_price');
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
        Schema::dropIfExists('info_groups');
    }
}
