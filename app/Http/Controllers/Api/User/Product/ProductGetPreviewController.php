<?php

namespace App\Http\Controllers\Api\User\Product;

use App\Http\Controllers\Controller;
use App\Http\Resources\Product\ProductPreviewResource;
use App\Models\ProductModel;
use App\Traits\HttpResponses;
use Illuminate\Http\JsonResponse;

class ProductGetPreviewController extends Controller
{
    use HttpResponses;
    public function __invoke(ProductModel $product): JsonResponse
    {
        return $this->success(new ProductPreviewResource($product));
    }
}
