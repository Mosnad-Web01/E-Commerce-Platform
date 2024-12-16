<x-layout>
    <x-slot name="title">
        Edit User
    </x-slot>

    <x-panel>
        <x-form.form action="{{ route('users.update', $user) }}" method="POST">
            @method('PUT')
            @csrf
           
            <div>
                <x-heading>Edit User: {{ $user->name }}</x-heading>
            </div>
            <hr />

            <!-- User Details -->
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <!-- Name -->
                <x-form.input name="name" label="Full Name" placeholder="Enter full name" 
                    value="{{ old('name', $user->name) }}" required />

                <!-- Email -->
                <x-form.input type="email" name="email" label="Email Address" 
                    placeholder="Enter email address" 
                    value="{{ old('email', $user->email) }}" required />
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <!-- Password -->
                <x-form.input type="password" name="password" label="New Password" 
                    placeholder="Enter new password if changing" />

                <!-- Password Confirmation -->
                <x-form.input type="password" name="password_confirmation" 
                    label="Confirm New Password" 
                    placeholder="Confirm new password if changing" />
            </div>
            
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
                <!-- Phone Number -->
                <x-form.input name="phone" label="Phone Number" placeholder="Enter phone number" 
                    value="{{ old('phone', $user->phone) }}" />

                <!-- Address -->
                <x-form.input name="address" label="Address" placeholder="Enter address" 
                    value="{{ old('address', $user->address) }}" />
            </div>

            <!-- Role and Status -->
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <!-- Role -->
                <x-form.select name="role_id" label="Role" required class="p-2">
                    @foreach($roles as $role)
                        <option value="{{ $role->id }}" {{ $user->role_id == $role->id ? 'selected' : '' }}>
                            {{ $role->name }}
                        </option>
                    @endforeach
                </x-form.select>

                <!-- Status -->
                <x-form.select name="status" label="Status" required class="p-2">
                    <option value="active" {{ $user->status == 'active' ? 'selected' : '' }}>Active</option>
                    <option value="inactive" {{ $user->status == 'inactive' ? 'selected' : '' }}>Inactive</option>
                </x-form.select>
            </div>

            <!-- Submit Button -->
            <div class="flex justify-end mt-6">
                <button class="btn btn-primary mt-6 rounded bg-blue-600 text-white w-25 p-2">Update User</button>
            </div>
        </x-form.form>
    </x-panel>
</x-layout>
