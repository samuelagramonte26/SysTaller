<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

//Rutas.

//Taller
Route::get('taller','App\Http\Controllers\tallerController@index');
Route::get('taller/{id}','App\Http\Controllers\tallerController@show');
Route::post('taller/add','App\Http\Controllers\tallerController@store');
Route::put('taller/edit/{id}','App\Http\Controllers\tallerController@update');
Route::delete('taller/delete/{id}','App\Http\Controllers\tallerController@destroy');

//Cliente
Route::get('cliente','App\Http\Controllers\ClienteController@index');
Route::get('cliente/{id}','App\Http\Controllers\ClienteController@show');
Route::post('cliente/add','App\Http\Controllers\ClienteController@store');
Route::put('cliente/edit/{id}','App\Http\Controllers\ClienteController@update');
Route::delete('cliente/delete/{id}','App\Http\Controllers\ClienteController@destroy');