<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class JenisZakatSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('jenis_zakats')->insert([
            ['nama_zakat' => 'Zakat Fitrah', 'status' => 'aktif', 'created_at' => now(), 'updated_at' => now()],
            ['nama_zakat' => 'Zakat Mal', 'status' => 'aktif', 'created_at' => now(), 'updated_at' => now()],
            ['nama_zakat' => 'Fidyah', 'status' => 'aktif', 'created_at' => now(), 'updated_at' => now()],
            ['nama_zakat' => 'Infaq', 'status' => 'aktif', 'created_at' => now(), 'updated_at' => now()],

        ]);
    }
}
