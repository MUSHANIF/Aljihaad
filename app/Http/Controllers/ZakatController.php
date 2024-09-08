<?php

namespace App\Http\Controllers;

use App\Http\Requests\Storepenerimaan_zakatRequest;
use App\Http\Requests\Updatepenerimaan_zakatRequest;
use App\Http\Resources\PengurusResource;
use App\Models\jenis_zakat;
use App\Models\penerimaan_zakat;
use App\Models\Pengurus;
use App\Models\per_rt;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ZakatController extends Controller
{
    public function index()
    {
        $query = Pengurus::query();

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

        return inertia("Zakat/Index", [
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
}
