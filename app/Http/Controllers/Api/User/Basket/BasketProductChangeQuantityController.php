<?php

namespace App\Http\Controllers\Api\User\Basket;

use App\Http\Controllers\Controller;
use App\Http\Resources\Product\ProductBasketResource;
use App\Models\ProductModel;
use App\Traits\HttpResponses;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class BasketProductChangeQuantityController extends Controller
{
    use HttpResponses;
    public function __invoke(ProductModel $product, Request $request): JsonResponse
    {
        $user = auth('sanctum')->user();
        if ($user->basketProducts()->where('product_id', $product->id)->exists() && $request->quantity) {
            $user->basketProducts()->updateExistingPivot($product->id, ['quantity' => $request->quantity]);
            $updatedProduct = new ProductBasketResource($user->basketProducts->where('id', $product->id)->first());
            return $this->success($updatedProduct);
        }
        return $this->error('Product not found', '', 404);
    }
}
