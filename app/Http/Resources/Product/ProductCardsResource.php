<?php

namespace App\Http\Resources\Product;

use App\Models\ProductModel;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductCardsResource extends JsonResource
{
    public function toArray($request): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'price' => $this->price,
            'frontImage' => url($this->frontImage->path),
        ];
    }
}
