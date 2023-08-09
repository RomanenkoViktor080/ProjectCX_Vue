<?php

namespace App\Traits;

use Illuminate\Http\JsonResponse;

trait HttpResponses
{
    protected function success($data = null, $code = 200): JsonResponse
    {
        return response()->json($data, $code);
    }

    protected function error($data = null, $message = null, $code = 500): JsonResponse
    {
        return response()->json([
            'status' => 'Request has occurred',
            'message' => $message,
            'data' => $data,
        ], $code);
    }
}
