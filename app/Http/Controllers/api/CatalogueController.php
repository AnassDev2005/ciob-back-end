<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\Catalogue;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class CatalogueController extends Controller
{
    public function index()
    {
        return Catalogue::all();
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string',
            'file' => 'required|file|mimes:pdf|max:10240', // max 10MB
        ]);

        $path = $request->file('file')->store('catalogues', 'public');

        return Catalogue::create([
            'title' => $request->title,
            'file_path' => Storage::url($path),
        ]);
    }

    public function update(Request $request, Catalogue $catalogue)
    {
        $request->validate([
            'title' => 'string',
            'is_active' => 'boolean',
        ]);

        $catalogue->update($request->all());
        return $catalogue;
    }

    public function destroy(Catalogue $catalogue)
    {
        // Optionally delete file from storage
        // Storage::disk('public')->delete(str_replace('/storage/', '', $catalogue->file_path));
        
        $catalogue->delete();
        return response()->json(['message' => 'Deleted successfully']);
    }
}
