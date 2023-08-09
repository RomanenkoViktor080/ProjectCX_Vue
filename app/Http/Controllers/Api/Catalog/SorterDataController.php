<?php

namespace App\Http\Controllers\Api\Catalog;

use App\Helpers\Constants;
use App\Http\Controllers\Controller;
use App\Traits\HttpResponses;
use Illuminate\Http\JsonResponse;

class SorterDataController extends Controller
{
    use HttpResponses;

    public function __invoke(): JsonResponse
    {
        $sorterData = Constants::$sorterData;
        return $this->success($sorterData);
    }
}
