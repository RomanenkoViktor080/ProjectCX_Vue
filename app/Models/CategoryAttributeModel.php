<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class CategoryAttributeModel extends Model
{
    use HasFactory;

    protected $table = 'category_attributes';

    public $timestamps = false;

    public function attribute(): BelongsTo
    {
        return $this->belongsTo(AttributeModel::class, 'attribute_id', 'id');
    }

    public function attributeValues(): BelongsToMany
    {
        return $this->belongsToMany(AttributeValueModel::class, 'category_attribute_values', 'category_attribute_id', 'attribute_value_id', 'id', 'id');
    }

    public function attributeValuesByAttributeId(): BelongsToMany
    {
        return $this->belongsToMany(AttributeValueModel::class, 'category_attribute_values', 'attribute_id', 'attribute_value_id', 'attribute_id', 'id');
    }

    public function categoryAttributeValues(): HasMany
    {
        return $this->hasMany(CategoryAttributeValueModel::class, 'attribute_id', 'attribute_id');
    }


}
