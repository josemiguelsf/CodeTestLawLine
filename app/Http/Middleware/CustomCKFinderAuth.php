<?php

namespace App\Http\Middleware;

use Closure;

class CustomCKFinderAuth
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    /* public function handle($request, Closure $next)
    {
        return $next($request);
    } */
	public function handle($request, Closure $next)
{
    config(['ckfinder.authentication' => function() {
        return true;
    }]); 
	//$config['authentication'] = '\App\Http\Middleware\CustomCKFinderAuth';
    return $next($request);
}
}
