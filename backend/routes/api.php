<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;

// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');


Route::controller(AuthController::class)->group(function() {
    Route::post('register', 'register');
    Route::post('login', 'login');

    Route::get('user', 'userProfile')->middleware('auth:sanctum', 'role');
    Route::get('logout', 'userLogout')->middleware('auth:sanctum', 'role');
});