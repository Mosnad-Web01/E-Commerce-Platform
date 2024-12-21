<x-layout>
    <x-slot name="title">
        Order Details
    </x-slot>

    <x-panel>
        <div>
            <x-heading>Order #{{ $order->id }}</x-heading>
            <x-sub-heading>Details of the order placed by {{ $order->user->name ?? 'Guest' }}</x-sub-heading>
        </div>

        <!-- Order Details Grid -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-6">
            <!-- Customer Info Section -->
            <x-panel>
                <h2 class="text-lg font-semibold mb-4">Customer Info</h2>
                <p><strong>Name:</strong> {{ $order->user->name ?? 'Guest' }}</p>
                <p><strong>Email:</strong> {{ $order->user->email ?? 'N/A' }}</p>
            </x-panel>

            <!-- Order Info Section -->
            <x-panel>
                <h2 class="text-lg font-semibold mb-4">Order Info</h2>
                <p><strong>Status:</strong> 
                    <span class="px-3 py-2 text-xs rounded-full
                        @if($order->status === 'pending') bg-yellow-200 text-yellow-800
                        @elseif($order->status === 'processing') bg-blue-200 text-blue-800
                        @elseif($order->status === 'shipped') bg-purple-200 text-purple-800
                        @elseif($order->status === 'delivered') bg-green-200 text-green-800
                        @elseif($order->status === 'cancelled') bg-red-200 text-red-800
                        @endif">
                        {{ ucfirst($order->status) }}
                    </span>
                </p>
                <p><strong>Total:</strong> ${{ number_format($order->orderItems->sum('total_price'), 2) }}</p>
                <p><strong>Placed At:</strong> {{ $order->created_at->format('Y-m-d H:i') }}</p>
            </x-panel>
        </div>

        <!-- Order Items Section -->
        <x-panel class="mt-8">
            <h2 class="text-lg font-semibold mb-4">Order Items</h2>
            <table class="min-w-full divide-y shadow rounded-lg border divide-gray-200 bg-white">
                <thead class="bg-gray-50">
                    <tr>
                        <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                        <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                        <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                        <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-gray-200">
                    @foreach($order->orderItems as $item)
                        <tr>
                            <td class="px-4 py-2 text-sm">{{ $item->product->name ?? 'N/A' }}</td>
                            <td class="px-4 py-2 text-sm">{{ $item->quantity }}</td>
                            <td class="px-4 py-2 text-sm">${{ number_format($item->price_per_unit, 2) }}</td>
                            <td class="px-4 py-2 text-sm">${{ number_format($item->total_price, 2) }}</td>
                        </tr>
                    @endforeach
                </tbody>
            </table>
        </x-panel>
    </x-panel>

    <!-- Actions Section -->
    <div class="mt-6 flex justify-end gap-4">
        <a href="{{ route('orders.index') }}" class="inline-flex items-center px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600">
            Back to Orders
        </a>
        <a href="{{ route('orders.edit', $order->id) }}" class="inline-flex items-center px-4 py-2 rounded bg-yellow-500 text-white hover:bg-yellow-600">
            Edit Order
        </a>
    </div>
</x-layout>
