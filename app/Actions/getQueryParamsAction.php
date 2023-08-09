<?php

namespace App\Actions;

use App\Models\CategoryAttributeModel;

class getQueryParamsAction
{
    public function handle($categoriesIds, $request)
    {
        $queryParams = CategoryAttributeModel::query()
            ->whereIn('category_id', $categoriesIds)->select('attribute_id')->distinct()
            ->withWhereHas('attribute', function ($query) use ($request) {
                $query->whereIn('slug', $request->keys())->with('attributeType');
            })->get()->pluck('attribute');
        return $queryParams->map(function ($attribute) use ($request) {
            return [
                'attribute' => $attribute->id,
                'values' => $request[$attribute->slug],
                'type' => $attribute->attributeType->type,
            ];
        });
    }
}
