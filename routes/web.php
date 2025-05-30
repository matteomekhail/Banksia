<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\BookingController;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'instagramAccessToken' => env('INSTAGRAM_ACCESS_TOKEN'),
    ]);
});

Route::get('/contact', function () {
    return Inertia::render('ContactUs');
});

Route::get('/menu', function () {
    return Inertia::render('Menu');
});

Route::get('/book', function () {
    return Inertia::render('Book');
})->name('book');

// Login route
Route::get('/login', function () {
    return Inertia::render('Auth/Login');
})->name('login')->middleware('guest');

// Booking routes
Route::post('/book', [BookingController::class, 'store'])->name('bookings.store');
Route::post('/api/booking/check-availability', [BookingController::class, 'checkAvailability'])->name('bookings.check-availability');

// Admin routes
Route::prefix('admin')->middleware(['auth'])->group(function () {
    Route::get('/bookings', [BookingController::class, 'index'])->name('admin.bookings.index');
    Route::get('/bookings/{booking}', [BookingController::class, 'show'])->name('admin.bookings.show');
    Route::patch('/bookings/{booking}/confirm', [BookingController::class, 'confirm'])->name('admin.bookings.confirm');
    Route::patch('/bookings/{booking}/cancel', [BookingController::class, 'cancel'])->name('admin.bookings.cancel');
    Route::delete('/bookings/{booking}', [BookingController::class, 'destroy'])->name('admin.bookings.destroy');
});

// Redirect authenticated users to admin dashboard
Route::get('/dashboard', function () {
    return redirect('/admin/bookings');
})->middleware(['auth'])->name('dashboard');

require __DIR__.'/auth.php';
