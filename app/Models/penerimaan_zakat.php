<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class penerimaan_zakat extends Model
{
    use HasFactory;
    protected $fillable = ['nama_muzakki', 'tanggal', 'jiwa', 'status_zakat', 'jumlah_uang', 'jumlah_beras', 'waktu_berzakat', 'id_jenis_zakat', 'id_rt', 'created_by', 'updated_by'];
}
