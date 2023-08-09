<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\UserLoginRequest;
use App\Http\Requests\UserRegisterRequest;
use App\Models\User;
use App\Traits\HttpResponses;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;


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
            'password' => Hash::make($data['password']),
        ]);
        Auth::login($user, $data['remember']);
        $token = $user->createToken('AuthToken')->plainTextToken;
//        event(new Registered($user));
        return $this->success([
            'email' => $user->email,
            'lifetime' => $data['remember'] ? 60 * 60 * 24 * 30 : null,
            'token' => $token,
        ]);
    }

    public function login(UserLoginRequest $request): JsonResponse
    {
        $data = $request->validated();
        if (!Auth::attempt($request->only(['email', 'password']), true)) {
            return response()->json(['errors' => ['email' => ['Email или пароль введены неправильно!']]], 422);
        }
        $user = User::query()->where('email', $data['email'])->first();
        $token = $user->createToken('AuthToken')->plainTextToken;
        return $this->success([
            'email' => $user->email,
            'lifetime' => $data['remember'] ? 60 * 60 * 24 * 30 : null,
            'token' => $token,
        ]);
    }


    public function logout(Request $request)
    {
        auth("sanctum")->user()->currentAccessToken()->delete();
        return response()->noContent();
    }

}
