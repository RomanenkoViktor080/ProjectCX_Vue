<?php

namespace App\Models;

use App\Helpers\Constants;
use App\Http\Filters\FilterInterface;
use App\Traits\Filterable;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;


/**
 */
class ProductModel extends Model
{
    use HasFactory;
    use Filterable;

    protected $table = 'products';
    protected $fillable = [
        'title',
        'category_id',
        'price',
        'description',
        'category_id',
    ];

    public function scopeSorter(Builder $builder, $param): Builder
    {
        if ($param == 'priceUp') {
            $builder->orderBy('price');
        } else if ($param == 'priceDown') {
            $builder->orderByDesc('price');
        }
        return $builder;
    }

    public function category(): BelongsTo
    {
        return $this->belongsTo(CategoryModel::class, 'category_id', 'id');
    }

    public function frontImage(): HasOne
    {
        return $this->hasOne(ProductImageModel::class, 'product_id', 'id')->where('position', 1);
    }

    public function images(): HasMany
    {
        return $this->hasMany(ProductImageModel::class, 'product_id', 'id');
    }

    public function attributes(): BelongsToMany
    {
        return $this->belongsToMany(AttributeModel::class, 'product_attributes', 'product_id', 'attribute_id');
    }

    public function productAttributes(): HasMany
    {
        return $this->hasMany(ProductAttributeModel::class, 'product_id', 'id');
    }
}
