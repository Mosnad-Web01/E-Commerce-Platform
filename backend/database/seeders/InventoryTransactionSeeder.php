<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\InventoryTransaction;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class InventoryTransactionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        InventoryTransaction::factory()->count(50)->create();
    }
}
