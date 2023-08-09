<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CategoryAdditionalInformation extends Model
{
    use HasFactory;

    protected $table = 'category_additional_information';

    protected $fillable = [
        'image',
        'icon',
    ];
    public $timestamps = false;
}
