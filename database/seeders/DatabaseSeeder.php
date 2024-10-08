<?php

namespace Database\Seeders;

use App\Models\Project;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();
        // DB::table('users')->truncate();
        User::factory()->create([
            'id' => 1,
            'name' => 'Zura',
            'email' => 'zura@example.com',
            'password' => bcrypt('123.321A'),
            'email_verified_at' => time()
        ]);
        User::factory()->create([
            'id' => 2,
            'name' => 'John Smith',
            'email' => 'john@example.com',
            'password' => bcrypt('123.321A'),
            'email_verified_at' => time()
        ]);
        User::factory()->create([
            'id' => 3,
            'name' => 'mumus',
            'email' => 'hanifmusthafa2005@gmail.com',
            'password' => bcrypt('sapi2005'),
            'email_verified_at' => time()
        ]);

        $this->call([
            JenisZakatSeeder::class,
            PerRtSeeder::class,

        ]);
        Project::factory()
            ->count(30)
            ->hasTasks(30)
            ->create();
    }
}
