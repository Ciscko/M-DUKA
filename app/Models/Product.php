<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;
    
    protected $fillable = [
        'name', 'category', 'brand', 'buying', 'selling', 'desc', 'qty'
    ];

    protected $hidden = [
        'created_at', 'updated_at'
    ];
}
