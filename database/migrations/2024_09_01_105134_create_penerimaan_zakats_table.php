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
        Schema::create('penerimaan_zakats', function (Blueprint $table) {
            $table->id();
            $table->string('nama_muzakki')->nullable();
            $table->date('tanggal')->nullable();
            $table->integer('jiwa')->nullable();
            $table->string('status_zakat')->nullable();
            $table->integer('jumlah_uang')->nullable();
            $table->string('jumlah_beras')->nullable();
            $table->string('waktu_berzakat')->nullable();
            $table->foreignId('id_jenis_zakat')->constrained('jenis_zakats');
            $table->foreignId('id_rt')->constrained('per_rts');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('penerimaan_zakats');
    }
};
