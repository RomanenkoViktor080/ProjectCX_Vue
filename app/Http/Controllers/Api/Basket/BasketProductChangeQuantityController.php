<?php

namespace App\Http\Controllers\Api\Basket;

use App\Http\Resources\Product\ProductBasketResource;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class BasketProductChangeQuantityController extends BaseController
{
    public function __invoke($productId, Request $request): JsonResponse
    {
        $user = auth('sanctum')->user();
        $user->basketProducts()->updateExistingPivot($productId, ['quantity' => $request->quantity]);
        $updatedProduct = new ProductBasketResource($user->basketProducts->where('id', $productId)->first());
        return $this->success($updatedProduct);
    }
}
