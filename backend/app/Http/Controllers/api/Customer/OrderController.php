<?php

namespace App\Http\Controllers\Api\Customer;

use App\Http\Controllers\Controller;
use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

class OrderController extends Controller
{
    // List all orders for the authenticated user
    public function index()
    {
        $orders = Order::with(['shippingAddress', 'billingAddress'])
            ->where('user_id', Auth::id())
            ->latest()
            ->get();

        return response()->json($orders, 200);
    }

    // Show a specific order for the authenticated user
    public function show($id)
    {
        $order = Order::with(['shippingAddress', 'billingAddress'])
            ->where('user_id', Auth::id())
            ->find($id);

        if (!$order) {
            return response()->json(['error' => 'Order not found'], 404);
        }

        return response()->json($order, 200);
    }

    // Place a new order
    public function store(Request $request)
    {
        $request->validate([
            'shipping_address_id' => 'required|exists:addresses,id',
            'billing_address_id' => 'required|exists:addresses,id',
            'total_amount' => 'required|numeric|min:0.01',
            'shipping_amount' => 'nullable|numeric|min:0',
            'tax_amount' => 'nullable|numeric|min:0',
            'discount_amount' => 'nullable|numeric|min:0',
            'notes' => 'nullable|string|max:1000',
        ]);

        $order = Order::create([
            'order_number' => Str::uuid(), // Generate a unique order number
            'user_id' => Auth::id(),
            'status' => 'pending',
            'total_amount' => $request->total_amount,
            'shipping_amount' => $request->shipping_amount ?? 0,
            'tax_amount' => $request->tax_amount ?? 0,
            'discount_amount' => $request->discount_amount ?? 0,
            'payment_status' => 'pending',
            'payment_method' => null, // Can be updated later
            'notes' => $request->notes,
            'shipping_address_id' => $request->shipping_address_id,
            'billing_address_id' => $request->billing_address_id,
        ]);

        return response()->json($order, 201);
    }

    // Update the order status (if allowed for customers)
    public function update(Request $request, $id)
    {
        $order = Order::where('user_id', Auth::id())->find($id);

        if (!$order) {
            return response()->json(['error' => 'Order not found'], 404);
        }

        $request->validate([
            'status' => 'required|in:pending,processing,shipped,delivered,cancelled',
        ]);

        $order->update([
            'status' => $request->status,
        ]);

        return response()->json($order, 200);
    }
}
