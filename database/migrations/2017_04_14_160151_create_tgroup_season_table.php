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
        Schema::create('log_payments', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('user_id')->unsigned();
            $table->string('payments_id')->nullable();
            $table->double('amount');
            // Если тип 1 - Доход, а 2 - Расход
            $table->integer('type')->nullable();
            // Если isApproved 0 - то оплата отклонена, а 1 - оплата прошла успешно
            $table->integer('isApproved')->nullable();
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
        //
    }
}
