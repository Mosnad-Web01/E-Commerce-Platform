<?php

namespace Database\Seeders;

use App\Models\ProductView;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class ProductViewSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        ProductView::factory()->count(50)->create();
    }
}
