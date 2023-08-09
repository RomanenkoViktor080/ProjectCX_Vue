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
        if (auth('sanctum')->check()) {
            $user = auth('sanctum')->user();
            return $this->success(new UserResource($user));
        }
        return $this->error(null, "Пользователь не авторизирован", 401);
    }
}
