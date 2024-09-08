<?php

namespace App\Http\Controllers\Api;

use App\Models\blog;
use App\Http\Requests\StoreblogRequest;
use App\Http\Requests\UpdateblogRequest;
use App\Http\Resources\BlogResource;
use App\Models\per_rt;
use App\Http\Controllers\Controller;
use App\Models\jenis_zakat;
use App\Models\penerimaan_zakat;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class ZakatControllerApi extends Controller
{  
    public function perRtApi(){
        $perRt = per_rt::where('status', 'aktif')->get();
        return response()->json([
            'status' => 'success',
            'data' => $perRt
        ]);
    }
    public function jenisZakat(){
        $jenisZakat = jenis_zakat::where('status', 'aktif')->get();
        return response()->json([
            'status' => 'success',
            'data' => $jenisZakat
        ]);
    }
    public function RekapGabungan(){
        $penerimaan_zakat = penerimaan_zakat::all();
        return response()->json([
            'status' => 200,
            'data' => $penerimaan_zakat
        ]);
    }
}
