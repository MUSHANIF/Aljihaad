<?php

namespace App\Http\Controllers\Api;

use App\Models\blog;
use App\Http\Requests\StoreblogRequest;
use App\Http\Requests\UpdateblogRequest;
use App\Http\Resources\BlogResource;
use App\Models\per_rt;
use App\Http\Controllers\Controller;
use App\Models\amil_zakat;
use App\Models\jenis_zakat;
use App\Models\penerimaan_zakat;
use App\Models\Pengurus;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class ZakatControllerApi extends Controller
{
    public function perRtApi()
    {
        $perRt = per_rt::where('status', 'aktif')->get();
        return response()->json([
            'status' => 'success',
            'data' => $perRt
        ]);
    }
    public function jenisZakat()
    {
        $jenisZakat = jenis_zakat::where('status', 'aktif')->get();
        return response()->json([
            'status' => 'success',
            'data' => $jenisZakat
        ]);
    }
    public function PengurusZakat()
    {

        $jenisZakat = Pengurus::all();
        return response()->json([
            'status' => 'success',
            'data' => $jenisZakat
        ]);
    }
    public function RekapGabungan()
    {
        $penerimaan_zakat = penerimaan_zakat::all();
        return response()->json([
            'status' => 200,
            'data' => $penerimaan_zakat
        ]);
    }
    public function RekapDataPerhari()
    {
        $penerimaan_zakat = penerimaan_zakat::where('tanggal', now()->format('Y-m-d'))->get();
        return response()->json([
            'status' => 200,
            'data' => $penerimaan_zakat
        ]);
    }
    public function amilZakatAbsen(Request $request)
    {

        $cekPengurusNonStatus = amil_zakat::with(['getPengurusData'])->getAmilZakat($request)
            ->first();
        $cekPengurusStatus = amil_zakat::with(['getPengurusData'])
            ->getAmilZakat($request)
            ->where('status', $request->status)
            ->first();
        if ($cekPengurusStatus) {
            return response()->json([
                'status' => 400,
                'message' => 'Amil ' . $cekPengurusStatus->getPengurusData->name . ' sudah absen pada ' . $request->waktu_berzakat . ' Hari'
            ]);
        } elseif ($cekPengurusNonStatus) {
            $pengurus = amil_zakat::where('id_pengurus', $request->id_pengurus)->update([
                'status' => $request->status,
            ]);
            return response()->json([
                'status' => 200,
                'message' => 'Berhasil mengubah data Amil ' .  $cekPengurusNonStatus->getPengurusData->name
            ]);
        } else {
            $cekPengurus = Pengurus::where('id', $request->id_pengurus)->first();
            $pengurus = amil_zakat::create([
                'status' => $request->status,
                'id_pengurus' => $request->id_pengurus,
                'tanggal_hadir' => $request->tanggal,
                'waktu_hadir' => $request->waktu_berzakat,
            ]);
            return response()->json([
                'status' => 200,
                'message' => $cekPengurus->name . ' berhasil absen pada ' . $request->waktu_berzakat . ' Hari'
            ]);
        }
    }
}
