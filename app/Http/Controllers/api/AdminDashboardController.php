<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\Catalogue;
use App\Models\Category;
use App\Models\Message;
use App\Models\Product;
use App\Models\Recipe;
use App\Models\User;
use Illuminate\Http\Request;

class AdminDashboardController extends Controller
{
    public function stats()
    {
        return response()->json([
            'products_count' => Product::count(),
            'categories_count' => Category::count(),
            'recipes_count' => Recipe::count(),
            'users_count' => User::count(),
            'messages_count' => Message::count(),
            'unread_messages_count' => Message::where('is_read', false)->count(),
            'catalogues_count' => Catalogue::count(),
        ]);
    }
}
