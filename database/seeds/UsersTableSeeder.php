<?php

use Illuminate\Database\Seeder;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('users')->insert([
                'user_groups_id' => '2',
                'email'          => 'Viking0607@mail.ru',
                'password'       => '$2y$10$Jme7BYgqVXe2tIoKsLTotuHva8e6Gy2ZK1aMpnXxKkL57dLQkkeIi',
                'family_name'    => 'Якимчук',
                'name'           => 'Александр',
                'born_date'      => '1994-07-06',
                'is_activated'   => '1',
                'balance'        => 0,
                'activated_token'   => '$2y$10$w015QAPhVuodd3v2uc1OluXr6OiCJ05X1k8mmjEmSirC6iXgjt3Pe',
        ]);

        DB::table('users')->insert([
                'user_groups_id' => '2',
                'email'          => 'vladonxp@mail.ru',
                'password'       => '$2y$10$Jme7BYgqVXe2tIoKsLTotuHva8e6Gy2ZK1aMpnXxKkL57dLQkkeIi',
                'family_name'    => 'Петроченко',
                'name'           => 'Владислав',
                'born_date'      => '1994-04-29',
                'is_activated'   => '1',
                'balance'        => 0,
                'activated_token'   => '$2y$10$w015QAPhVuodd3v2uc1O2uXr6OiCJ05X1k8mmjEmSirC6iXgjt3Pe',
        ]);

        DB::table('users')->insert([
                'user_groups_id' => '1',
                'email'          => 'admin@mail.ru',
                'password'       => '$2y$10$Jme7BYgqVXe2tIoKsLTotuHva8e6Gy2ZK1aMpnXxKkL57dLQkkeIi',
                'family_name'    => 'Администратор',
                'name'           => 'Четкий',
                'born_date'      => '1994-08-12',
                'is_activated'   => '1',
                'balance'        => 0,
                'activated_token'   => '$2y$10$w015QAPhVuodd3v3uc1OluXr6OiCJ05X1k8mmjEmSirC6iXgjt3Pe',
        ]);

        DB::table('users')->insert([
                'user_groups_id' => '2',
                'email'          => 'user@mail.ru',
                'password'       => '$2y$10$Jme7BYgqVXe2tIoKsLTotuHva8e6Gy2ZK1aMpnXxKkL57dLQkkeIi',
                'family_name'    => 'Юзер',
                'name'           => 'Нечеткий',
                'born_date'      => '1994-10-19',
                'is_activated'   => '1',
                'balance'        => 0,
                'activated_token'   => '$2y$10$w015QAPhVuodd4v2uc1OluXr6OiCJ05X1k8mmjEmSirC6iXgjt3Pe',
        ]);
    }
}
