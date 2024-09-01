<?php

namespace App\Http\Controllers;

use App\Http\Resources\PengurusResource;
use App\Models\Pengurus;
use Illuminate\Http\Request;

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
            'success' => session('success'),
        ]);        
    }
}
