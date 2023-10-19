<?php

namespace App\Http\Resources\Filter;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class FilterResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return isset($this->attribute) ?
            [
                'id' => $this->attribute_id,
                'title' => $this->title,
                'slug' => $this->slug,
                'type' => $this->type,
                'values' => FilterValueResource::collection($this->filteredCategoryAttributeValues),
            ] :
            [
                'title' => $this['title'],
                'slug' => $this['slug'],
                'type' => 2,
                'values' => $this['range'],
            ];
    }
}
