<?php

namespace App\Traits;

use Illuminate\Http\JsonResponse;

trait HttpResponses
{
    protected function success($data = null, $code = 200): JsonResponse
    {
        return response()->json($data, $code);
    }

    protected function error($data = null,  $code = 500): JsonResponse
    {
        return response()->json($data, $code);
    }
}
