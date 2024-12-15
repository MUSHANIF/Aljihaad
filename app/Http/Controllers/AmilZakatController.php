<?php

namespace App\Http\Controllers;

use App\Http\Requests\Storeamil_zakatRequest;
use App\Http\Requests\Updateamil_zakatRequest;
use App\Models\amil_zakat;
use App\Models\jenis_zakat;
use App\Models\penerimaan_zakat;
use App\Models\Pengurus;
use App\Models\per_rt;

class AmilZakatController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {

        $query = Pengurus::with(['getDataAmilZakat'])->where('status', 'amil');
        $sortField = request("sort_field", 'created_at');
        $sortDirection = request("sort_direction", "desc");
        if (request("name")) {
            $query->where("name", "like", "%" . request("name") . "%");
        }
        $AkumulasiZakat = penerimaan_zakat::getAkumulasiZakat();
        $AkumulasiInfaq = penerimaan_zakat::getAkumulasiInfaq();
        $totalAkumulasi = $AkumulasiZakat + $AkumulasiInfaq;
        $Pengurus = $query->orderBy($sortField, $sortDirection)
            ->paginate(10)
            ->onEachSide(1);
        return inertia("Zakat/AbsensiZakat", [
            "pengurus" => $Pengurus,
            "AkumulasiInfaq" => number_format($AkumulasiInfaq, 0, ',', '.'),
            "AkumulasiZakat" => number_format($AkumulasiZakat, 0, ',', '.'),
            "AkumulasiTotal" => number_format($totalAkumulasi, 0, ',', '.'),
            'queryParams' => request()->query() ?: null,
            'dataRT' => per_rt::all(),
            'dataJenisZakat' => jenis_zakat::all(),
            'success' => session('success'),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Storeamil_zakatRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(amil_zakat $amil_zakat)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(amil_zakat $amil_zakat)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Updateamil_zakatRequest $request, amil_zakat $amil_zakat)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(amil_zakat $amil_zakat)
    {
        //
    }
}
