<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\api\AuthController;
use App\Http\Controllers\Api\Customer\ReviewController;
use App\Http\Controllers\Api\Customer\ProductController;



// public routes ---
Route::get('/test', function () {
    return " Un-Protected Route ((Test page))";
})->withoutMiddleware('auth:sanctum');


// auth routes
Route::prefix('auth')->group(function () {

    // Endpoint: /api/auth/register
    Route::post('/register', [AuthController::class, 'register']);

    // Endpoint: /api/auth/login
    Route::post('/login', [AuthController::class, 'login'])->name('login');
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

        Route::prefix('admin')->group(function () {
        // update review status for admin
        Route::put('reviews/{reviewId}/status', [ReviewController::class, 'updateReviewStatus']);

        // list other admin routes here :

        });


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

        Route::prefix('customer')->group(function () {
            // show all products
            Route::get('products', [ProductController::class, 'index']);

            // show single product details
            Route::get('products/{productId}', [ProductController::class, 'show']);


            // show all reviews
            Route::get('products/{productId}/reviews', [ReviewController::class, 'getReviews']);

            // add review
            Route::post('products/{productId}/reviews', [ReviewController::class, 'addReview']);

            // delete review
            Route::delete('reviews/{reviewId}', [ReviewController::class, 'deleteReview']);



            // list other customer routes here:
        });
    });
});
