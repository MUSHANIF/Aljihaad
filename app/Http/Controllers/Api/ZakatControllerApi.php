<?php

namespace App\Http\Controllers\Api;

use App\Models\blog;
use App\Http\Requests\StoreblogRequest;
use App\Http\Requests\UpdateblogRequest;
use App\Http\Resources\BlogResource;
use App\Models\per_rt;
use App\Http\Controllers\Controller;
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
}
