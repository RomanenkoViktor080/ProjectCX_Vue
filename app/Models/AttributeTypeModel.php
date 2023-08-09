<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AttributeTypeModel extends Model
{
    use HasFactory;

    protected $table = "attribute_types";

    protected $fillable = [
      'type'
    ];

    public $timestamps = false;
}
