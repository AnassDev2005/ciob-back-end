<?php

use App\Http\Controllers\api\CategoryController;
use App\Http\Controllers\api\ProductController;
use App\Http\Controllers\api\RecipeController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return response()->json(['message' => 'Ciob API v1']);
});
// public Product routes
Route::get('/products', [ProductController::class, 'index']);
Route::get('/products/{id}', [ProductController::class, 'show']);

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
