<?php

namespace App\Http\Controllers\Api\Product;

use App\Http\Resources\Product\ProductPreviewResource;
use App\Models\ProductModel;
use Illuminate\Http\JsonResponse;

class ProductGetPreviewController extends BaseController
{
    public function __invoke(ProductModel $product): JsonResponse
    {
        return $this->success(new ProductPreviewResource($product));
    }
}
