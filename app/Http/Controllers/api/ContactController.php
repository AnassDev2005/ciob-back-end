<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
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

        // Log the message (can be extended to send emails or save to database)
        Log::info('New Contact Form Submission:', $request->all());

        // In a real application, you might want to send an email here:
        // Mail::to('admin@ciob-store.ma')->send(new ContactMail($request->all()));

        return response()->json([
            'status' => 'success',
            'message' => 'Your message has been sent successfully. We will get back to you soon.'
        ], 201);
    }
}
