<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pengurus extends Model
{
    use HasFactory;
    protected $fillable = ['image_path', 'gender', 'umur', 'name', 'description', 'status', 'no_telp'];
}
