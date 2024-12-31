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
        Schema::create('pembagian_zakats', function (Blueprint $table) {
            $table->id();
            $table->string('nama_yayasan')->nullable();
            $table->string('jenis_pengambilan')->nullable();
            $table->string('alamat')->nullable();
            $table->string('no_hp')->nullable();
            $table->integer('jumlah_uang')->nullable();
            $table->integer('jenis_pemilihan')->nullable();
            $table->integer('jumlah_beras')->nullable();
            $table->integer('created_by')->nullable();
            $table->foreignId('id_rt')->constrained('per_rts')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pembagian_zakats');
    }
};
