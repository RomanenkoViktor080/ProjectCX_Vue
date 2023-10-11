<?php

namespace App\Http\Controllers\Api\Basket;

use App\Models\BasketProductModel;
use App\Models\ProductModel;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;

class BasketProductDeleteController extends BaseController
{
    public function __invoke(ProductModel $product): Response|JsonResponse
    {
        if (auth('sanctum')->user()->basketProducts()->where('product_id', $product->id)->exists()) {
            $product->delete();
            return response()->noContent();
        }
        return $this->error('Product not found', '', 401);
    }
}
