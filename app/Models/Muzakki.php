<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Muzakki extends Model
{
    /** @use HasFactory<\Database\Factories\MuzakkiFactory> */
    protected $fillable = ['nama_muzakki', 'no_invoice', 'jiwa', 'id_rt'];
    use HasFactory;

    public function RelationMuzzaki()
    {
        return $this->hasMany(penerimaan_zakat::class, 'id_muzakki', 'id');
    }
    public function RelationRt()
    {
        return $this->hasOne(per_rt::class, 'id', 'id_rt');
    }
}
