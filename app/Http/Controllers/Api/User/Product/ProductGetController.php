<?php

namespace App\Http\Controllers\Api\User\Product;

use App\Http\Controllers\Controller;
use App\Http\Resources\Product\ProductResource;
use App\Models\ProductModel;
use App\Traits\HttpResponses;
use Illuminate\Http\JsonResponse;

class ProductGetController extends Controller
{
    use HttpResponses;

    public function __invoke(ProductModel $product): JsonResponse
    {
        $product->load(['images', 'productAttributes' => function ($q) {
            $q->join('attribute_values', 'attribute_values.id', '=', 'product_attributes.attribute_value_id')
                ->join('attributes', 'attributes.id', '=', 'product_attributes.attribute_id');
        }]);
        $product->characteristics = $product->productAttributes;
        unset($product->productAttributes);
        return $this->success(new ProductResource($product));
    }
}
