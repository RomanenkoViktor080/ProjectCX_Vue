<?php

namespace App\Http\Controllers\Api\User\Product;

use App\Actions\getCategoryTreeIdsAction;
use App\Actions\getQueryParamsAction;
use App\Http\Controllers\Controller;
use App\Http\Filters\ProductFilter;
use App\Http\Resources\Product\ProductCardsResource;
use App\Models\CategoryModel;
use App\Models\ProductModel;
use App\Traits\HttpResponses;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ProductFilterController extends Controller
{

    use HttpResponses;
    public function __invoke($category, Request $request, getCategoryTreeIdsAction $categoryIdsAction, getQueryParamsAction $getQueryParamsAction): JsonResponse
    {
        try {
            $categories = CategoryModel::query()
                ->where('slug', $category)
                ->with('allChildrenCategories')->get();
            if ($categories->isEmpty()) {
                throw new \Exception("Category not found", 404);
            }
            $categoriesIds = $categoryIdsAction->handle($categories);

            $queryParams = $getQueryParamsAction->handle($categoriesIds, $request);
            if ($request->price) {
                $queryParams->push(['attribute' => 'price', 'values' => $request->price, 'type' => 2]);
            }
            $filterQuery = app()->make(ProductFilter::class,
                ['queryParams' => $queryParams]);
            $products = ProductModel::query()->with('frontImage')
                ->whereIn('category_id', $categoriesIds)
                ->filter($filterQuery)
                ->sorter($request->sort)
                ->simplePaginate(20, ['*'], 'page', $request->page ?? 1);
            return $this->success(ProductCardsResource::collection($products));
        } catch (\Exception $exception) {
            return $this->error($exception->getMessage(), '', $exception->getCode());
        }
    }
}
