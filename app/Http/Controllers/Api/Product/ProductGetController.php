<?php

namespace App\Http\Controllers\Api\Product;

use App\Http\Resources\Product\ProductResource;
use App\Models\ProductModel;
use Illuminate\Http\JsonResponse;

class ProductGetController extends BaseController
{
    public function __invoke(ProductModel $product): JsonResponse
    {
        return $this->success(new ProductResource($product));
    }
}
