<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class UploadController extends Controller
{
    public function upload(Request $request): JsonResponse
    {
        $request->validate([
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
        ]);

        $path = $request->file('image')->store('images', 'public');
        $url = Storage::url($path);

        return response()->json([
            'url' => asset($url),
            'path' => $path,
        ], 201);
    }

    public function uploadMultiple(Request $request): JsonResponse
    {
        $request->validate([
            'images' => 'required|array',
            'images.*' => 'image|mimes:jpeg,png,jpg,gif,webp|max:2048',
        ]);

        $urls = [];
        foreach ($request->file('images') as $image) {
            $path = $image->store('images', 'public');
            $urls[] = [
                'url' => asset(Storage::url($path)),
                'path' => $path,
            ];
        }

        return response()->json([
            'urls' => $urls,
        ], 201);
    }
}
