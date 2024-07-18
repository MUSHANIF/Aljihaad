<?php

namespace App\Http\Controllers;

use App\Http\Requests\EventsRequest;
use App\Models\Event;
use Illuminate\Support\Str;
use App\Http\Requests\StoreEventRequest;
use App\Http\Requests\UpdateEventRequest;
use App\Http\Resources\EventResource;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class EventController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = Event::query();

        $sortField = request("sort_field", 'created_at');
        $sortDirection = request("sort_direction", "desc");

        if (request("name")) {
            $query->where("name", "like", "%" . request("name") . "%");
        }
        if (request("description")) {
            $query->where("description", request("description"));
        }

        $events = $query->orderBy($sortField, $sortDirection)
            ->paginate(10)
            ->onEachSide(1);

        return inertia("Events/Index", [
            "events" => EventResource::collection($events),
            'queryParams' => request()->query() ?: null,
            'success' => session('success'),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia("Events/Create");
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(EventsRequest $request)
    {



        $data = $request->validated();
        $image = $data['image'] ?? null;
        $data['created_by'] = Auth::id();
        $data['updated_by'] = Auth::id();
        if ($image) {
            $path = $image->store('events/' . Str::random(), 'public');
            // $data['image_path'] = Storage::url($path);
            $data['image_path'] = $path;
        }
        Event::create($data);

        return to_route('event.index')
            ->with('success', 'Event was created!');
    }

    /**
     * Display the specified resource.
     */
    public function show(Event $event)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Event $event)
    {
        return inertia('Events/Edit', [
            'event' => new EventResource($event),
        ]);
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateEventRequest $request, Event $event)
    {
        $data = $request->validated();
        $image = $data['image'] ?? null;
        $data['updated_by'] = Auth::id();
        if ($image) {
            if ($event->image_path) {
                Storage::disk('public')->deleteDirectory(dirname($event->image_path));
            }
            $data['image_path'] = $image->store('event/' . Str::random(), 'public');
        }
        $event->update($data);

        return to_route('event.index')
            ->with('success', "Event \"$event->name\" was updated");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Event $event)
    {
        $name = $event->name;
        $event->delete();
        if ($event->image_path) {
            Storage::disk('public')->deleteDirectory(dirname($event->image_path));
        }
        return to_route('event.index')
            ->with('success', "Event \"$name\" was deleted");
    }
}
