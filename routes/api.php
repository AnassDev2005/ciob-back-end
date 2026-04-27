<?php

use App\Http\Controllers\api\AdminDashboardController;
use App\Http\Controllers\api\AuthController;
use App\Http\Controllers\api\CatalogueController;
use App\Http\Controllers\api\CategoryController;
use App\Http\Controllers\api\ContactController;
use App\Http\Controllers\api\MessageController;
use App\Http\Controllers\api\ProductController;
use App\Http\Controllers\api\RecipeController;
use App\Http\Controllers\api\UploadController;
use App\Http\Controllers\api\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return response()->json(['message' => 'Ciob API v1']);
});

Route::post('/register', [AuthController::class, 'register'])->middleware('throttle:registration');
Route::post('/login', [AuthController::class, 'login'])->middleware('throttle:login');
Route::post('/contact', [ContactController::class, 'store'])->middleware('throttle:api');

Route::middleware(['auth:sanctum', 'throttle:api'])->group(function () {
    Route::get('/me', [AuthController::class, 'me']);
    Route::post('/logout', [AuthController::class, 'logout']);

    Route::post('/upload', [UploadController::class, 'upload']);
    Route::post('/upload-multiple', [UploadController::class, 'uploadMultiple']);

    // Admin-only routes
    Route::middleware('is_admin')->prefix('admin')->group(function () {
        Route::get('/stats', [AdminDashboardController::class, 'stats']);
        
        Route::apiResource('users', UserController::class);
        Route::apiResource('messages', MessageController::class)->except(['store']);
        Route::apiResource('catalogues', CatalogueController::class);
        
        // CRUD for products, categories, recipes for admin
        Route::apiResource('products', ProductController::class)->except(['index', 'show']);
        Route::apiResource('categories', CategoryController::class)->except(['index', 'show']);
        Route::apiResource('recipes', RecipeController::class)->except(['index', 'show']);
    });
});

// public Product routes
Route::get('/products', [ProductController::class, 'index']);
Route::get('/products/{product}', [ProductController::class, 'show']);

// public route for category
Route::get('/categories', [CategoryController::class, 'index']);
Route::get('/categories/{category}', [CategoryController::class, 'show']);

// public route for recettes
Route::get('/recipes', [RecipeController::class, 'index']);
Route::get('/recipes/{recipe}', [RecipeController::class, 'show']);

// public route for catalogue
Route::get('/catalogues', [CatalogueController::class, 'index']);
