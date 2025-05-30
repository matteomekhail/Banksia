<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\User;

class ListAdmins extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'admin:list';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'List all admin users';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $admins = User::all();

        if ($admins->isEmpty()) {
            $this->warn('No admin users found.');
            $this->info('Create one with: php artisan admin:create');
            return 0;
        }

        $this->info('Admin Users:');
        $this->newLine();

        $headers = ['ID', 'Name', 'Email', 'Created At'];
        $rows = [];

        foreach ($admins as $admin) {
            $rows[] = [
                $admin->id,
                $admin->name,
                $admin->email,
                $admin->created_at->format('Y-m-d H:i:s')
            ];
        }

        $this->table($headers, $rows);

        return 0;
    }
}
