<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Resend\Laravel\Facades\Resend;

class EmailController extends Controller
{
    public function sendEmail(Request $request)
    {
        $name = $request->input('name');
        $email = $request->input('email');
        $company = $request->input('company');
        $project = $request->input('project');

        Resend::emails()->send([
            'from' => 'Acme <onboarding@resend.dev>',
            'to' => ['matteomekhail04@gmail.com'], // invia sempre all'indirizzo email del tuo account
            'subject' => 'Quote Request from ' . $name,
            'html' => '<p>Name: ' . $name . '</p>' .
                '<p>Email: ' . $email . '</p>' .
                '<p>Compayn: ' . $company . '</p>' .
                '<p>Descrizione del progetto: ' . $project . '</p>'
        ]);

        return redirect('/');
    }
}
