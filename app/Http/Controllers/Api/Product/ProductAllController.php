<?php

namespace App\Http\Controllers\Api\Product;

use App\Http\Resources\Product\ProductCardsResource;
use App\Models\ProductModel;
use Illuminate\Http\JsonResponse;

class ProductAllController extends BaseController
{
    public function __invoke(): JsonResponse
    {
        $products = ProductModel::query()->with('frontImage')->get();
        return $this->success(ProductCardsResource::collection($products));
    }
}
