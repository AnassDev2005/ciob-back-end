<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Traits\HandlesImageUpload;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class UploadController extends Controller
{
    use HandlesImageUpload;

    public function upload(Request $request): JsonResponse
    {
        $request->validate([
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
        ]);

        $result = $this->storeImageWithPath($request);

        return response()->json($result, 201);
    }

    public function uploadMultiple(Request $request): JsonResponse
    {
        $request->validate([
            'images' => 'required|array|max:10',
            'images.*' => 'image|mimes:jpeg,png,jpg,gif,webp|max:2048',
        ]);

        $urls = collect($request->file('images'))->map(function ($image) {
            return $this->storeUploadedFile($image);
        });

        return response()->json([
            'urls' => $urls,
        ], 201);
    }
}
