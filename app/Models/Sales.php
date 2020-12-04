<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Sales extends Model
{
    use HasFactory;

    protected $fillable = [
        'time', 'user'
    ];

    protected $hidden = [
        'created_at', 'updated_at'
    ];

    public function sale_products(){
        return $this->hasMany('App\Models\SaleProducts');
    }
}
