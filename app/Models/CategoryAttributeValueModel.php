<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CategoryAttributeValueModel extends Model
{
    use HasFactory;

    protected $table = 'category_attribute_values';
    public $timestamps = false;

    function attributeValue(): BelongsTo
    {
        return $this->belongsTo(AttributeValueModel::class, 'attribute_value_id', 'id');
    }

}
