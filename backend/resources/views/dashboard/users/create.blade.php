<x-layout>
    <x-slot name="title">
        Add New User
    </x-slot>

    <x-panel>
        <x-form.form action="{{ route('users.store') }}" method="POST">
            @csrf <!-- Include CSRF token -->

            <!-- Heading -->
            <div class="mb-6">
                <x-heading>Add New User</x-heading>
                <x-sub-heading>Create a new user with the details below</x-sub-heading>
            </div>
            <hr class="my-4" />

            <!-- Basic User Information -->
            <div class="">
                <x-form.input name="name" label="Full Name" placeholder="Enter full name" required class="p-4 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500" />
                <x-form.input type="email" name="email" label="Email Address" placeholder="Enter email address" required class="p-4 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500" />
            </div>

            <!-- Password Fields -->
            <div class="grid grid-cols-1  gap-6 mt-6">
                <x-form.input type="password" name="password" label="Password" placeholder="Enter password" required class="p-4 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500" />
                <x-form.input type="password" name="password_confirmation" label="Confirm Password" placeholder="Confirm password" required class="p-4 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500" />
            </div>

            <!-- Role Selection -->
            <div class="mt-6">
                <x-form.select name="role_id" label="User Role" required class="p-4 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500">
                    <option value="">Select Role</option>
                    @foreach ($roles as $role)
                        <option value="{{ $role->id }}">{{ ucfirst($role->name) }}</option>
                    @endforeach
                </x-form.select>
            </div>

            <!-- Contact Information -->
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
                <x-form.input name="phone" label="Phone Number" placeholder="Enter phone number" class="p-4 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500" />
                <x-form.input name="address" label="Address" placeholder="Enter address" class="p-4 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500" />
            </div>

            <!-- Status Selection (Hidden) -->
            <div class="mt-6 hidden">
                <x-form.select name="status" label="Status" class="p-2 hidden">
                    <option value="active" selected>Active</option>
                    <option value="inactive">Inactive</option>
                </x-form.select>
            </div>

            <!-- Submit Button -->
            <div class="mt-6 flex justify-end">
                <button type="submit" class="px-6 py-3 rounded-lg bg-blue-600 text-white font-semibold text-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
                    Create User
                </button>
            </div>
        </x-form.form>
    </x-panel>
</x-layout>
