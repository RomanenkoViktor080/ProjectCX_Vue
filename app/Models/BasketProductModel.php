<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BasketProductModel extends Model
{
    use HasFactory;

    protected $table = 'basket_products';

    protected $fillable = [
        'quantity',
        'product_id',
        'user_id',
    ];

    public $timestamps = false;
}
