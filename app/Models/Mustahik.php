<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Mustahik extends Model
{
    use HasFactory;
    protected $fillable = ['nik', 'nama_kepala_keluarga', 'jumlah_anggota_keluarga', 'tahun_mustahik', 'id_rt', 'created_by', 'updated_by'];
}
