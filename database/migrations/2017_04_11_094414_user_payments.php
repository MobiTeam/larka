<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class UserPayments extends Migration
{
    /**
     * Run the migrations.
     * @return void
     */
    public function up()
    {
        Schema::create('user_payments', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('user_id')->unsigned();
            $table->string('payments_id')->nullable();
            $table->double('amount');
            // Если isApproved 0 - то оплата отклонена, а 1 - оплата прошла успешно
            $table->integer('isApproved')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });

        // Связь с таблицей users
        Schema::table('user_payments', function($table) {
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
        Schema::dropIfExists('user_payments');
    }
}
