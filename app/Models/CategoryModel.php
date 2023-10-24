<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class CategoryModel extends Model
{
    use HasFactory;

    protected $table = 'categories';

    protected $fillable = [
        'title',
        'slug',
        'category_id',
    ];

    public $timestamps = false;

    protected static function boot(): void
    {
        parent::boot();

        static::creating(function (CategoryModel $category) {
            $category->slug = $category->slug ?? str($category->title)->slug();
        });
    }

    public function additionalInformation (): HasOne
    {
        return $this->hasOne(CategoryAdditionalInformation::class, 'category_id', 'id');
    }

    public function products(): HasMany
    {
        return $this->hasMany(ProductModel::class, 'category_id', 'id');
    }

    public function childrenCategories(): HasMany
    {
        return $this->hasMany(CategoryModel::class, 'category_id', 'id');
    }

    public function allChildrenCategories(): HasMany
    {
        return $this->hasMany(CategoryModel::class, 'category_id', 'id')->with('allChildrenCategories');
    }

    public function parentCategories(): BelongsTo
    {
        return $this->belongsTo(CategoryModel::class, 'category_id', 'id')->with('parentCategories');
    }

    public function attributes(): BelongsToMany
    {
        return $this->belongsToMany(AttributeModel::class, 'category_attributes', 'category_id', 'attribute_id');
    }
    public function attributeTitlesPivot(): HasMany
    {
        return $this->hasMany(CategoryAttributeModel::class, 'category_id', 'id');
    }
}
