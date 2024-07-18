<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserRole extends Model
{
    use HasFactory;
    protected $fillable = ['role', 'user_id'];


    public function user_id()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
