<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Vendor\ProductController;


Route::get('/', function () {
    return view('welcome');
});

Route::controller(ProductController::class)->prefix('vendor')->group(function () {
    Route::get('/products', 'index');
    Route::get('/product/{id}', 'show');
    Route::get('/create', 'create');
    Route::post('/store', 'store');
    Route::put('/product/{id}', 'update');
    Route::delete('product/{id}', 'destroy');
});