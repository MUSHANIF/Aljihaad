<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PerRtSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('per_rts')->insert([
            ['nama_rt' => 'RT 01', 'status' => 'nonaktif', 'created_at' => now(), 'updated_at' => now()],
            ['nama_rt' => 'RT 02', 'status' => 'nonaktif', 'created_at' => now(), 'updated_at' => now()],
            ['nama_rt' => 'RT 03', 'status' => 'aktif', 'created_at' => now(), 'updated_at' => now()],
            ['nama_rt' => 'RT 04', 'status' => 'aktif', 'created_at' => now(), 'updated_at' => now()],
            ['nama_rt' => 'RT 05', 'status' => 'aktif', 'created_at' => now(), 'updated_at' => now()],
        ]);
    }
}
