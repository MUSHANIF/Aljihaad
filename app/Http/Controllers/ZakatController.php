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
        return inertia("Zakat/RekapGabungan", [
            'queryParams' => request()->query() ?: null,
            'dataRT' => per_rt::all(),
            'dataJenisZakat' => jenis_zakat::all(),
            'success' => session('success'),
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

        return inertia("Zakat/RekapDataPerhari", [
            "pengurus" => PengurusResource::collection($Pengurus),
            'queryParams' => request()->query() ?: null,
            'dataRT' => per_rt::all(),
            'dataJenisZakat' => jenis_zakat::all(),
            'success' => session('success'),
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
            $penerimaan_zakat = penerimaan_zakat::create($data);
            return redirect()->route('zakat.RekapGabungan')->with('success', 'Muzaaki atas nama ' . $penerimaan_zakat->nama_muzakki . ' berhasil ditambahkan');
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
