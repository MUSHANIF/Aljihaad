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
        Schema::create('amil_zakats', function (Blueprint $table) {
            $table->id();
            $table->string('status')->nullable();
            $table->integer('jumlah_hadir')->nullable();
            $table->string('waktu_hadir')->nullable();
            $table->integer('total_hadir')->nullable();
            $table->date('tanggal_hadir')->nullable();
            $table->foreignId('id_pengurus')->constrained('penguruses');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('amil_zakats');
    }
};
