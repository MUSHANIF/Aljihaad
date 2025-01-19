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
        Schema::create('penguruses', function (Blueprint $table) {
            $table->id();
            $table->string('name')->nullable();
            $table->string('umur')->nullable();
            $table->string('no_telp')->nullable();
            $table->string('gender')->nullable();
            $table->string('status')->nullable();
            $table->string('image_path')->nullable();
            $table->string('imageTandaTangan')->nullable();
            $table->longText('description')->nullable();
            $table->foreignId('user_id')->constrained('users');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('penguruses');
    }
};
