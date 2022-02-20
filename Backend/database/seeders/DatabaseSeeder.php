<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        User::create([
            'first_name' => 'Ricardo',
            'last_name' => 'Cenci Fabris',
            'photo' => null,
            'email' => 'ricardocencifabris@gmail.com',
            'password' =>  bcrypt('123'),
        ]);
        User::create([
            'first_name' => 'Rafael',
            'last_name' => 'Jaques',
            'photo' => null,
            'email' => 'rafa.jaques@gmail.com',
            'password' =>  bcrypt('123'),
        ]);
        \App\Models\User::factory(10)->create();
       
        // $this->call([
        //     UserSeeder::class,
        // ]);
    }
}
