<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\User;

class RemoveTestAdmin extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'admin:remove-test';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Remove the test admin user (admin@test.com)';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $testEmail = 'admin@test.com';

        $this->info('Looking for test admin user...');

        $testAdmin = User::where('email', $testEmail)->first();

        if (!$testAdmin) {
            $this->warn('Test admin user not found.');
            return 0;
        }

        if ($this->confirm("Are you sure you want to delete the test admin user ({$testEmail})?")) {
            $testAdmin->delete();
            $this->info('✅ Test admin user removed successfully.');
        } else {
            $this->info('Operation cancelled.');
        }

        return 0;
    }
}
