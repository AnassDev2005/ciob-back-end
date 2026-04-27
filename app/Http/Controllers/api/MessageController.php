<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\Message;
use Illuminate\Http\Request;

class MessageController extends Controller
{
    public function index()
    {
        return Message::latest()->get();
    }

    public function show(Message $message)
    {
        return $message;
    }

    public function update(Request $request, Message $message)
    {
        $message->update($request->only('is_read'));
        return $message;
    }

    public function destroy(Message $message)
    {
        $message->delete();
        return response()->json(['message' => 'Deleted successfully']);
    }
}
