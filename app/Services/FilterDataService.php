<?php

namespace App\Services;

use App\Models\CategoryAttributeModel;
use function Laravel\Prompts\select;

class FilterDataService
{

    function getFilters($categoriesIds, $allQueryParams, $filterQuery)
    {
        $filters = CategoryAttributeModel::query()
            ->whereIn('category_id', $categoriesIds)
            ->select('category_attributes.attribute_id', 'attribute_types.type', 'title', 'slug')
            ->distinct()
            ->join('attributes', 'category_attributes.attribute_id', '=', 'attributes.id')
            ->join('attribute_types', 'attributes.id', '=', 'attribute_types.attribute_id')
            ->limit(15)
            ->get()
            ->filter(function ($item) use ($allQueryParams, $categoriesIds, $filterQuery) {
                $currentAttributeValues = [];
                $filterQuery->setQueryParams($allQueryParams->reject(
                    function ($param) use ($item, &$currentAttributeValues) {
                        if ($param['attribute'] == $item->attribute_id) {
                            $currentAttributeValues = explode("ZZ", $param['values']);
                            return true;
                        }
                    })->values());

                $item = $item->load(['attributeValuesByAttributeId' => function ($query) use ($item, $categoriesIds, $filterQuery, $currentAttributeValues) {
                    $query->whereIn('category_id', $categoriesIds)
                        ->withCount(['products' => function ($query) use ($item, $categoriesIds, $filterQuery) {
                            $query->whereIn('category_id', $categoriesIds)->where('attribute_id', $item->attribute_id)->filter($filterQuery);
                        }]);
                }]);
                $item->filteredCategoryAttributeValues = $item->attributeValuesByAttributeId->filter(function ($item) use ($currentAttributeValues) {
                    return ($item->products_count || in_array($item->id, $currentAttributeValues));
                })->values();
                unset($item->attributeValuesByAttributeId);
                return $item->filteredCategoryAttributeValues->isNotEmpty();
            })->values();
        return $filters;
    }
}
