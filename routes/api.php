<?php

use App\Http\Controllers\api\AuthController;
use App\Http\Controllers\api\CategoryController;
use App\Http\Controllers\api\ProductController;
use App\Http\Controllers\api\RecipeController;
use App\Http\Controllers\api\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return response()->json(['message' => 'Ciob API v1']);
});

Route::post('/test', function (Request $request) {
    return response()->json(['status' => 'ok', 'data' => $request->all()]);
});

Route::post('/register', [AuthController::class, 'register'])->middleware('throttle:registration');
Route::post('/login', [AuthController::class, 'login'])->middleware('throttle:login');

Route::middleware(['auth:sanctum', 'throttle:api'])->group(function () {
    Route::get('/me', [AuthController::class, 'me']);
    Route::post('/logout', [AuthController::class, 'logout']);

    Route::post('/upload', 'App\Http\Controllers\api\UploadController@upload');
    Route::post('/upload-multiple', 'App\Http\Controllers\api\UploadController@uploadMultiple');

    Route::middleware('is_admin')->group(function () {
        Route::apiResource('users', UserController::class);
    });
});
// public Product routes
Route::get('/products', [ProductController::class, 'index']);
Route::get('/products/{product}', [ProductController::class, 'show']);

// Admin routes for managing products
Route::middleware(['auth:sanctum', 'is_admin'])->group(function () {
    Route::apiResource('products', ProductController::class)
        ->except(['index', 'show']);
});

// public route for category
Route::apiResource('categories', CategoryController::class)
    ->only(['index', 'show']);

// Admin routes for managing categories
Route::middleware(['auth:sanctum', 'is_admin'])->group(function () {
    Route::apiResource('categories', CategoryController::class)
        ->only(['store', 'update', 'destroy']);
});

// public route for recettes
Route::apiResource('recipes', RecipeController::class)
    ->only(['index', 'show']);

// Admin routes for managing recettes
Route::middleware(['auth:sanctum', 'is_admin'])->group(function () {
    Route::apiResource('recipes', RecipeController::class)
        ->only(['store', 'update', 'destroy']);
});
