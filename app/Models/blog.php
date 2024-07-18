<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class blog extends Model
{
    use HasFactory;
    protected $fillable = ['image_path', 'name', 'created_by', 'updated_by', 'description', 'date'];


    public function createdByUser()
    {
        return $this->belongsTo(User::class, 'created_by');
    }
}
