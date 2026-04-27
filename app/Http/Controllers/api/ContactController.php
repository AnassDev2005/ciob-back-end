<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\Message;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;

class ContactController extends Controller
{
    /**
     * Handle the contact form submission.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'subject' => 'required|string|max:255',
            'message' => 'required|string|min:10',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation error',
                'errors' => $validator->errors()
            ], 422);
        }

        // Save to database
        $message = Message::create($request->all());

        Log::info('New Contact Form Submission Saved:', ['id' => $message->id]);

        return response()->json([
            'status' => 'success',
            'message' => 'Your message has been sent successfully. We will get back to you soon.'
        ], 201);
    }
}
