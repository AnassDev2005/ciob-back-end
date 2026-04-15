<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\Recipe;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class RecipeController extends Controller
{
    public function index(): JsonResponse
    {
        return response()->json(Recipe::all());
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'steps' => 'required|array',
            'image' => 'nullable|string',
            'product_id' => 'nullable|integer|exists:products,id',
            'preparation_time' => 'nullable|integer',
            'cooking_time' => 'nullable|integer',
        ]);

        $recipe = Recipe::create($validated);

        return response()->json($recipe, 201);
    }

    public function show(Recipe $recipe): JsonResponse
    {
        return response()->json($recipe);
    }

    public function update(Request $request, Recipe $recipe): JsonResponse
    {
        $validated = $request->validate([
            'title' => 'sometimes|string|max:255',
            'description' => 'sometimes|string',
            'steps' => 'sometimes|array',
            'image' => 'nullable|string',
            'product_id' => 'nullable|integer|exists:products,id',
            'preparation_time' => 'nullable|integer',
            'cooking_time' => 'nullable|integer',
        ]);

        $recipe->update($validated);

        return response()->json($recipe);
    }

    public function destroy(Recipe $recipe): JsonResponse
    {
        $recipe->delete();

        return response()->json(['message' => 'Recipe deleted']);
    }
}
