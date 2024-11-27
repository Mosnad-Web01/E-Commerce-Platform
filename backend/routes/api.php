<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use App\Http\Controllers\api\AuthController;
use App\Http\Controllers\Api\Customer\OrderController;

// public routes ---
Route::get('/test', function () {
    return " Un-Protected Route ((Test page))";
})->withoutMiddleware('auth:sanctum');


// auth routes
Route::prefix('auth')->controller(AuthController::class)->group(function () {

    // Endpoint: /api/auth/register
    Route::post('/register', 'register');

    // Endpoint: /api/auth/login
    Route::post('/login', 'login')->name('login');
});

// prrotected Routes (Require Authentication)

Route::middleware('auth:sanctum')->group(function () {

    // Endpoint: /api/logout
    Route::post('/logout', [AuthController::class, 'logout']);

    //admin Routes
    Route::middleware('role:admin')->group(function () {

        //Endpoint: /api/admin
        Route::get('/admin', function () {
            return "Hello Admin";
        });

        // list other admin routes here :


    });

    //vendor Routes
    Route::middleware('role:vendor')->group(function () {

        //Endpoint: /api/vendor
        Route::get('/vendor', function () {
            return "Hello Vendor";
        });

        // list other vendor routes here:


    });

    Route::middleware('role:customer')->group(function () {

        //Endpoint: /api/customer
        Route::get('/customer', function () {
            return "Hello Customer";
        });

        //customer routes :
        Route::prefix('orders')->group(function () {
            Route::get('/', [OrderController::class, 'index']); // List all orders
            Route::get('/{id}', [OrderController::class, 'show']); // View a specific order
            Route::post('/', [OrderController::class, 'store']); // Place a new order
            Route::put('/{id}', [OrderController::class, 'update']); // Update order status
        });
    });
});
