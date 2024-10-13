<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class AtkResource extends JsonResource
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
            'id_amil' => $this->id_amil,
            'nama_barang' => $this->nama_barang,
            'harga_barang' => $this->harga_barang,
            'total_barang' => $this->total_barang,
            'foto_struk' => $this->foto_struk,
            'tanggal_pembelian' => $this->tanggal_pembelian,
        ];
    }
}
