<?php

namespace App\Http\Controllers\Api\Basket;

use App\Http\Resources\Product\ProductBasketResource;
use App\Models\ProductModel;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class BasketProductStoreController extends BaseController
{
    public function __invoke(Request $request): JsonResponse
    {
        $user = auth('sanctum')->user();
        if (auth('sanctum')->check() && !$user->basketProducts->find($request->productId)) {
            $user->basketProducts()->attach($request->productId);
            $user->refresh();
            $product = new ProductBasketResource($user->basketProducts->where('id', $request->productId)->first());
            return $this->success($product);
        }
        $product = new ProductBasketResource(ProductModel::query()->findOrFail($request->productId));
        return $this->success($product);
    }
}
