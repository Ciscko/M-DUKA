<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SaleProducts extends Model
{
    use HasFactory;
    
    protected $fillable = [
        'sales_id', 'product_id', 'product_name', 'qty', 'sprice', 'bprice'
    ];

    protected $hidden = [
        'created_at', 'updated_at'
    ];
}
