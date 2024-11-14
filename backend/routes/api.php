<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\Customer\ProductController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

// Route::get('customer/products', [ProductController::class, 'index']);

Route::prefix('customer')->group(function () {
    Route::get('products', [ProductController::class, 'index']);
    Route::get('products/{productId}/reviews', [ProductController::class, 'getReviews']);

    // حماية إضافة التقييمات بMiddleware للتحقق من الدور
    Route::post('products/{productId}/reviews', [ProductController::class, 'addReview'])->middleware('checkRole:customer');
});

