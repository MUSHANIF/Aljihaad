<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class jadwalUstad extends Model
{
    use HasFactory;
    protected $fillable = ['image_path', 'name', 'description', 'tanggal_kajian', 'status'];
}
