<x-layout>
    <x-slot name="title">
        User Details
    </x-slot>

    <x-panel>
        <div>
            <x-heading>User Details</x-heading>
            <x-sub-heading>View user information</x-sub-heading>
        </div>
        <hr />

    </x-panel>
        <!-- User Information -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <x-form.input name="name" label="Full Name" value="{{ $user->name }}" readonly />
            <x-form.input name="email" label="Email Address" value="{{ $user->email }}" readonly />
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <x-form.input name="phone" label="Phone Number" value="{{ $user->phone_number }}" readonly />
            <x-form.input name="address" label="Address" value="{{ $user->address }}" readonly />
        </div>

        <div class="mt-6">
            <x-form.select name="role" label="Role" disabled class="p-2">
                <option value="{{ $user->role_id }}">{{ ucfirst($user->role->name) }}</option>
            </x-form.select>
        </div>

        <div class="mt-6">
            <x-form.select name="status" label="Status" disabled class="p-2">
                <option value="{{ $user->status }}" selected>{{ ucfirst($user->status) }}</option>
            </x-form.select>
        </div>

        <div class="mt-6">
            <a href="{{ route('users.index') }}" class="btn btn-secondary bg-gray-600 text-white px-4 py-2 rounded">
                Back to User List
            </a>
        </div>
</x-layout>
