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
    public function scopeByRt($query, $id_rt)
    {
        return $query->where('id_rt', $id_rt);
    }

    /**
     * Scope untuk filter berdasarkan tanggal tertentu
     */
    public function scopeByDate($query, $date = null)
    {
        $date = $date ?? now()->format('Y-m-d');
        return $query->whereDate('tanggal', $date);
    }


    public static function getAkumulasiZakat()
    {
        return self::whereIn('id_jenis_zakat', [1, 2, 3])
            ->whereYear('created_at', now()->year)
            ->sum('jumlah_uang') * 0.25;
    }

    /**
     * Get Akumulasi Infaq.
     *
     * @return float
     */
    public static function getAkumulasiInfaq()
    {
        return self::whereIn('id_jenis_zakat', [4])
            ->whereYear('created_at', now()->year)
            ->sum('jumlah_uang') ?? 0;
    }
}
