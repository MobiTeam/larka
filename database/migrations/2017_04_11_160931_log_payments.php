<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class LogPayments extends Migration
{
    /**
     * Run the migrations.
     *
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

        // Связь с таблицей users
        Schema::table('log_payments', function($table) {
            $table->foreign('user_id')->references('id')->on('users');
       });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('log_payments');
    }
}
