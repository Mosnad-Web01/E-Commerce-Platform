<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class RoleMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next)
    {
        $user = $request->user(); // Get the authenticated user

        if (!$user) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        // Redirect based on role
        switch ($user->role_id) {
            case 1: // Admin
                return redirect('/admin/dashboard');
            case 2: // Vendor
                return redirect('/vendor/home');
            case 3: // Customer 
                return redirect('/customer/home');
            default:
                return response()->json(['error' => 'Forbidden: Role not allowed'], 403);
        }

        return $next($request);
    }
}