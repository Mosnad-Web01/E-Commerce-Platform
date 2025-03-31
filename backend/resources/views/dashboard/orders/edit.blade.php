<x-layout>
    <x-slot name="title">
        Edit Order #{{ $order->id }}
    </x-slot>

    <x-panel>
        <div>
            <x-heading>Edit Order</x-heading>
            <x-sub-heading>Modify details for Order #{{ $order->id }} placed by {{ $order->user->name ?? 'Guest' }}</x-sub-heading>
        </div>

        <!-- Edit Form -->
        <form action="{{ route('orders.update', $order->id) }}" method="POST" class="inline-block ml-2">
            @csrf
            @method('PUT')

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <!-- Order Status -->
                <div>
                    <label for="status" class="block text-sm font-medium text-gray-700">Order Status</label>
                    <select id="status" name="status" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm">
                        <option value="pending" {{ $order->status === 'pending' ? 'selected' : '' }}>Pending</option>
                        <option value="processing" {{ $order->status === 'processing' ? 'selected' : '' }}>Processing</option>
                        <option value="shipped" {{ $order->status === 'shipped' ? 'selected' : '' }}>Shipped</option>
                        <option value="delivered" {{ $order->status === 'delivered' ? 'selected' : '' }}>Delivered</option>
                        <option value="cancelled" {{ $order->status === 'cancelled' ? 'selected' : '' }}>Cancelled</option>
                    </select>
                </div>

                <!-- Total (Read-Only) -->
                <div>
                    <label for="total" class="block text-sm font-medium text-gray-700">Total</label>
                    <input type="text" id="total" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm" 
                           value="${{ number_format($order->orderItems->sum('total_price'), 2) }}" readonly>
                </div>

                <!-- Customer Information (Read-Only) -->
                <div class="col-span-2">
                    <h2 class="text-lg font-semibold mt-4">Customer Information</h2>
                    <p><strong>Name:</strong> {{ $order->user->name ?? 'Guest' }}</p>
                    <p><strong>Email:</strong> {{ $order->user->email ?? 'N/A' }}</p>
                </div>
            </div>

            <!-- Action Buttons -->
            <div class="mt-6 flex justify-end gap-4">
                <a href="{{ route('orders.index') }}" class="inline-flex items-center px-4 py-2 rounded bg-gray-500 text-white hover:bg-gray-600">
                    Cancel
                </a>
                <button type="submit" class="inline-flex items-center px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600">
                    Save Changes
                </button>
            </div>
        </form>
    </x-panel>
</x-layout>
