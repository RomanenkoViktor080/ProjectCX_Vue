<?php

namespace App\Http\Controllers\Api\User;

use App\Http\Controllers\Controller;
use App\Http\Requests\UserLoginRequest;
use App\Http\Requests\UserRegisterRequest;
use App\Models\User;
use App\Traits\HttpResponses;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;


class AuthenticationController extends Controller
{
    use HttpResponses;

    public function register(UserRegisterRequest $request): JsonResponse
    {
        $data = $request->validated();
        $user = User::query()->firstOrCreate([
            'email' => $data['email']
        ], [
            'email' => $data['email'],
            'password' => bcrypt($data['password']),
        ]);
        $token = $user->createToken('AuthToken')->plainTextToken;
//        event(new Registered($user));
        return $this->success([
            'email' => $user->email,
            'lifetime' => isset($data['remember']) && $data['remember'] ? 60 * 60 * 24 * 30 : null,
            'token' => $token,
        ]);
    }

    public function login(UserLoginRequest $request): JsonResponse
    {
        $data = $request->validated();
        if (!auth()->attempt($request->only(['email', 'password']))) {
            return response()->json(['errors' => ['email' => ['Email или пароль введены неправильно!']]], 401);
        }
        $user = User::query()->where('email', $data['email'])->first();
        $token = $user->createToken('AuthToken')->plainTextToken;
        return $this->success([
            'email' => $user->email,
            'lifetime' => isset($data['remember']) && $data['remember'] ? 60 * 60 * 24 * 30 : null,
            'token' => $token,
        ]);
    }


    public function logout(Request $request): Response
    {
        $request->user("sanctum")->currentAccessToken()->delete();
        return response()->noContent();
    }

    public function check(): JsonResponse
    {
        return $this->success(auth('sanctum')->check());
    }

}
