<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Total_sum_zakat extends Model
{
    /** @use HasFactory<\Database\Factories\TotalSumZakatFactory> */
    use HasFactory;
    protected $fillable = ['total_pemasukan_25_percent', 'total_25percent_infaq', 'total_infaq_shodaqoh', 'sisa_infaq_shodaqoh', 'total_beras', 'sisa_beras', 'sisa_pemasukan_25_percent', 'total_pemasukan_total', 'sisa_pemasukan_total', 'net_pemasukan_total', 'sisa_net_pemasukan_total'];
}
