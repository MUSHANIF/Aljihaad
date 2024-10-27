<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreMustahikRequest;
use App\Http\Resources\MustahikResource;
use App\Models\jenis_zakat;
use App\Models\Mustahik;
use App\Models\per_rt;
use Illuminate\Http\Request;

class MustahikController extends Controller
{
    public function index()
    {
        $query = Mustahik::query();

        $sortField = request("sort_field", 'created_at');
        $sortDirection = request("sort_direction", "desc");

        if (request("name")) {
            $query->where("name", "like", "%" . request("name") . "%");
        }
        if (request("description")) {
            $query->where("description", request("description"));
        }

        $Mustahik = $query->orderBy($sortField, $sortDirection)
            ->orderBy('created_at', 'desc')
            ->paginate(10)
            ->onEachSide(1);

        return inertia("Zakat/RekapMustahik", [
            "Mustahik" => MustahikResource::collection($Mustahik),
            'queryParams' => request()->query() ?: null,
            'dataRT' => per_rt::all(),
            'dataJenisZakat' => jenis_zakat::all(),
            'success' => session('success'),
        ]);
    }

    public function CreateMustahik()
    {
        return inertia("Zakat/CreateMustahik");
    }
    public function PostMustahik(StoreMustahikRequest $request)
    {
        try {
            $data = $request->validated();
            foreach ($data['Mustahik'] as $mustahik) {
                Mustahik::create([
                    'nama_kepala_keluarga' => $mustahik['nama_Mustahik'],
                    'jumlah_anggota_keluarga' => $mustahik['jiwa'],
                    'tahun_mustahik' => date('Y'),
                    'id_rt' => $data['id_rt'],
                    'nik' => $mustahik['nik'],
                    'created_by' => $data['created_by'],
                    'updated_by' => $data['updated_by'],
                    'tanggal' => now()->format('Y-m-d')
                ]);
            }
            return redirect()->route('zakat.RekapMustahik')->with('success', 'Para Muzaaki berhasil ditambahkan');
        } catch (\Exception $e) {
            dd($e->getMessage());
        }
    }
}
