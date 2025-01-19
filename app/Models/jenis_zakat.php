<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class jenis_zakat extends Model
{
    protected $fillable = ['nama_zakat', 'status'];
    use HasFactory;
}
