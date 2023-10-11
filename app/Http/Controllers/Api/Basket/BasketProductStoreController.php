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
        $product = ProductModel::query()->findOrFail($request->productId);
        $user = auth('sanctum')->user();
        if (auth('sanctum')->check() && !$user->basketProducts->find($product->id)) {
            $user->basketProducts()->attach($product->id);
            $user->refresh();
            $product = new ProductBasketResource($user->basketProducts->where('id', $product->id)->first());
            return $this->success($product);
        }
        return $this->success(new ProductBasketResource($product));
    }
}
