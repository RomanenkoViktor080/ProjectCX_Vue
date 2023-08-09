<?php

namespace App\Http\Resources\Filter;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class FilterValueResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
        'id' => $this->attributeValue->id,
        'value' => $this->attributeValue->value,
        'productCount' => $this->attributeValue->products_count,
        ];
    }
}
