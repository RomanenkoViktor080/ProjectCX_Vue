<?php

namespace App\Http\Controllers\Api\User\Basket;

use App\Http\Controllers\Controller;
use App\Http\Resources\Product\ProductBasketResource;
use App\Models\ProductModel;
use App\Traits\HttpResponses;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class BasketProductGetController extends Controller
{
    use HttpResponses;

    public function __invoke(Request $request): JsonResponse
    {
        $products = [];
        if (auth('sanctum')->check()) {
            $products = auth('sanctum')->user()->basketProducts()->with('frontImage')->get();
            return $this->success(ProductBasketResource::collection($products));
        } else if (isset($request->products) && !auth('sanctum')->check()) {
            $products = ProductModel::query()->with('frontImage')->whereIn('id', array_column($request->products, 'id'))->get();
            $requestProductsInfo = collect($request->products);

            foreach ($products as $product) {
                $requestProduct = $requestProductsInfo->firstWhere('id', $product->id);
                if ($requestProduct) {
                    $quantity = $requestProduct['quantity'];
                    $product->quantity = $quantity;
                }
            }
        }

        return $this->success(ProductBasketResource::collection($products));
    }
}
