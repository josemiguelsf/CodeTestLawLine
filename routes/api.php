<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
Route::post('/saveUser', 'HomeController@saveUser');
Route::get('/getUsers', 'HomeController@getUsers');
Route::get('/deleteUser', 'HomeController@deleteUser');
Route::get('/getRoles', 'HomeController@getRoles');
Route::post('/saveProduct', 'ProductController@saveProduct');
Route::get('/getProducts', 'ProductController@getProducts');
Route::get('/deleteProduct', 'ProductController@deleteProduct');
Route::post('/saveSubscription', 'SubscriptionController@saveSubscription');
Route::get('/getSubscriptions', 'SubscriptionController@getSubscriptions');
Route::get('/deleteSubscription', 'SubscriptionController@deleteSubscription');
Route::post('/login', 'HomeController@login');