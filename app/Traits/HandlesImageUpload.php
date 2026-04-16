<?php

namespace App\Traits;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

trait HandlesImageUpload
{
    protected function generateFilename(string $extension): string
    {
        return bin2hex(random_bytes(16)).'.'.$extension;
    }

    protected function storeImage(Request $request, string $key = 'image'): ?string
    {
        if (! $request->hasFile($key)) {
            return null;
        }

        $file = $request->file($key);
        $filename = $this->generateFilename($file->getClientOriginalExtension());
        $path = $file->storeAs('images', $filename, 'public');

        return asset(Storage::url($path));
    }

    protected function storeImageWithPath(Request $request, string $key = 'image'): ?array
    {
        if (! $request->hasFile($key)) {
            return null;
        }

        $file = $request->file($key);
        $filename = $this->generateFilename($file->getClientOriginalExtension());
        $path = $file->storeAs('images', $filename, 'public');

        return [
            'url' => asset(Storage::url($path)),
            'path' => $path,
        ];
    }

    protected function storeUploadedFile(object $file): array
    {
        $filename = $this->generateFilename($file->getClientOriginalExtension());
        $path = $file->storeAs('images', $filename, 'public');

        return [
            'url' => asset(Storage::url($path)),
            'path' => $path,
        ];
    }
}
