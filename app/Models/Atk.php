<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Atk extends Model
{
    use HasFactory;
    protected $fillable = ['id_amil', 'nama_barang', 'harga_barang', 'total_barang', 'foto_struk', 'tanggal_pembelian'];
}
