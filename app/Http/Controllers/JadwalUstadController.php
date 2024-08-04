<?php

namespace App\Http\Controllers;

use RealRashid\SweetAlert\Facades\Alert;
use App\Models\jadwalUstad;
use App\Http\Requests\StorejadwalUstadRequest;
use App\Http\Requests\UpdatejadwalUstadRequest;
use Illuminate\Support\Str;
use App\Http\Resources\JadwalUstadResource;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class JadwalUstadController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = jadwalUstad::query();

        $sortField = request("sort_field", 'created_at');
        $sortDirection = request("sort_direction", "desc");

        if (request("name")) {
            $query->where("name", "like", "%" . request("name") . "%");
        }
        if (request("description")) {
            $query->where("description", request("description"));
        }

        $jadwalUstads = $query->orderBy($sortField, $sortDirection)
            ->paginate(10)
            ->onEachSide(1);

        return inertia("Khutbah/Index", [
            "khutbah" => JadwalUstadResource::collection($jadwalUstads),
            'queryParams' => request()->query() ?: null,
            'success' => session('success'),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia("Khutbah/Create");
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorejadwalUstadRequest $request)
    {



        $data = $request->validated();
        $image = $data['image'] ?? null;
        if ($image) {
            $path = $image->store('jadwalUstad/' . Str::random(), 'public');
            // $data['image_path'] = Storage::url($path);
            $data['image_path'] = $path;
        }
        jadwalUstad::create($data);
        Alert::success('Success Title', 'Success Message');
        return to_route('jadwalUstad.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(jadwalUstad $jadwalUstad)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(jadwalUstad $jadwalUstad)
    {
        return inertia('Khutbah/Edit', [
            'jadwalUstad' => new jadwalUstadResource($jadwalUstad),
        ]);
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatejadwalUstadRequest $request, jadwalUstad $jadwalUstad)
    {
        $data = $request->validated();
        $image = $data['image'] ?? null;
        if ($image) {
            if ($jadwalUstad->image_path) {
                Storage::disk('public')->deleteDirectory(dirname($jadwalUstad->image_path));
            }
            $data['image_path'] = $image->store('jadwalUstad/' . Str::random(), 'public');
        }
        $jadwalUstad->update($data);
        return to_route('jadwalUstad.index')
            ->with('success', "jadwalUstad \"$jadwalUstad->name\" was updated");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(jadwalUstad $jadwalUstad)
    {
        $name = $jadwalUstad->name;
        $jadwalUstad->delete();
        if ($jadwalUstad->image_path) {
            Storage::disk('public')->deleteDirectory(dirname($jadwalUstad->image_path));
        }
        return to_route('jadwalUstad.index')
            ->with('success', "jadwalUstad \"$name\" was deleted");
    }
}
