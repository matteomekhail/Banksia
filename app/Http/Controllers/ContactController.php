<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Resend\Laravel\Facades\Resend;
use Inertia\Inertia;

class ContactController extends Controller
{
    public function sendEmail(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|min:2',
            'email' => 'required|email',
            'message' => 'required|string|min:10',
        ]);

        if ($validator->fails()) {
            return Inertia::render('Contact', [
                'errors' => $validator->errors(),
            ])->toResponse($request)->setStatusCode(422);
        }

        try {
            Resend::emails()->send([
                'from' => 'Banksia Oran Park <noreply@banksiaoranpark.com.au>',
                'to' => 'info@banksiaoranpark.com.au',
                'subject' => 'New Contact Form Submission',
                'html' => view('emails.contact', [
                    'name' => $request->name,
                    'email' => $request->email,
                    'message' => $request->message,
                ])->render(),
            ]);

            return Inertia::render('Contact', [
                'message' => 'Email sent successfully',
            ]);
        } catch (\Exception $e) {
            return Inertia::render('Contact', [
                'error' => 'Failed to send email',
            ])->toResponse($request)->setStatusCode(500);
        }
    }
}
