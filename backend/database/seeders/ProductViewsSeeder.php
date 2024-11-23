<?php

namespace Database\Seeders;

use App\Models\ProductViews;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class ProductViewsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        ProductViews::factory()->count(50)->create();
    }
}
