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

//Vehiculos
Route::get('vehiculos','App\Http\Controllers\VehiculoController@index');
Route::get('vehiculos/{id}','App\Http\Controllers\VehiculoController@show');
Route::post('vehiculos/add','App\Http\Controllers\VehiculoController@store');
Route::put('vehiculos/edit/{id}','App\Http\Controllers\VehiculoController@update');
Route::delete('vehiculos/delete/{id}','App\Http\Controllers\VehiculoController@destroy');

//Servicios
Route::get('servicios','App\Http\Controllers\ServiciosController@index');
Route::get('servicios/{id}','App\Http\Controllers\ServiciosController@show');
Route::post('servicios/add','App\Http\Controllers\ServiciosController@store');
Route::put('servicios/edit/{id}','App\Http\Controllers\ServiciosController@update');
Route::delete('servicios/delete/{id}','App\Http\Controllers\ServiciosController@destroy');

//Mecanicos
Route::get('mecanicos','App\Http\Controllers\MecanicoController@index');
Route::get('mecanicos/{id}','App\Http\Controllers\MecanicoController@show');
Route::post('mecanicos/add','App\Http\Controllers\MecanicoController@store');
Route::put('mecanicos/edit/{id}','App\Http\Controllers\MecanicoController@update');
Route::delete('mecanicos/delete/{id}','App\Http\Controllers\MecanicoController@destroy');


//TipoUsuarios
Route::get('tipoUsuarios','App\Http\Controllers\TipoUsuarioController@index');
Route::get('tipoUsuarios/{id}','App\Http\Controllers\TipoUsuarioController@show');
Route::post('tipoUsuarios/add','App\Http\Controllers\TipoUsuarioController@store');
Route::put('tipoUsuarios/edit/{id}','App\Http\Controllers\TipoUsuarioController@update');
Route::delete('tipoUsuarios/delete/{id}','App\Http\Controllers\TipoUsuarioController@destroy');

//Usuarios
Route::get('usuarios','App\Http\Controllers\UsuarioController@index');
Route::get('usuarios/{id}','App\Http\Controllers\UsuarioController@show');
Route::post('usuarios/add','App\Http\Controllers\UsuarioController@store');
Route::put('usuarios/edit/{id}','App\Http\Controllers\UsuarioController@update');
Route::delete('usuarios/delete/{id}','App\Http\Controllers\UsuarioController@destroy');

//Repuestos
Route::get('repuestos','App\Http\Controllers\RepuestoController@index');
Route::get('repuestos/{id}','App\Http\Controllers\RepuestoController@show');
Route::post('repuestos/add','App\Http\Controllers\RepuestoController@store');
Route::put('repuestos/edit/{id}','App\Http\Controllers\RepuestoController@update');
Route::delete('repuestos/delete/{id}','App\Http\Controllers\RepuestoController@destroy');
