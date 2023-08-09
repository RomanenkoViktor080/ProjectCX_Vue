<?php

namespace App\Http\Controllers\Api\Basket;

use App\Models\BasketProductModel;
use Illuminate\Http\Response;

class BasketProductDeleteController extends BaseController
{
    public function __invoke($productId): Response
    {
        $product = BasketProductModel::query()->where('product_id', $productId);
        if ($product->exists()) {
            $product->delete();
        }
        return response()->noContent();
    }
}
