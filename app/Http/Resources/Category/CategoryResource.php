<?php

namespace App\Http\Resources\Category;

use App\Models\CategoryModel;
use Illuminate\Http\Resources\Json\JsonResource;

class CategoryResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param \Illuminate\Http\Request $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */

    public function toArray($request): array
    {

        return [
            'id' => $this->id,
            'title' => $this->title,
            'category_id' => $this->category_id,
            'slug' => $this->slug,
            'childrenCategories' => $this->depth < 2 ? CategoryResource::collection($this->childrenCategories) : [],
        ];
    }
}
