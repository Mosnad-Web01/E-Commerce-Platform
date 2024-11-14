<?php

namespace Database\Factories;

use App\Models\Product;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\InventoryTransaction>
 */
class InventoryTransactionFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'product_id' => Product::factory(),
            'type' => $this->faker->randomElement(['in', 'out', 'adjustment']),
            'quantity' => $this->faker->numberBetween(1, 100),
            'reference_type' => $this->faker->randomElement(['order', 'return', 'manual', 'supplier']),
            'reference_id' => $this->faker->numberBetween(1, 1000),
            'notes' => $this->faker->sentence(),
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}
