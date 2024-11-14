<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // creates 3 roles : admin, artisan, customer
        $this->call(RoleSeeder::class);

        // creates 1 admin for testing
        User::factory(1)->create(
            [
                'name' => 'Admin',
                'email' => 'admin@example.com',
                'role_id' => 1,
                'password' => '123456',
                'email_verified_at' => now(),
                'phone_number' => '1234567890',
                'status' => 'active',
            ]
        );

        // creates 10 users with random roles and status
        User::factory(10)->create();

        $this->call([
            UserProfileSeeder::class,   // to create 10 user profiles
            CategorySeeder::class,      // to create 5 categories and 15 subcategories
            ProductSeeder::class,       // to create 20 products
            ProductImageSeeder::class,  // to create 3 images for each product
            ProductAttributeSeeder::class, // to create 3 attributes for each product
            AddressSeeder::class,          // to create 3 addresses for each user
            OrderSeeder::class,            // to create 10 orders for each user (customer) with related addresses
            CartSeeder::class,             // to create 1 cart for each user
            CartItemSeeder::class,         // to create 1 cart item for each cart
            OrderItemSeeder::class,        // to create 3 order items for each order
            ReviewSeeder::class,           // to create 3 reviews for each order item
            WishlistSeeder::class,         // to create 5 wishlists for each user
            InventoryTransactionSeeder::class, // to create 50 inventory transactions
            ProductViewSeeder::class,      // to create 50 product views

        ]);
    }
}
