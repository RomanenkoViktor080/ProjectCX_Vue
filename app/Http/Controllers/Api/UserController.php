<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use App\Traits\HttpResponses;
use Illuminate\Http\JsonResponse;

class UserController extends Controller
{
    use HttpResponses;

    public function __invoke(): JsonResponse
    {
        return $this->success(auth('sanctum')->check());
    }
}
