<?php

use Illuminate\Database\Seeder;

class PaymentsUsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('user_payments')->insert([
                'user_id' => '2',
                'payments_id' => '67ccc06a-ab48-4ff1-8243-14e4b70507c0',
                'amount' => 2000,
                'isApproved' => 1]);

        DB::table('user_payments')->insert([
                'user_id' => '1',
                'payments_id' => '2a3f9905-ac76-4188-97ca-be20a0ef1d9c',
                'amount' => 3000,
                'isApproved' => 0]);

        DB::table('user_payments')->insert([
                'user_id' => '2',
                'payments_id' => '2e20e923-ae8f-4d7c-bfd1-6ae3e542cc98',
                'amount' => 4000,
                'isApproved' => 1]);

        DB::table('user_payments')->insert([
                'user_id' => '1',
                'payments_id' => ' 	67ccc06a-ab48-4ff1-8243-14e4b70507c0',
                'amount' => 5000,
                'isApproved' => 0]);
    }
}
