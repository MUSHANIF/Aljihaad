<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class amil_zakat extends Model
{
    use HasFactory;
    protected $fillable = ['id_pengurus', 'jumlah_hadir', 'waktu_hadir', 'status', 'tanggal_hadir', 'total_hadir'];


    public function getPengurusData()
    {
        return $this->belongsTo(Pengurus::class, 'id_pengurus', 'id');
    }
}
