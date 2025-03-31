<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class OrderController extends Controller
{
    // Display a list of orders
    public function index(Request $request)
    {
        $user = Auth::user();

        // Base query for orders
        $ordersQuery = Order::with(['user', 'shippingAddress', 'billingAddress']);

        // Restrict orders based on role
        if ($user->role === 'vendor') {
            $ordersQuery->whereHas('orderItems', function ($query) use ($user) {
                $query->where('artisan_id', $user->id);
            });
        }

        // Apply status filter if provided and not 'all'
        if ($request->has('status') && $request->status !== 'all') {
            $ordersQuery->where('status', $request->status);
        }

        // Paginate the results
        $orders = $ordersQuery->orderBy('created_at', 'desc')->paginate(10);

        return view('dashboard.orders.index', compact('orders'));
    }

    // Show details of a specific order
    public function show($id)
    {
        $order = Order::with(['user', 'shippingAddress', 'billingAddress', 'orderItems.product'])
            ->findOrFail($id);

        return view('dashboard.orders.show', compact('order'));
    }

    // Edit order details (if necessary)
    public function edit($id)
    {
        $order = Order::findOrFail($id);

        return view('dashboard.orders.edit', compact('order'));
    }

    // Update order status
    public function update(Request $request, $id)
    {
        $order = Order::findOrFail($id);

        $request->validate([
            'status' => 'required|in:pending,processing,shipped,delivered,cancelled',
        ]);

        $order->update([
            'status' => $request->status,
        ]);

        return redirect()->route('orders.index')->with('success', 'Order updated successfully.');
    }
}
