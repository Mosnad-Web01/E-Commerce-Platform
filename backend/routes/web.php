<?php

use Illuminate\Support\Facades\Route;
use App\Models\Product;
use App\Models\Category;
use App\Models\User;
use App\Http\Controllers\dashboard\DashboardAuthController;

// Authentication Routes
Route::middleware('guest')->group(function () {
    // Login Routes
    Route::get('/login', [DashboardAuthController::class, 'showLogin'])->name('login');
    Route::post('/login', [DashboardAuthController::class, 'login']);
    
    // Registration Routes
    Route::get('/register', [DashboardAuthController::class, 'showRegister'])->name('register');
    Route::post('/register', [DashboardAuthController::class, 'register']);
    
    // Password Reset Routes (to be implemented)
    Route::get('/forgot-password', [DashboardAuthController::class, 'showForgotPassword'])->name('password.request');
    Route::post('/forgot-password', [DashboardAuthController::class, 'sendResetLink'])->name('password.email');
    Route::get('/reset-password/{token}', [DashboardAuthController::class, 'showResetPassword'])->name('password.reset');
    Route::post('/reset-password', [DashboardAuthController::class, 'resetPassword'])->name('password.update');
});

// Authentication Required Routes
Route::middleware('auth')->group(function () {
    // Logout Route
    Route::post('/logout', [DashboardAuthController::class, 'logout'])->name('logout');
    
    // User Profile Route
    Route::get('/user/profile', [DashboardAuthController::class, 'user'])->name('user.profile');
    
    // Dashboard Home
    Route::get('/', function () {
        return view('dashboard.home');
    })->name('home');

    // Products Routes
    Route::prefix('products')->group(function () {
        Route::get('/', function () {
            $products = Product::paginate(10);
            return view('dashboard.products.index', compact('products'));
        })->name('products.index');

        Route::get('/create', function () {
            $categories = Category::orderBy('name')->get();
            return view('dashboard.products.create', compact('categories'));
        })->name('products.create');

        Route::get('/{product}', function (Product $product) {
            return view('dashboard.products.show', compact('product'));
        })->name('products.show');

        Route::post('/', function () {
            return redirect()->route('products.index');
        })->name('products.store');

        Route::get('/{product}/edit', function (Product $product) {
            return view('dashboard.products.create', compact('product'));
        })->name('products.edit');

        Route::delete('/{product}', function (Product $product) {
            return redirect()->route('products.index');
        })->name('products.destroy');
    });

    // Users Routes
    Route::prefix('users')->group(function () {
        Route::get('/', function () {
            $users = User::with('role')->orderBy('name')->paginate(10);
            return view('dashboard.users.index', compact('users'));
        })->name('users.index');
    });

    // Categories Routes
    Route::prefix('categories')->group(function () {
        Route::get('/', function () {
            return "Manage Categories";
        })->name('categories.index');
    });

    // Orders Route
    Route::get('/orders', function () {
        return "Manage Orders"; // Replace with view('orders.index') when implemented
    })->name('orders.index');

    // Vendors Route
    Route::get('/vendors', function () {
        return "Manage Vendors"; // Replace with view('vendors.index') when implemented
    })->name('vendors.index');

    // Analytics Route
    Route::get('/analytics', function () {
        return "View Analytics"; // Replace with view('analytics.index') when implemented
    })->name('analytics.index');

    // Settings Route
    Route::get('/settings', function () {
        return "Settings"; // Replace with view('settings.index') when implemented
    })->name('settings');
});
