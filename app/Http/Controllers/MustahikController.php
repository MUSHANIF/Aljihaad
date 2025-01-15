<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreMustahikRequest;
use App\Http\Requests\Storepembagian_zakatRequest;
use App\Http\Resources\MustahikResource;
use App\Models\jenis_zakat;
use App\Models\Mustahik;
use App\Models\pembagian_zakat;
use App\Models\per_rt;
use App\Models\Total_sum_zakat;
use Illuminate\Support\Facades\Auth;
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
    public function PostPembagianZakat(Storepembagian_zakatRequest $request)
    {
        try {
            $data = $request->validated();
            $currentYear = date('Y');
            pembagian_zakat::create([
                'nama_yayasan' => $data['pilihan'] == 2 ? $data['nama_yayasan'] : null,
                'id_rt' => $data['pilihan'] == 1 ? $data['id_rt'] : null,
                'jenis_pemilihan' => $data['pilihan'],
                'jenis_pengambilan' => $data['jenis_pengambilan'],
                'alamat' => $data['pilihan'] == 2 ? $data['alamat'] : null,
                'no_hp' => $data['pilihan'] == 2  ? $data['telepon'] : null,
                'jumlah_uang' => $data['uang'],
                'jumlah_beras' => $data['jumlah_beras'] ?? null,
                'created_by' =>  Auth::user()->id,
            ]);

            $getTotalZakat = Total_sum_zakat::whereYear('created_at', $currentYear)
                ->first();

            if ($getTotalZakat) {
                if ($data['jenis_pengambilan'] != 3) {
                    $jumlah25Percent = $data['uang'] * 0.25;
                    $jumlahNet = $data['uang'] - $jumlah25Percent;
                    $getTotalZakat->update([
                        'sisa_pemasukan_total' => $getTotalZakat->sisa_pemasukan_total - $data['uang'],
                        'sisa_pemasukan_25_percent' => $getTotalZakat->sisa_pemasukan_25_percent - $jumlah25Percent,
                        'sisa_net_pemasukan_total' => $getTotalZakat->sisa_net_pemasukan_total - $jumlahNet,
                        'sisa_beras' => $getTotalZakat->sisa_beras - $data['jumlah_beras'] ?? 0,
                    ]);
                } else {
                    $jumlah25Percent = $$data['uang'] * 0.25;
                    $jumlahNet = $data['uang'] - $jumlah25Percent;
                    $getTotalZakat->update([
                        'sisa_infaq_shodaqoh' => $getTotalZakat->sisa_infaq_shodaqoh - $data['uang'],
                        'sisa_beras' => $getTotalZakat->sisa_beras - $data['jumlah_beras'] ?? 0,
                    ]);
                }
            }



            return redirect()->route('zakat.PembagianZakat')->with('success', 'Para Muzaaki berhasil ditambahkan');
        } catch (\Exception $e) {
            dd($e->getMessage());
        }
    }
}
