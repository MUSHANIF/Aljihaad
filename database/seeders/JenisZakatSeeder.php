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
            ['nama_zakat' => 'Zakat Profesi', 'status' => 'aktif', 'created_at' => now(), 'updated_at' => now()],
            ['nama_zakat' => 'Zakat Emas', 'status' => 'aktif', 'created_at' => now(), 'updated_at' => now()],
            ['nama_zakat' => 'Zakat Perak', 'status' => 'aktif', 'created_at' => now(), 'updated_at' => now()],
            ['nama_zakat' => 'Zakat Pertanian', 'status' => 'aktif', 'created_at' => now(), 'updated_at' => now()],
            ['nama_zakat' => 'Zakat Peternakan', 'status' => 'aktif', 'created_at' => now(), 'updated_at' => now()],
            ['nama_zakat' => 'Zakat Perdagangan', 'status' => 'aktif', 'created_at' => now(), 'updated_at' => now()],
            ['nama_zakat' => 'Zakat Pertambangan', 'status' => 'aktif', 'created_at' => now(), 'updated_at' => now()],
            ['nama_zakat' => 'Zakat Perikanan', 'status' => 'aktif', 'created_at' => now(), 'updated_at' => now()],
            ['nama_zakat' => 'Zakat Transportasi', 'status' => 'aktif', 'created_at' => now(), 'updated_at' => now()],
            ['nama_zakat' => 'Zakat Pendidikan', 'status' => 'aktif', 'created_at' => now(), 'updated_at' => now()],
            ['nama_zakat' => 'Zakat Kesehatan', 'status' => 'aktif', 'created_at' => now(), 'updated_at' => now()],
            ['nama_zakat' => 'Zakat Lingkungan', 'status' => 'aktif', 'created_at' => now(), 'updated_at' => now()],                    
        ]);
    }
}
