<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class penerimaan_zakat extends Model
{
    use HasFactory;
    protected $fillable = ['nama_muzakki', 'no_invoice', 'tanggal', 'jiwa', 'status_zakat', 'jumlah_uang', 'jumlah_beras', 'waktu_berzakat', 'id_jenis_zakat', 'metode_pembayaran', 'id_rt', 'created_by', 'updated_by', 'created_at', 'updated_at'];

    public function RelationRt()
    {
        return $this->belongsTo(per_rt::class, 'id_rt', 'id');
    }
    public function RelationJenisZakat()
    {
        return $this->belongsTo(jenis_zakat::class, 'id_jenis_zakat', 'id');
    }
    public function createdByUser()
    {
        return $this->belongsTo(User::class, 'created_by');
    }
}
