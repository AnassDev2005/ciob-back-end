<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class UploadController extends Controller
{
    private function generateFilename(string $extension): string
    {
        return bin2hex(random_bytes(16)).'.'.$extension;
    }

    public function upload(Request $request): JsonResponse
    {
        $request->validate([
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
        ]);

        $file = $request->file('image');
        $filename = $this->generateFilename($file->getClientOriginalExtension());
        $path = $file->storeAs('images', $filename, 'public');

        return response()->json([
            'url' => asset(Storage::url($path)),
            'path' => $path,
        ], 201);
    }

    public function uploadMultiple(Request $request): JsonResponse
    {
        $request->validate([
            'images' => 'required|array|max:10',
            'images.*' => 'image|mimes:jpeg,png,jpg,gif,webp|max:2048',
        ]);

        $urls = collect($request->file('images'))->map(function ($image) {
            $filename = $this->generateFilename($image->getClientOriginalExtension());
            $path = $image->storeAs('images', $filename, 'public');

            return [
                'url' => asset(Storage::url($path)),
                'path' => $path,
            ];
        });

        return response()->json([
            'urls' => $urls,
        ], 201);
    }
}
