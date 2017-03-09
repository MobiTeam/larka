<?php

use Illuminate\Database\Seeder;

class UserGroupTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
      DB::table('user_groups')->insert([
              'name' => 'admin',
              'description' => 'Администраторы']);

      DB::table('user_groups')->insert([
              'name' => 'user',
              'description' => 'Пользователи системы']);

      DB::table('user_groups')->insert([
              'name' => 'guest',
              'description' => 'Гости']);

      DB::table('user_groups')->insert([
              'name' => 'trainer',
              'description' => 'Тренер']);
    }
}
