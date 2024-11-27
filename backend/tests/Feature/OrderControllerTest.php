<?php

namespace Tests\Feature;

use App\Models\Address;
use App\Models\Order;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class OrderControllerTest extends TestCase
{
    use RefreshDatabase;

    public function test_authenticated_user_can_create_order()
    {
        $user = User::factory()->create();
        $address = Address::factory()->create(['user_id' => $user->id]);

        $this->actingAs($user, 'sanctum');

        $response = $this->postJson('/api/orders', [
            'shipping_address_id' => $address->id,
            'billing_address_id' => $address->id,
            'total_amount' => 100.50,
            'shipping_amount' => 10.00,
            'tax_amount' => 5.00,
            'discount_amount' => 2.50,
            'notes' => 'Leave at the front door.',
        ]);

        $response->assertStatus(201);
        $this->assertDatabaseHas('orders', ['user_id' => $user->id, 'total_amount' => 100.50]);
    }


    public function test_user_can_view_their_orders()
    {
        $user = User::factory()->create();
        $this->actingAs($user, 'sanctum');

        $orders = Order::factory()->count(3)->create(['user_id' => $user->id]);

        $response = $this->getJson('/api/orders');
        $response->assertStatus(200)->assertJsonCount(3);
    }
}
