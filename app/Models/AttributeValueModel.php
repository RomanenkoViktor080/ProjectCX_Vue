<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class AttributeValueModel extends Model
{
    use HasFactory;

    protected $fillable = [
        'value',
    ];

    protected $table = 'attribute_values';

    public $timestamps = false;

    public function products(): BelongsToMany
    {
        return $this->belongsToMany(ProductModel::class, 'product_attributes', 'attribute_value_id', 'product_id', 'id', 'id');
    }

}
