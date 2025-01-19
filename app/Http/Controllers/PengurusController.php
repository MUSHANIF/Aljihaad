<?php

namespace App\Http\Controllers;

use App\Models\Pengurus;
use App\Http\Requests\StorePengurusRequest;
use App\Http\Requests\UpdatePengurusRequest;
use App\Http\Resources\PengurusResource;
use App\Models\amil_zakat;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
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
        $getDataUser = User::all();
        $options = $getDataUser->map(function ($user) {
            return [
                'value' => $user->id,
                'label' => $user->name,
            ];
        });

        return inertia("Pengurus/Create", [
            'getDataUser' => $options,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePengurusRequest $request)
    {
        $data = $request->validated();
        $image = $data['image'] ?? null;
        $imageTandaTangan = $data['imageTandaTangan'] ?? null;
        $data['created_by'] = Auth::id();
        $data['updated_by'] = Auth::id();
        try {
            DB::beginTransaction();
            $createEmail = $data['name'] . '@gmail.com';
            $inputUser = User::create([
                'name' => $data['name'],
                'email' => $createEmail,
                'password' => bcrypt('mypassword'),
                'email_verified_at' => now(),
            ]);

            $data['user_id'] = $inputUser->id;
            if ($image) {
                $path = $image->store('Pengurus/' . Str::random(), 'public');
                $data['image_path'] = $path;
            }
            if ($imageTandaTangan) {
                $path = $imageTandaTangan->store('Pengurus/' . Str::random(), 'public');
                $data['imageTandaTangan'] = $path;
            }
            $dataPengurus = Pengurus::create($data);

            DB::commit();
            return to_route('Pengurus.index')
                ->with('success', 'Pengurus was created');
        } catch (\Exception $e) {
            DB::rollBack();
            return back()->withErrors(['error' => 'Failed to create Pengurus: ' . $e->getMessage()]);
        }
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
        $Pengurus = Pengurus::find($Pengurus);;
        $getDataAllUser = User::all();
        $getDataUser = User::where('id', $Pengurus->user_id)->first();
        $optionsAll = $getDataAllUser->map(function ($user) {
            return [
                'value' => $user->id,
                'label' => $user->name,
            ];
        });
        $optionsUser = [
            'value' => $getDataUser->id,
            'label' => $getDataUser->name,
        ];

        return inertia('Pengurus/Edit', [
            'Pengurus' => new PengurusResource($Pengurus),
            'getDataUser' => $optionsAll,
            'getDataUserSelected' => $optionsUser,
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
        $imageTandaTangan = $data['imageTandaTangan'] ?? null;
        $data['updated_by'] = Auth::id();
        if ($image) {
            if ($Pengurus->image_path) {
                Storage::disk('public')->deleteDirectory(dirname($Pengurus->image_path));
            }
            $data['image_path'] = $image->store('Pengurus/' . Str::random(), 'public');
        }

        if ($imageTandaTangan) {
            if ($Pengurus->imageTandaTangan) {
                Storage::disk('public')->deleteDirectory(dirname($Pengurus->imageTandaTangan));
            }
            $data['imageTandaTangan'] = $imageTandaTangan->store('Pengurus/' . Str::random(), 'public');
        }
        $Pengurus->update($data);
        $emailUpdate = Str::slug($Pengurus->name, '') . '@gmail.com';
        $userData = User::where('id', $Pengurus->user_id)->update([
            'name' => $data['name'],
            'email' => $emailUpdate,
        ]);


        return to_route('Pengurus.index')
            ->with('success', "Pengurus \"$Pengurus->name\" was updated");
    }
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
