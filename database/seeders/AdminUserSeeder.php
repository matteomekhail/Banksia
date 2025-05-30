<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class AdminUserSeeder extends Seeder
{
    /**
     * Run the database seeder.
     */
    public function run(): void
    {
        User::firstOrCreate(
            ['email' => 'info@banksiaoranpark.com.au'],
            [
                'name' => 'Admin Banksia',
                'email' => 'info@banksiaoranpark.com.au',
                'password' => Hash::make('admin123'),
                'email_verified_at' => now(),
            ]
        );

        // Crea anche un utente di test per lo sviluppo
        User::firstOrCreate(
            ['email' => 'admin@test.com'],
            [
                'name' => 'Test Admin',
                'email' => 'admin@test.com',
                'password' => Hash::make('password'),
                'email_verified_at' => now(),
            ]
        );
    }
}
