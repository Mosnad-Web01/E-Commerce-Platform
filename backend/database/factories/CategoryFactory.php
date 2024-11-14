<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Category>
 */
class CategoryFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {

            $name = $this->faker->words(2, true);
            return [
                'parent_id' => null, // Optional: can create a nested structure if needed
                'name' => ucfirst($name),
                'slug' => Str::slug($name). '-' . uniqid(), // Generate a unique slug
                'description' => $this->faker->sentence,
                'image' => $this->faker->imageUrl(),
                'status' => $this->faker->randomElement(['active', 'inactive']),
            ];

    }
}
