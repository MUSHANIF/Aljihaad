<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreAtkRequest;
use App\Http\Requests\Storepenerimaan_zakatRequest;
use App\Http\Requests\Updatepenerimaan_zakatRequest;
use App\Http\Resources\AtkResource;
use App\Http\Resources\PengurusResource;
use App\Models\Atk;
use App\Models\jenis_zakat;
use Illuminate\Support\Str;
use App\Models\penerimaan_zakat;
use App\Models\Pengurus;
use App\Models\per_rt;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class ZakatController extends Controller
{
    public function index()
    {
        $TotalHariIni = penerimaan_zakat::whereDate('tanggal', now()->format('Y-m-d'))->count();
        $TotalKemarin = penerimaan_zakat::whereDate('tanggal', now()->subDay()->format('Y-m-d'))->count();

        $TotalKemarinUangZakat = penerimaan_zakat::whereDate('tanggal', now()->subDay()->format('Y-m-d'))->sum('jumlah_uang');
        $TotalUangZakatToday = penerimaan_zakat::whereDate('tanggal', now()->format('Y-m-d'))->sum('jumlah_uang');

        $PersentaseKenaikan = $TotalKemarin > 0 ? (($TotalHariIni - $TotalKemarin) / $TotalKemarin) * 100 : ($TotalHariIni > 0 ? 100 : 0);

        $PersentaseKenaikanUang = $TotalKemarinUangZakat > 0 ? (($TotalUangZakatToday - $TotalKemarinUangZakat) / $TotalKemarinUangZakat) * 100 : ($TotalUangZakatToday > 0 ? 100 : 0);

        return inertia("Zakat/RekapGabungan", [
            'queryParams' => request()->query() ?: null,
            'dataRT' => per_rt::all(),
            'dataJenisZakat' => jenis_zakat::all(),
            'success' => session('success'),
            'TotalHariIni' => $TotalHariIni,
            'PersentaseKenaikan' => $PersentaseKenaikan,
            'TotalUangZakatToday' => number_format($TotalUangZakatToday, 2, ',', '.'),
            'PersentaseKenaikanUang' => $PersentaseKenaikanUang,
        ]);
    }
    public function RekapAtk()
    {
        $query = Atk::query();

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

        return inertia("Zakat/Atk/Atk", [
            "AtkData" => AtkResource::collection($Mustahik),
            'queryParams' => request()->query() ?: null,
            'dataRT' => per_rt::all(),
            'amil' => Pengurus::all(),
            'dataJenisZakat' => jenis_zakat::all(),
            'success' => session('success'),
        ]);
    }
    public function CreateAtk()
    {
        return inertia("Zakat/Atk/CreateAtk");
    }
    public function zakatPerhari()
    {
        $query = Pengurus::where('created_at', now()->format('Y-m-d'));

        $sortField = request("sort_field", 'created_at');
        $sortDirection = request("sort_direction", "desc");

        if (request("name")) {
            $query->where("name", "like", "%" . request("name") . "%");
        }
        if (request("description")) {
            $query->where("description", request("description"));
        }

        $Pengurus = $query->orderBy($sortField, $sortDirection)
            ->paginate(10)
            ->onEachSide(1);

        $TotalHariIniRt3 = penerimaan_zakat::where('id_rt', 3)->whereDate('tanggal', now()->format('Y-m-d'));
        $TotalHariIniRt4 = penerimaan_zakat::where('id_rt', 5)->whereDate('tanggal', now()->format('Y-m-d'));
        $TotalHariIniRt4Atas = penerimaan_zakat::where('id_rt', 4)->whereDate('tanggal', now()->format('Y-m-d'));
        $TotalHariIniRt5 = penerimaan_zakat::where('id_rt', 6)->whereDate('tanggal', now()->format('Y-m-d'));

        return inertia("Zakat/RekapDataPerhari", [
            "pengurus" => PengurusResource::collection($Pengurus),
            'queryParams' => request()->query() ?: null,
            'dataRT' => per_rt::all(),
            'dataJenisZakat' => jenis_zakat::all(),
            'success' => session('success'),
            'TotalHariIniRt3' => number_format($TotalHariIniRt3->sum('jumlah_uang'), 2, ',', '.'),
            'TotalHariIniRt4' => number_format($TotalHariIniRt4->sum('jumlah_uang'), 2, ',', '.'),
            'TotalHariIniRt4Atas' => number_format($TotalHariIniRt4Atas->sum('jumlah_uang'), 2, ',', '.'),
            'TotalHariIniRt5' => number_format($TotalHariIniRt5->sum('jumlah_uang'), 2, ',', '.'),

            'CountHariIniRt3' => $TotalHariIniRt3->count(),
            'CountHariIniRt4' => $TotalHariIniRt4->count(),
            'CountHariIniRt4Atas' => $TotalHariIniRt4Atas->count(),
            'CountHariIniRt5' => $TotalHariIniRt5->count(),

        ]);
    }

    public function CreateZakat()
    {
        return inertia("Zakat/Create");
    }
    public function EditZakat($penerimaan_zakat)
    {
        $EditZakat = penerimaan_zakat::find($penerimaan_zakat);
        return inertia("Zakat/Edit", [
            'penerimaan_zakat' => $EditZakat
        ]);
    }
    public function PostDataAtk(StoreAtkRequest $request)
    {
        try {
            $data = $request->validated();
            foreach ($data['atkData'] as $atk) {
                $image = $atk['foto_struk'] ?? null;

                if ($image) {
                    $path = $image->store('FotoStrukAtk/' . Str::random(), 'public');
                    $atk['foto_struk'] = $path;
                }
                Atk::create([
                    'nama_barang' => $atk['nama_barang'],
                    'harga_barang' => $atk['harga_barang'],
                    'total_barang' => $atk['total_barang'],
                    'foto_struk' => $atk['foto_struk'],
                    'tanggal_pembelian' => $data['tanggal_pembelian'],
                    'id_amil' => $data['id_amil'],
                ]);
            }
            return redirect()->route('zakat.RekapAtk')->with('success', 'Data Atk berhasil ditambahkan');
        } catch (\Exception $e) {
            dd($e->getMessage());
        }
    }
    public function PostZakat(Storepenerimaan_zakatRequest $request)
    {
        try {
            $data = $request->validated();
            foreach ($data['dataJenisZakat'] as $key) {
                penerimaan_zakat::create([
                    'nama_muzakki' => $data['nama_muzakki'],
                    'id_rt' => $data['id_rt'],
                    'tanggal' => $data['tanggal'],
                    'jiwa' => $data['jiwa'],
                    'id_jenis_zakat' => $key['id_jenis_zakat'],
                    'status_zakat' => $key['status_zakat'],
                    'jumlah_uang' => $key['jumlah_uang'],
                    'jumlah_beras' => $key['jumlah_beras'],
                    'waktu_berzakat' => $key['waktu_berzakat'],
                    'metode_pembayaran' => $key['metode_pembayaran'],
                    'created_by' => $data['created_by'],
                    'updated_by' => $data['updated_by']
                ]);
            }
            return redirect()->route('zakat.RekapGabungan')->with('success', 'Muzaaki atas nama ' . $data['nama_muzakki'] . ' berhasil ditambahkan');
        } catch (\Exception $e) {
            dd($e->getMessage());
        }
    }
    public function PutZakat(Updatepenerimaan_zakatRequest $request, $zakat)
    {
        try {
            $Datazakat = penerimaan_zakat::find($zakat);
            $data = $request->validated();
            $data['updated_by'] = Auth::id();
            $Datazakat->update($data);
            return redirect()->route('zakat.RekapGabungan')->with('success', 'Muzaaki atas nama ' . $Datazakat->nama_muzakki . ' berhasil diupdate');
        } catch (\Exception $e) {
            dd($e->getMessage());
        }
    }

    public function DeleteZakat($Idpenerimaan_zakat)
    {
        try {
            $penerimaan_zakat = penerimaan_zakat::find($Idpenerimaan_zakat);
            $name = $penerimaan_zakat->nama_muzakki;
            $penerimaan_zakat->delete();
            return to_route('zakat.RekapGabungan')
                ->with('success', "Muzakki \"$name\" berhasil dihapus, Tolong Refresh Halaman");
        } catch (\Exception $e) {
            dd($e->getMessage());
        }
    }
    public function DeleteAtk($id_atk)
    {
        try {
            $DataAtk = Atk::find($id_atk);
            if ($DataAtk->foto_struk) {
                Storage::disk('public')->deleteDirectory(dirname($DataAtk->foto_struk));
            }
            $DataAtk->delete();
            return to_route('zakat.RekapAtk');
        } catch (\Exception $e) {
            dd($e->getMessage());
        }
    }
}
