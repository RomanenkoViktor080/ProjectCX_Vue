<?php

namespace App\Services;

use App\Models\CategoryAttributeModel;

class FilterDataService
{

    function getFilters($categoriesIds, $allQueryParams, $filterQuery)
    {
        $filters = CategoryAttributeModel::query()
            ->whereIn('category_id', $categoriesIds)->select('attribute_id')->distinct()
            ->with(['attribute.attributeType'])
            ->limit(10)
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

                $item = $item->load(['categoryAttributeValues' => function ($query) use ($item, $categoriesIds, $filterQuery, $currentAttributeValues) {
                    $query->select('attribute_value_id', 'attribute_id')->whereIn('category_id', $categoriesIds)->distinct()
                        ->with('attributeValue', function ($query) use ($item, $categoriesIds, $filterQuery, $currentAttributeValues) {
                            $query->withCount(['products' => function ($query) use ($item, $categoriesIds, $filterQuery) {
                                $query->whereIn('category_id', $categoriesIds)->where('attribute_id', $item->attribute_id)->filter($filterQuery);
                            }]);
                        });
                }]);
                $item->filteredCategoryAttributeValues = $item->categoryAttributeValues->filter(function ($item) use ($currentAttributeValues) {

                    return ($item->attributeValue->products_count || in_array($item->attributeValue->id, $currentAttributeValues));
                })->values();
                return $item->filteredCategoryAttributeValues->isNotEmpty();
            })->values();
        return $filters;
    }
}
