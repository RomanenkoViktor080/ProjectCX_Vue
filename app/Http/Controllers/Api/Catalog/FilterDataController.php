<?php

namespace App\Http\Controllers\Api\Catalog;

use App\Actions\getCategoryTreeIdsAction;
use App\Actions\getQueryParamsAction;
use App\Http\Controllers\Api\Product\BaseController;
use App\Http\Filters\ProductFilter;
use App\Http\Resources\Filter\FilterResource;
use App\Models\CategoryModel;
use App\Models\ProductModel;
use App\Services\FilterDataService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class FilterDataController extends BaseController
{


    public function __invoke($category, Request $request, FilterDataService $filterDataService, getCategoryTreeIdsAction $categoryIdsAction, getQueryParamsAction $getQueryParamsAction): JsonResponse
    {
        $categories = CategoryModel::query()->where('slug', $category)->select('id')->with('allChildrenCategories')->get();

        if ($categories->isEmpty()) {
            return $this->error("Category not found", null, 404);
        }

        $categoriesIds = $categoryIdsAction->handle($categories);

        $allQueryParams = $getQueryParamsAction->handle($categoriesIds, $request);

        if ($request->price) {
            $allQueryParams->push(['attribute' => 'price', 'values' => $request->price, 'type' => 2]);
        }

        $filterQuery = app()->make(ProductFilter::class,
            ['queryParams' => $allQueryParams]);

        $priceRange = ProductModel::whereIn('category_id', $categoriesIds)->filter($filterQuery)->selectRaw('MIN(price) as min, MAX(price) as max')->first();

        $filters = $filterDataService->getFilters($categoriesIds, $allQueryParams, $filterQuery);

        $filters->push(collect(['title' => 'Цена', 'slug' => 'price', 'range' => $priceRange]));
        return $this->success(FilterResource::collection($filters));
    }
}
