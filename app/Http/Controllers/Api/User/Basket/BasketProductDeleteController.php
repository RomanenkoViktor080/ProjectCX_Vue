<?php

namespace App\Http\Controllers\Api\User\Basket;

use App\Http\Controllers\Controller;
use App\Models\ProductModel;
use App\Traits\HttpResponses;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;

class BasketProductDeleteController extends Controller
{
    use HttpResponses;

    public function __invoke(ProductModel $product): Response|JsonResponse
    {
        if (auth('sanctum')->user()->basketProducts()->where('product_id', $product->id)->exists()) {
            $product->delete();
            return response()->noContent();
        }
        return $this->error('Product not found', 401);
    }
}
