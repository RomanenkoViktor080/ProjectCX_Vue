<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductAttributeModel extends Model
{
    use HasFactory;

    protected $table = 'product_attributes';
    public $timestamps = false;

    protected $fillable = [
        'attribute_id',
        'attribute_value_id',
        'product_id',
    ];

}
