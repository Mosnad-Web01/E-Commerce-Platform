<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\User;
use App\Models\Address;
use App\Models\Order;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Order>
 */
class OrderFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Order::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            // Link to a random or newly created user
            'user_id' => User::factory(),

            // Generate a unique, uppercase order number (e.g., ORD-12345)
            'order_number' => strtoupper($this->faker->unique()->bothify('ORD-#####')),

            // Randomly select an order status
            'status' => $this->faker->randomElement([
                'pending',
                'processing',
                'shipped',
                'delivered',
                'cancelled',
            ]),

            // Generate realistic monetary values for amounts
            'total_amount' => $this->faker->randomFloat(2, 50, 500),
            'shipping_amount' => $this->faker->randomFloat(2, 0, 50),
            'tax_amount' => $this->faker->randomFloat(2, 0, 20),
            'discount_amount' => $this->faker->randomFloat(2, 0, 50),

            // Payment status and method
            'payment_status' => $this->faker->randomElement([
                'pending',
                'paid',
                'failed',
                'refunded',
            ]),
            'payment_method' => $this->faker->randomElement([
                'credit_card',
                'paypal',
                'bank_transfer',
                'cash_on_delivery',
            ]),

            // Link to random or newly created addresses
            'shipping_address_id' => Address::factory(),
            'billing_address_id' => Address::factory(),

            // Optional notes field
            'notes' => $this->faker->optional()->sentence(),
        ];
    }
}
