<x-layout>
    <x-slot name="title">
        Manage Users
    </x-slot>

    <x-panel>
        <div>
            <x-heading>Manage Users</x-heading>
            <x-sub-heading>You can manage your Users here</x-sub-heading>
        </div>

        <div class="flex flex-col sm:flex-row gap-3">

            <!-- Add Users Button -->
            <x-button type="primary" href="users.create" icon="add">
                Add User
            </x-button>
        </div>
    </x-panel>

    <x-panel class="mt-6 mx-5">
        <table class="min-w-full divide-y shadow rounded-lg border divide-gray-200 bg-white px-6 mx-9">
            <thead class="bg-gray-50 mx-10">
                <tr>
                    <th scope="col" class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        ID
                    </th>
                    <th scope="col" class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Name
                    </th>
                    <th scope="col" class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Email
                    </th>
                    <th scope="col" class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Role
                    </th>
                    <th scope="col" class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Joined At
                    </th>
                    <th scope="col" class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                    </th>
                    <th scope="col" class="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                    </th>
                </tr>
            </thead>
            <tbody class="divide-y divide-gray-200">
                @foreach ($users as $user)
                    <tr class="hover:bg-gray-50 transition-colors">
                        <td class="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                            {{ $user->id }}
                        </td>
                        <td class="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {{ $user->name }}
                        </td>
                        <td class="px-4 py-4 whitespace-nowrap text-sm text-gray-400">
                            {{ $user->email }}
                        </td>
                        <td class="px-4 py-4 whitespace-nowrap">
                            <span class="px-3 py-2 text-xs text-white rounded-full font-bold
                                {{ $user->role->name == 'admin' ? 'bg-blue-400' : ($user->role->name == 'customer' ? 'bg-purple-400' : 'bg-green-600') }}">
                                {{ $user->role->name == 'admin' ? 'Admin' : ($user->role->name == 'customer' ? 'Customer' : 'Vendor') }}
                            </span>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">
                            <span class="text-sm text-gray-600">
                                {{ $user->created_at->diffForHumans() }}
                            </span>
                        </td>
                        <td class="px-4 py-4 whitespace-nowrap">
                            <span class="text-sm text-white font-bold rounded-full px-3 py-2
                                {{ $user->status == 'active' ? 'bg-green-600' : ($user->status == 'suspended' ? 'bg-yellow-600' : 'bg-red-600') }}">
                                {{ $user->status }}
                            </span>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium flex justify-end gap-2">

                         <!-- Show button -->
                            <a href="{{ route('users.show', $user->id) }}" class="inline-flex items-center px-4 py-2 rounded bg-green-500 text-white hover:bg-green-600">
                                Show
                            </a>
                            <a href="{{ route('users.edit' , $user->id) }}" class="inline-flex items-center px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600">Edit</a>

                            <!-- Delete button wrapped in form -->
                            <form action="{{ route('users.destroy', $user->id) }}" method="POST" style="display:inline-block;" onsubmit="return confirm('Are you sure you want to delete this user?');">
                                @csrf
                                @method('DELETE')
                                <button type="submit" class="inline-flex items-center px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600">
                                    Delete
                                </button>
                            </form>
                        </td>
                    </tr>
                @endforeach
            </tbody>
        </table>
    </x-panel>

    <!-- Pagination -->
    <x-pagination :items="$users" />
</x-layout>
