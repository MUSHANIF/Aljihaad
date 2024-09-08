<?php

use App\Http\Controllers\Api\ZakatControllerApi;
use App\Http\Controllers\ZakatController;
use Illuminate\Auth\Middleware\Authenticate;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware(Authenticate::using('sanctum'));

Route::get('/getRtApi', [ZakatControllerApi::class, 'perRtApi'])->name('getRtApi');
Route::get('/getTypeOfZakat', [ZakatControllerApi::class, 'jenisZakat'])->name('getTypeOfZakat');
Route::get('/getRekapGabungan', [ZakatControllerApi::class, 'RekapGabungan'])->name('getRekapGabungan');
