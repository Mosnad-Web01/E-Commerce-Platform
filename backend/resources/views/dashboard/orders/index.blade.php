<x-layout>
    <x-slot name="title">
        Manage Orders
    </x-slot>

    <x-panel>

        
        <h1 class="text-2xl font-semibold mb-6">Orders</h1>
        
        <!-- Filter Section -->
        <form method="GET" action="{{ route('orders.index') }}" class="mb-4">
            <div class="flex items-center space-x-4">
                <div>
                    <label for="status" class="block text-sm font-medium text-gray-700">Filter by Status</label>
                                        <select id="status" name="status" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm">
                        <option value="all">Show All</option>
                        <option value="pending" {{ request('status') === 'pending' ? 'selected' : '' }}>Pending</option>
                        <option value="processing" {{ request('status') === 'processing' ? 'selected' : '' }}>Processing</option>
                        <option value="shipped" {{ request('status') === 'shipped' ? 'selected' : '' }}>Shipped</option>
                        <option value="delivered" {{ request('status') === 'delivered' ? 'selected' : '' }}>Delivered</option>
                        <option value="cancelled" {{ request('status') === 'cancelled' ? 'selected' : '' }}>Cancelled</option>
                    </select>
                </div>
                
                <div class="flex items-end">
                    <button type="submit" class="px-4 py-2 bg-blue-500 text-white rounded-md shadow-sm hover:bg-blue-600">
                        Apply Filter
                    </button>
                </div>
            </div>
        </form>
    </x-panel>

        <!-- Orders Table -->
        <x-panel>

                <table class="min-w-full border-collapse border border-gray-200">
                    <thead class="bg-gray-50 mx-10">
                    <tr>
                        <th scope="col" class="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Order ID
                        </th>
                        <th scope="col" class="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Customer
                        </th>
                        <th scope="col" class="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                        </th>
                        <th scope="col" class="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Total
                        </th>
                        <th scope="col" class="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Created At
                        </th>
                        <th scope="col" class="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                           Actions 
                        </th>
                    </tr>
            </thead>
                    <tbody class="divide-y divide-gray-200">
                        @forelse($orders as $order)
                            <tr class="{{ $loop->odd ? 'bg-gray-50' : 'bg-white' }}">
                                <td class="border border-gray-200 px-4 py-2">{{ $order->id }}</td>
                                <td class="border border-gray-200 px-4 py-2">
                                    {{ $order->user->name ?? 'Guest' }}
                                </td>
                                <td class="border border-gray-200 px-4 py-2">
                                    <span class="px-2 py-1 rounded-full text-sm 
                                        @if($order->status === 'pending') bg-yellow-200 text-yellow-800
                                        @elseif($order->status === 'processing') bg-blue-200 text-blue-800
                                        @elseif($order->status === 'shipped') bg-purple-200 text-purple-800
                                        @elseif($order->status === 'delivered') bg-green-200 text-green-800
                                        @elseif($order->status === 'cancelled') bg-red-200 text-red-800
                                        @endif">
                                        {{ ucfirst($order->status) }}
                                    </span>
                                </td>
                                <td class="border border-gray-200 px-4 py-2">
                                    ${{ number_format($order->orderItems->sum('total_price'), 2) }}
                                </td>
                                <td class="border border-gray-200 px-4 py-2">
                                    {{ $order->created_at->format('Y-m-d H:i') }}
                                </td>
                                <td class="border border-gray-200 px-4 py-2 text-center">
                                    <a href="{{ route('orders.show', $order->id) }}" class="inline-flex items-center px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600">
                                        View
                                    </a>
                                    <a href="{{ route('orders.edit', $order->id) }}" class="inline-flex items-center px-4 py-2 rounded bg-yellow-500 text-white hover:bg-yellow-600">
                                        Edit
                                    </a>

                                </td>
                            </tr>
                        @empty
                            <tr>
                                <td colspan="6" class="text-center text-gray-500 py-4">No orders found.</td>
                            </tr>
                        @endforelse
                    </tbody>
                </table>
            
        </x-panel>


        <!-- Pagination -->
        <x-pagination :items="$orders" />
    </div>
</x-layout>
