<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;

Route::get('profile', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


Route::middleware(['auth:api'])->group(function () {
    Route::get('profile', [AuthController::class, 'profile']);

    Route::middleware('role:admin')->group(function () {
        Route::get('admin/dashboard', [AdminController::class, 'dashboard']);
    });

    Route::middleware('role:vendor')->group(function () {
        Route::get('vendor/dashboard', [VendorController::class, 'dashboard']);
    });

    Route::middleware('role:customer')->group(function () {
        Route::get('customer/dashboard', [CustomerController::class, 'dashboard']);
    });
});
