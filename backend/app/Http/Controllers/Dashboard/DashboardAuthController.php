<?php

namespace App\Http\Controllers\dashboard;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Facades\Validator;

class DashboardAuthController extends Controller
{
    // Show the login form
    public function showLogin()
    {
        return view('auth.login');
    }

    // Handle login attempt
    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required'],
        ]);

        if (Auth::attempt($credentials)) {
            $request->session()->regenerate();
            return redirect()->intended('/');
        }

        return back()->withErrors([
            'email' => 'The provided credentials do not match our records.',
        ]);
    }

    // Show the registration form
    public function showRegister()
    {
        return view('auth.register');
    }

    // Handle user registration
    public function register(Request $request)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'password' => [
                'required',
                'string',
                'confirmed',
                'min:8',
                'regex:/[A-Z]/',
                'regex:/[a-z]/',
                'regex:/[0-9]/',
                'regex:/[@$!%*?&]/',
            ],
            'role_id' => ['integer', 'exists:roles,id'],
        ]);

        $role_id = $validated['role_id'] ?? 1;

        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
            'role_id' => $role_id,
        ]);

        Auth::login($user);

        return redirect('/');
    }

    // Handle user logout
    public function logout(Request $request)
    {
        if ($request->isMethod('post')) {
            Auth::logout();
            $request->session()->invalidate();
            $request->session()->regenerateToken();
            return redirect('/login');
        }

        abort(405);
    }

    // Show the Forgot Password form
    public function showForgotPasswordForm()
    {
        return view('auth.forgot-password');
    }

    // Handle sending password reset link email
    public function sendResetLinkEmail(Request $request)
    {
        $validated = $request->validate([
            'email' => ['required', 'email'],
        ]);

        $response = Password::sendResetLink($validated);

        if ($response == Password::RESET_LINK_SENT) {
            return back()->with('status', 'We have emailed your password reset link!');
        }

        return back()->withErrors(['email' => 'We could not find a user with that email address.']);
    }

    // Show the Reset Password form
    public function showResetPasswordForm($token)
    {
        return view('auth.reset-password', ['token' => $token]);
    }

    // Handle resetting the password
    public function resetPassword(Request $request)
    {
        $validated = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required', 'confirmed', 'min:8'],
            'token' => ['required'],
        ]);

        $response = Password::reset($validated, function ($user, $password) {
            $user->password = Hash::make($password);
            $user->save();
        });

        if ($response == Password::PASSWORD_RESET) {
            return redirect()->route('login')->with('status', 'Your password has been reset!');
        }

        return back()->withErrors(['email' => 'The provided token is invalid.']);
    }
}
