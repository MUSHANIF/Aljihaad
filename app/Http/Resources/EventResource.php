<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class EventResource extends JsonResource
{
    public static $wrap = false;
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'description' => $this->description,
            'date' => (new Carbon($this->created_at))->format('Y-m-d'),
            'image_path' => $this->image_path && !(str_starts_with($this->image_path, 'http')) ?
                Storage::url($this->image_path) : $this->image_path,
        ];
    }
}
