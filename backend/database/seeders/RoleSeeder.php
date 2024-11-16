<?php

namespace Database\Seeders;

use App\Models\Role;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Factories\Sequence;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Role::factory(3)->create();

        // create 3 roles : admin, artisan, customer
            Role::factory(3)->state(new Sequence(
                ['name' => 'admin'],
                ['name' => 'vendor'],
                ['name' => 'customer']
            ))->create();
    }
}
