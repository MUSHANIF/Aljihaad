<?php

use App\Http\Controllers\Api\ZakatControllerApi;
use Illuminate\Auth\Middleware\Authenticate;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware(Authenticate::using('sanctum'));

Route::get('/perRtApi', [ZakatControllerApi::class, 'perRtApi'])->name('perRtApi');