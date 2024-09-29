<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('mustahiks', function (Blueprint $table) {
            $table->id();
            $table->integer('nik')->nullable();
            $table->string('nama_kepala_keluarga')->nullable();
            $table->integer('jumlah_anggota_keluarga')->nullable();
            $table->integer('tahun_mustahik')->nullable();
            $table->integer('created_by')->nullable();
            $table->integer('updated_by')->nullable();
            $table->foreignId('id_rt')->constrained('per_rts');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('mustahiks');
    }
};
