<?php

namespace App\Http\Controllers\Api\User\Catalog;

use App\Http\Controllers\Controller;
use App\Http\Resources\Category\CategoryResource;
use App\Models\CategoryModel;
use App\Traits\HttpResponses;
use Illuminate\Http\JsonResponse;

class CatalogController extends Controller
{
    use HttpResponses;

    public function __invoke(): JsonResponse
    {
        /*$catalog = Redis::get('catalog');
        if (!empty($catalog)) {
            return $this->success(CategoryResource::collection(unserialize($catalog)));
        }*/

        $catalog = CategoryModel::query()->where('depth', 0)->with('childrenCategories.childrenCategories')->get();
//        Redis::set('catalog', serialize($catalog));
        return $this->success(CategoryResource::collection($catalog));
    }
}
