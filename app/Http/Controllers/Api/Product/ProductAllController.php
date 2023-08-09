<?php

namespace App\Http\Controllers\Api\Product;

use App\Http\Resources\Product\ProductCardsResource;
use App\Models\ProductModel;
use Illuminate\Http\JsonResponse;

class ProductAllController extends BaseController
{
    public function getCardProducts(): JsonResponse
    {
        $products = ProductModel::all();
        return $this->success(ProductCardsResource::collection($products));
    }
}
