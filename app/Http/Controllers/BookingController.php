<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use App\Mail\BookingConfirmationUser;
use App\Mail\BookingConfirmationAdmin;
use App\Mail\BookingConfirmed;
use App\Mail\BookingCancelled;
use Carbon\Carbon;

class BookingController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'date' => 'required|date|after_or_equal:today',
            'time' => 'required|string',
            'guests' => 'required|integer|min:1|max:5',
            'special_requests' => 'nullable|string|max:1000'
        ]);

        // Controlla disponibilità - calcola il totale di ospiti per questo slot orario
        $existingBookingsTotal = Booking::forDate($request->date)
            ->forTime($request->time)
            ->whereIn('status', ['pending', 'confirmed'])
            ->sum('guests');

        $totalGuestsAfterBooking = $existingBookingsTotal + $request->guests;

        if ($totalGuestsAfterBooking > 5) {
            $availableSpots = 5 - $existingBookingsTotal;
            return redirect()->back()
                ->with('error', "This time slot can only accommodate {$availableSpots} more guests. Please choose another time or reduce the number of guests.");
        }

        // Crea il booking
        $booking = Booking::create([
            'name' => $request->name,
            'email' => $request->email,
            'date' => $request->date,
            'time' => $request->time,
            'guests' => $request->guests,
            'special_requests' => $request->special_requests,
            'status' => 'pending'
        ]);

        // Invia email di conferma
        try {
            Mail::to($request->email)->send(new BookingConfirmationUser($booking));
            Mail::to('info@banksiaoranpark.com.au')->send(new BookingConfirmationAdmin($booking));
        } catch (\Exception $e) {
            \Log::error('Failed to send booking confirmation emails: ' . $e->getMessage());
        }

        return redirect()->back()
            ->with('success', 'Your booking has been submitted successfully! You will receive a confirmation email shortly.');
    }

    public function checkAvailability(Request $request)
    {
        $request->validate([
            'date' => 'required|date',
            'time' => 'required|string',
            'guests' => 'required|integer|min:1|max:5'
        ]);

        // Calcola il totale di ospiti già prenotati per questo slot
        $existingBookingsTotal = Booking::forDate($request->date)
            ->forTime($request->time)
            ->whereIn('status', ['pending', 'confirmed'])
            ->sum('guests');

        $totalGuestsAfterBooking = $existingBookingsTotal + $request->guests;
        $availableSpots = 5 - $existingBookingsTotal;

        return response()->json([
            'available' => $totalGuestsAfterBooking <= 5,
            'existingGuests' => $existingBookingsTotal,
            'availableSpots' => $availableSpots,
            'requestedGuests' => $request->guests
        ]);
    }

    public function index()
    {
        $bookings = Booking::with([])
            ->orderBy('date', 'asc')
            ->orderBy('time', 'asc')
            ->get()
            ->map(function ($booking) {
                // Convert the date to only the date part (without time) for proper matching
                $dateOnly = \Carbon\Carbon::parse($booking->date)->format('Y-m-d');
                $booking->date = $dateOnly;
                $booking->formatted_date = \Carbon\Carbon::parse($dateOnly)->format('d/m/Y');
                return $booking;
            });

        // Convert to pagination-like structure for compatibility
        $paginatedBookings = [
            'data' => $bookings,
            'current_page' => 1,
            'last_page' => 1,
            'per_page' => $bookings->count(),
            'total' => $bookings->count(),
            'from' => 1,
            'to' => $bookings->count()
        ];

        return inertia('Admin/Bookings/Index', [
            'bookings' => $paginatedBookings
        ]);
    }

    public function show(Booking $booking)
    {
        return inertia('Admin/Bookings/Show', [
            'booking' => $booking
        ]);
    }

    public function confirm(Booking $booking)
    {
        $booking->confirm();

        // Send confirmation email to the user
        try {
            Mail::to($booking->email)->send(new BookingConfirmed($booking));
        } catch (\Exception $e) {
            \Log::error('Failed to send booking confirmation email: ' . $e->getMessage());
        }

        return redirect()->back()
            ->with('success', 'Booking confirmed successfully and confirmation email sent to customer.');
    }

    public function cancel(Booking $booking)
    {
        // Store booking data before cancelling (in case we need it for email)
        $bookingData = $booking->replicate();

        $booking->cancel();

        // Send cancellation email to the user
        try {
            Mail::to($booking->email)->send(new BookingCancelled($bookingData, 'Your booking has been cancelled by our restaurant staff.'));
        } catch (\Exception $e) {
            \Log::error('Failed to send booking cancellation email: ' . $e->getMessage());
        }

        return redirect()->back()
            ->with('success', 'Booking cancelled successfully and cancellation email sent to customer.');
    }

    public function destroy(Booking $booking)
    {
        // Store booking data before deleting (we need it for email)
        $bookingData = $booking->replicate();

        // Send cancellation email to the user before deleting
        try {
            Mail::to($booking->email)->send(new BookingCancelled($bookingData, 'Your booking has been removed from our system by our restaurant staff.'));
        } catch (\Exception $e) {
            \Log::error('Failed to send booking deletion email: ' . $e->getMessage());
        }

        $booking->delete();

        return redirect()->route('admin.bookings.index')
            ->with('success', 'Booking deleted successfully and notification email sent to customer.');
    }
}
