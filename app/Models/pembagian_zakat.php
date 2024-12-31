<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class pembagian_zakat extends Model
{
    use HasFactory;
    protected $fillable = ['nama_yayasan', 'jenis_pengambilan', 'jenis_pemilihan', 'jenis_penyaluran', 'alamat', 'no_hp', 'jumlah_uang', 'jumlah_beras', 'id_rt', 'created_by', 'updated_by', 'created_by'];

    public function RelationRt()
    {
        return $this->belongsTo(per_rt::class, 'id_rt', 'id');
    }
}
