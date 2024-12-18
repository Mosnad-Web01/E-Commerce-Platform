<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Role;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function index()
    {
        $users = User::with('role')->orderBy('id', 'desc')->paginate(10);

        // Log the route for editing users
        $roles = Role::all(); // Optionally filter active roles here
        return view('dashboard.users.index', compact('users', 'roles'));
    }



    public function create()

    {

        $roles = Role::all(); // Fetch roles from the database
        return view('dashboard.users.create', compact('roles'));
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => [
                'required',
                'string',
                'confirmed',
                // 'min:8',
                // 'regex:/[A-Z]/',
                // 'regex:/[a-z]/',
                // 'regex:/[0-9]/',
                // 'regex:/[@$!%*?&]/',
            ],
            'phone' => 'nullable|string|max:20',
            'address' => 'nullable|string|max:500',
            'role_id' => 'required|exists:roles,id', // Validate against roles table
            'status' => 'nullable|in:active,inactive', //'status' => 'required|in:active,inactive',
            'password.required' => 'The password field is required.',
            'password.string' => 'The password must be a string.',
            'password.confirmed' => 'The password confirmation does not match.',
            'password.min' => 'The password must be at least 8 characters long.',
            'password.regex:/[A-Z]/' => 'The password must contain at least one uppercase letter.',
            'password.regex:/[a-z]/' => 'The password must contain at least one lowercase letter.',
            'password.regex:/[0-9]/' => 'The password must contain at least one number.',
            'password.regex:/[@$!%*?&]/' => 'The password must contain at least one special character such as @$!%*?&.',
        ]);

        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
            'phone_number' => $validated['phone'], // Matches 'phone' from validation
            'address' => $validated['address'],
            'role_id' => $validated['role_id'], // Set the selected role
            'status' => $validated['status'] ?? 'active', // Default status
        ]);

        return redirect()
            ->route('users.index')
            ->with('success', 'User created successfully');
    }


    public function show(User $user)
    {
        return view('dashboard.users.show', compact('user'));
    }

    public function edit(User $user)
    {
        // Fetch all roles
        $roles = Role::all();

        // If no user is found, redirect with error
        if (!$user) {
            return redirect()->route('users.index')->with('error', 'User not found.');
        }

        // Pass the user and roles to the edit view
        return view('dashboard.users.edit', compact('user', 'roles'));
    }

    public function update(Request $request, User $user)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email,' . $user->id,
            'password' => 'nullable|confirmed', // |min:8 Only validate if password is provided
            'role_id' => 'required|exists:roles,id',
            'status' => 'required|in:active,inactive',
        ]);

        // Update the user
        $user->name = $request->name;
        $user->email = $request->email;

        if ($request->filled('password')) {
            $user->password = Hash::make($request->password);
        }

        $user->role_id = $request->role_id;
        $user->status = $request->status;

        $user->save();

        return redirect()->route('users.index')->with('success', 'User updated successfully');
    }

    public function destroy(User $user)
    {
        // Check if the user exists
        if (!$user) {
            return redirect()->route('users.index')->with('error', 'User not found.');
        }

        // Delete the user
        $user->delete();

        // Redirect with success message
        return redirect()->route('users.index')->with('success', 'User deleted successfully');
    }
}
