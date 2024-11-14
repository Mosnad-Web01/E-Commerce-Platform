<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\Customer\ProductController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');



Route::prefix('customer')->group(function () {
    // show all products
    Route::get('products', [ProductController::class, 'index']);
    // show single product details
    Route::get('products/{productId}', [ProductController::class, 'show']);

    // show all reviews
    Route::get('products/{productId}/reviews', [ProductController::class, 'getReviews']);
    // add review
    Route::post('products/{productId}/reviews', [ProductController::class, 'addReview'])->middleware('checkRole:customer');

});
// update review status for admin
Route::put('reviews/{reviewId}/status', [ProductController::class, 'updateReviewStatus'])
    ->middleware(['auth:sanctum', 'checkRole:1']);




