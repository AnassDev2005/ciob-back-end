<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Traits\HandlesImageUpload;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    use HandlesImageUpload;

    public function index(): JsonResponse
    {
        return response()->json(Product::with('category')->get());
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'features' => 'nullable|array',
            'specifications' => 'nullable|array',
            'usage' => 'nullable|string',
            'badge' => 'nullable|string|max:255',
            'diameter' => 'nullable|string|max:255',
            'characteristics' => 'nullable|array',
            'category_id' => 'required|integer|exists:categories,id',
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

        $product = Product::create($validated);

        return response()->json($product->load('category'), 201);
    }

    public function show(Product $product): JsonResponse
    {
        return response()->json($product);
    }

    public function update(Request $request, Product $product): JsonResponse
    {
        $validated = $request->validate([
            'name' => 'sometimes|string|max:255',
            'description' => 'nullable|string',
            'features' => 'nullable|array',
            'specifications' => 'nullable|array',
            'usage' => 'nullable|string',
            'badge' => 'nullable|string|max:255',
            'diameter' => 'nullable|string|max:255',
            'characteristics' => 'nullable|array',
            'category_id' => 'sometimes|integer|exists:categories,id',
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

        $product->update($validated);

        return response()->json($product->load('category'));
    }

    public function destroy(Product $product): JsonResponse
    {
        $product->delete();

        return response()->json(['message' => 'Product deleted']);
    }
}
