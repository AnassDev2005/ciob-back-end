<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\Recipe;
use App\Traits\HandlesImageUpload;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class RecipeController extends Controller
{
    use HandlesImageUpload;

    public function index(): JsonResponse
    {
        return response()->json(Recipe::with(['product', 'category'])->get());
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'steps' => 'required|array',
            'ingredients' => 'nullable|array',
            'product_id' => 'nullable|integer|exists:products,id',
            'category_id' => 'nullable|integer|exists:categories,id',
            'preparation_time' => 'nullable|integer',
            'cooking_time' => 'nullable|integer',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
            'images' => 'nullable|array',
            'images.*' => 'image|mimes:jpeg,png,jpg,gif,webp|max:2048',
        ]);

        if ($request->hasFile('images')) {
            $uploadedImages = [];
            foreach ($request->file('images') as $file) {
                $uploadedImages[] = $this->storeUploadedFile($file)['url'];
            }
            $validated['images'] = $uploadedImages;
            $validated['image'] = $uploadedImages[0];
        } elseif ($request->hasFile('image')) {
            $validated['image'] = $this->storeImage($request);
            $validated['images'] = [$validated['image']];
        }

        $recipe = Recipe::create($validated);

        return response()->json($recipe->load(['product', 'category']), 201);
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
            'ingredients' => 'nullable|array',
            'product_id' => 'nullable|integer|exists:products,id',
            'category_id' => 'nullable|integer|exists:categories,id',
            'preparation_time' => 'nullable|integer',
            'cooking_time' => 'nullable|integer',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
            'images' => 'nullable|array',
            'images.*' => 'image|mimes:jpeg,png,jpg,gif,webp|max:2048',
        ]);

        if ($request->hasFile('images')) {
            $uploadedImages = [];
            foreach ($request->file('images') as $file) {
                $uploadedImages[] = $this->storeUploadedFile($file)['url'];
            }
            $validated['images'] = $uploadedImages;
            $validated['image'] = $uploadedImages[0];
        } elseif ($request->hasFile('image')) {
            $validated['image'] = $this->storeImage($request);
            $validated['images'] = [$validated['image']];
        }

        $recipe->update($validated);

        return response()->json($recipe->load(['product', 'category']));
    }

    public function destroy(Recipe $recipe): JsonResponse
    {
        $recipe->delete();

        return response()->json(['message' => 'Recipe deleted']);
    }
}
