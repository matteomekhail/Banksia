<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\EmailController;

Route::get('/', function () {
    return Inertia::render('Welcome');
});

Route::get('/contact', function () {
    return Inertia::render('ContactUs');
});

Route::get('/menu', function () {
    return Inertia::render('Menu');
});

Route::post('/send-email', [EmailController::class, 'sendEmail']);


require __DIR__.'/auth.php';
