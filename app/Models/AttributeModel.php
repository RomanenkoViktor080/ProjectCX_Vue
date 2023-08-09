<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class AttributeModel extends Model
{
    use HasFactory;

    protected $table = 'attributes';
    protected $fillable = [
        'title',
    ];

    public $timestamps = false;

    protected static function boot(): void
    {
        parent::boot();

        static::creating(function (AttributeModel $attribute) {
            $attribute->slug = $attribute->slug ?? str($attribute->title)->slug();
        });
    }

    public function value(): HasMany
    {
        return $this->hasMany(AttributeValueModel::class, 'attribute_id', 'id');
    }

    public function attributeType(): HasOne
    {
        return $this->hasOne(AttributeTypeModel::class, 'attribute_id', 'id');
    }

}
