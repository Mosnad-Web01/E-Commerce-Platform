<x-layout>
    <x-slot name="title">
        Add New User
    </x-slot>

    <x-panel>
        <x-form.form action="{{ route('users.store') }}">
           
            <div>
                <x-heading>Add New User</x-heading>
            </div>
            <hr />
            <!-- Basic User Information -->
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <!-- Name -->
                <x-form.input name="name" label="Full Name" placeholder="Enter full name" required />

                <!-- Email -->
                <x-form.input type="email" name="email" label="Email Address" placeholder="Enter email address" required />
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <!-- Password -->
                <x-form.input type="password" name="password" label="Password" placeholder="Enter password" required />

                <!-- Password Confirmation -->
                <x-form.input type="password" name="password_confirmation" label="Confirm Password" 
                    placeholder="Confirm password" required />
            </div>

           

            <!-- Contact Information -->
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <!-- Phone -->
            </div>

            <!-- Submit Button -->
            <div class="flex justify-end mt-6">
                <button type="submit">Create User</button>
            </div>
        </x-form.form>
    </x-panel>
</x-layout>

