<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pengurus extends Model
{
    use HasFactory;
    protected $fillable = ['image_path', 'user_id', 'imageTandaTangan', 'gender', 'umur', 'name', 'description', 'status', 'no_telp'];


    public function scopeFilter($query, array $filters)
    {
        $query->when($filters['name'] ?? null, function ($query, $name) {
            $query->where('name', 'like', '%' . $name . '%');
        });
        $query->when($filters['description'] ?? null, function ($query, $description) {
            $query->where('description', $description);
        });
    }

    public function getDataAmilZakat()
    {
        return $this->hasMany(amil_zakat::class, 'id_pengurus', 'id');
    }
}
