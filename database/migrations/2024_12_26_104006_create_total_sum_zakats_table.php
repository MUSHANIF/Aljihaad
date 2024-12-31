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
        Schema::create('total_sum_zakats', function (Blueprint $table) {
            $table->id();
            $table->integer('total_pemasukan_25_percent')->nullable();
            $table->integer('sisa_pemasukan_25_percent')->nullable();
            $table->integer('total_pemasukan_total')->nullable();
            $table->integer('sisa_pemasukan_total')->nullable();
            $table->integer('net_pemasukan_total')->nullable();
            $table->integer('sisa_net_pemasukan_total')->nullable();
            $table->integer('total_beras')->nullable();
            $table->integer('sisa_beras')->nullable();
            $table->integer('total_infaq_shodaqoh')->nullable();
            $table->integer('sisa_infaq_shodaqoh')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('total_sum_zakats');
    }
};
