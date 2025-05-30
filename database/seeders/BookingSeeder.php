<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Booking;
use Carbon\Carbon;

class BookingSeeder extends Seeder
{
    /**
     * Run the database seeder.
     */
    public function run(): void
    {
        $bookings = [
            [
                'name' => 'Mario Rossi',
                'email' => 'mario.rossi@email.com',
                'date' => Carbon::today()->addDays(1),
                'time' => '19:00',
                'guests' => 6,
                'special_requests' => 'Tavolo vicino alla finestra, per favore',
                'status' => 'pending',
            ],
            [
                'name' => 'Giulia Bianchi',
                'email' => 'giulia.bianchi@email.com',
                'date' => Carbon::today()->addDays(2),
                'time' => '20:00',
                'guests' => 8,
                'special_requests' => 'Anniversario di matrimonio - possibile decorazione speciale?',
                'status' => 'confirmed',
                'confirmed_at' => now(),
            ],
            [
                'name' => 'Luca Verdi',
                'email' => 'luca.verdi@email.com',
                'date' => Carbon::today()->addDays(3),
                'time' => '18:30',
                'guests' => 10,
                'special_requests' => 'Cena di lavoro, necessario ambiente tranquillo',
                'status' => 'pending',
            ],
            [
                'name' => 'Anna Neri',
                'email' => 'anna.neri@email.com',
                'date' => Carbon::today()->addDays(4),
                'time' => '19:30',
                'guests' => 7,
                'special_requests' => null,
                'status' => 'confirmed',
                'confirmed_at' => now(),
            ],
            [
                'name' => 'Francesco Blu',
                'email' => 'francesco.blu@email.com',
                'date' => Carbon::today()->addDays(5),
                'time' => '21:00',
                'guests' => 12,
                'special_requests' => 'Compleanno - torta personalizzata richiesta',
                'status' => 'cancelled',
            ],
        ];

        foreach ($bookings as $booking) {
            Booking::create($booking);
        }
    }
}
