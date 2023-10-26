<?php

namespace App\Http\Middleware;

use App\Providers\RouteServiceProvider;
use App\Traits\HttpResponses;
use Closure;
use Dflydev\DotAccessData\Data;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class ApiAuthenticate
{
    use HttpResponses;

    /**
     * Handle an incoming request.
     *
     * @param \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response) $next
     */
    public function handle(Request $request, Closure $next, string $guard = 'sanctum'): mixed
    {
        if (Auth::guard($guard)->check()) {
            return $next($request);
        }

        return $this->error('Пользователь не авторизирован', 401);
    }
}
