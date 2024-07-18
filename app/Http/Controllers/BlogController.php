<?php

namespace App\Http\Controllers;

use App\Models\blog;
use App\Http\Requests\StoreblogRequest;
use App\Http\Requests\UpdateblogRequest;
use App\Http\Resources\BlogResource;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class BlogController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = Blog::query();

        $sortField = request("sort_field", 'created_at');
        $sortDirection = request("sort_direction", "desc");

        if (request("name")) {
            $query->where("name", "like", "%" . request("name") . "%");
        }
        if (request("description")) {
            $query->where("description", request("description"));
        }

        $blog = $query->orderBy($sortField, $sortDirection)
            ->paginate(10)
            ->onEachSide(1);

        return inertia("Blog/Index", [
            "blogs" => BlogResource::collection($blog),
            'queryParams' => request()->query() ?: null,
            'success' => session('success'),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia("Blog/Create");
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreblogRequest $request)
    {

        $data = $request->validated();
        $image = $data['image'] ?? null;
        $data['created_by'] = Auth::id();
        $data['updated_by'] = Auth::id();
        if ($image) {
            $path = $image->store('blog/' . Str::random(), 'public');
            $data['image_path'] = $path;
        }
        Blog::create($data);

        return to_route('blog.index')
            ->with('success', 'Project was created');
    }

    /**
     * Display the specified resource.
     */
    public function show(blog $blog)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Blog $blog)
    {
        return inertia('Blog/Edit', [
            'blog' => new BlogResource($blog),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateblogRequest $request, Blog $blog)
    {
        $data = $request->validated();
        $image = $data['image'] ?? null;
        $data['updated_by'] = Auth::id();
        if ($image) {
            if ($blog->image_path) {
                Storage::disk('public')->deleteDirectory(dirname($blog->image_path));
            }
            $data['image_path'] = $image->store('blog/' . Str::random(), 'public');
        }
        $blog->update($data);

        return to_route('blog.index')
            ->with('success', "Blog \"$blog->name\" was updated");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Blog $blog)
    {
        $name = $blog->name;
        $blog->delete();
        if ($blog->image_path) {
            Storage::disk('public')->deleteDirectory(dirname($blog->image_path));
        }
        return to_route('blog.index')
            ->with('success', "Blog \"$name\" was deleted");
    }
}
