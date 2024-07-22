<?php

namespace App\Http\Controllers;

use App\Models\Pengurus;
use App\Http\Requests\StorePengurusRequest;
use App\Http\Requests\UpdatePengurusRequest;
use App\Http\Resources\PengurusResource;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class PengurusController extends Controller
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

        return inertia("Pengurus/Index", [
            "pengurus" => PengurusResource::collection($Pengurus),
            'queryParams' => request()->query() ?: null,
            'success' => session('success'),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia("Pengurus/Create");
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePengurusRequest $request)
    {
        $data = $request->validated();
        $image = $data['image'] ?? null;
        $data['created_by'] = Auth::id();
        $data['updated_by'] = Auth::id();
        if ($image) {
            $path = $image->store('Pengurus/' . Str::random(), 'public');
            $data['image_path'] = $path;
        }
        Pengurus::create($data);

        return to_route('Pengurus.index')
            ->with('success', 'Project was created');
    }

    /**
     * Display the specified resource.
     */
    public function show($Pengurus)
    {
        $Pengurus = Pengurus::find($Pengurus);
        return inertia('Pengurus/Show', [
            'Pengurus' => new PengurusResource($Pengurus),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($Pengurus)
    {
        $Pengurus = Pengurus::find($Pengurus);

        return inertia('Pengurus/Edit', [
            'Pengurus' => new PengurusResource($Pengurus),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePengurusRequest $request,  $Pengurus)
    {
        $Pengurus = Pengurus::find($Pengurus);
        $data = $request->validated();
        $image = $data['image'] ?? null;
        $data['updated_by'] = Auth::id();
        if ($image) {
            if ($Pengurus->image_path) {
                Storage::disk('public')->deleteDirectory(dirname($Pengurus->image_path));
            }
            $data['image_path'] = $image->store('Pengurus/' . Str::random(), 'public');
        }
        $Pengurus->update($data);


        return to_route('Pengurus.index')
            ->with('success', "Pengurus \"$Pengurus->name\" was updated");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($Pengurus)
    {
        $searchData = Pengurus::find($Pengurus);

        $name = $searchData->name;
        $searchData->delete();
        if ($searchData->image_path) {
            Storage::disk('public')->deleteDirectory(dirname($searchData->image_path));
        }
        return to_route('Pengurus.index')
            ->with('success', "Pengurus \"$name\" was deleted");
    }
}
