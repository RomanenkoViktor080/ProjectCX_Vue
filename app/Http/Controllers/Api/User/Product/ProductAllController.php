<?php

namespace App\Http\Controllers\Api\User\Product;

use App\Http\Controllers\Controller;
use App\Http\Resources\Product\ProductCardsResource;
use App\Models\ProductModel;
use App\Traits\HttpResponses;
use Illuminate\Http\JsonResponse;

class ProductAllController extends Controller
{
    use HttpResponses;

    public function __invoke(): JsonResponse
    {
        $products = ProductModel::query()->with('frontImage')->get();
        return $this->success(ProductCardsResource::collection($products));
    }
}
