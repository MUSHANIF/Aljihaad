<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class MustahikResource extends JsonResource
{
    public static $wrap = false;
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'nik' => $this->nik,
            'nama_kepala_keluarga' => $this->nama_kepala_keluarga,
            'jumlah_anggota_keluarga' => $this->jumlah_anggota_keluarga,
            'tahun_mustahik' => $this->tahun_mustahik,
            'id_rt' => $this->id_rt,
        ];
    }
}
