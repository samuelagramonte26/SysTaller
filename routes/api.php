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
Route::post('taller/edit/{id}','App\Http\Controllers\tallerController@update');
Route::delete('taller/delete/{id}','App\Http\Controllers\tallerController@destroy');

//Cliente
Route::get('cliente','App\Http\Controllers\ClienteController@index');
Route::get('cliente/{id}','App\Http\Controllers\ClienteController@show');
Route::post('cliente/add','App\Http\Controllers\ClienteController@store');
Route::post('cliente/edit/{id}','App\Http\Controllers\ClienteController@update');
Route::delete('cliente/delete/{id}','App\Http\Controllers\ClienteController@destroy');

//Vehiculos
Route::get('vehiculos','App\Http\Controllers\VehiculoController@index');
Route::get('vehiculos/{id}','App\Http\Controllers\VehiculoController@show');
Route::post('vehiculos/add','App\Http\Controllers\VehiculoController@store');
Route::post('vehiculos/edit/{id}','App\Http\Controllers\VehiculoController@update');
Route::delete('vehiculos/delete/{id}','App\Http\Controllers\VehiculoController@destroy');

//Servicios
Route::get('servicios','App\Http\Controllers\ServiciosController@index');
Route::get('servicios/{id}','App\Http\Controllers\ServiciosController@show');
Route::post('servicios/add','App\Http\Controllers\ServiciosController@store');
Route::post('servicios/edit/{id}','App\Http\Controllers\ServiciosController@update');
Route::delete('servicios/delete/{id}','App\Http\Controllers\ServiciosController@destroy');

//Mecanicos
Route::get('mecanicos','App\Http\Controllers\MecanicoController@index');
Route::get('mecanicos/{id}','App\Http\Controllers\MecanicoController@show');
Route::post('mecanicos/add','App\Http\Controllers\MecanicoController@store');
Route::post('mecanicos/edit/{id}','App\Http\Controllers\MecanicoController@update');
Route::delete('mecanicos/delete/{id}','App\Http\Controllers\MecanicoController@destroy');


//TipoUsuarios
Route::get('tipoUsuarios','App\Http\Controllers\TipoUsuarioController@index');
Route::get('tipoUsuarios/{id}','App\Http\Controllers\TipoUsuarioController@show');
Route::post('tipoUsuarios/add','App\Http\Controllers\TipoUsuarioController@store');
Route::post('tipoUsuarios/edit/{id}','App\Http\Controllers\TipoUsuarioController@update');
Route::delete('tipoUsuarios/delete/{id}','App\Http\Controllers\TipoUsuarioController@destroy');

//Usuarios
Route::get('usuarios','App\Http\Controllers\UsuarioController@index');
Route::get('usuarios/{id}','App\Http\Controllers\UsuarioController@show');
Route::post('usuarios/add','App\Http\Controllers\UsuarioController@store');
Route::post('usuarios/edit/{id}','App\Http\Controllers\UsuarioController@update');
Route::delete('usuarios/delete/{id}','App\Http\Controllers\UsuarioController@destroy');

//Repuestos
Route::get('repuestos','App\Http\Controllers\RepuestoController@index');
Route::get('repuestos/{id}','App\Http\Controllers\RepuestoController@show');
Route::post('repuestos/add','App\Http\Controllers\RepuestoController@store');
Route::post('repuestos/edit/{id}','App\Http\Controllers\RepuestoController@update');
Route::delete('repuestos/delete/{id}','App\Http\Controllers\RepuestoController@destroy');

//CategoriaPRoductos
Route::get('categoriaProductos','App\Http\Controllers\CategoriaProductoController@index');
Route::get('categoriaProductos/{id}','App\Http\Controllers\CategoriaProductoController@show');
Route::post('categoriaProductos/add','App\Http\Controllers\CategoriaProductoController@store');
Route::post('categoriaProductos/edit/{id}','App\Http\Controllers\CategoriaProductoController@update');
Route::delete('categoriaProductos/delete/{id}','App\Http\Controllers\CategoriaProductoController@destroy');

//productos
Route::get('producto','App\Http\Controllers\ProductoController@index');
Route::get('producto/{id}','App\Http\Controllers\ProductoController@show');
Route::post('producto/add','App\Http\Controllers\ProductoController@store');
Route::post('producto/edit/{id}','App\Http\Controllers\ProductoController@update');
Route::delete('producto/delete/{id}','App\Http\Controllers\ProductoController@destroy');

//Reparacion  
Route::get('reparacion','App\Http\Controllers\ReparacionController@index');
Route::get('reparacionChequeo','App\Http\Controllers\ReparacionController@showChequeo');
Route::get('reparacionMecanicos','App\Http\Controllers\ReparacionController@showMecanicos');
Route::get('vehiculoCliente/{id}','App\Http\Controllers\ReparacionController@showVehiculoCliente');
Route::get('reparacionTerminadas','App\Http\Controllers\ReparacionController@terminadas');
Route::get('reparacion/{id}','App\Http\Controllers\ReparacionController@show');
Route::post('reparacion/add','App\Http\Controllers\ReparacionController@store');
Route::post('reparacion/edit/{id}','App\Http\Controllers\ReparacionController@update');
Route::delete('reparacion/delete/{id}','App\Http\Controllers\ReparacionController@destroy');

//DetalleReparacion
Route::get('terminarReparacion/{id}','App\Http\Controllers\DetalleReparacionController@terminarReparacion');
Route::get('detalleReparacion/{id}','App\Http\Controllers\DetalleReparacionController@show');
Route::post('detalleReparacion/add','App\Http\Controllers\DetalleReparacionController@store');
Route::post('detalleReparacion/edit/{id}','App\Http\Controllers\DetalleReparacionController@update');
Route::delete('detalleReparacion/delete/{id}','App\Http\Controllers\DetalleReparacionController@destroy');

//MecanicoReparacion
Route::get('mecanicoReparacion','App\Http\Controllers\MecanicoReparacionController@index');
Route::get('mecanicoReparacion/{id}','App\Http\Controllers\MecanicoReparacionController@show');
Route::post('mecanicoReparacion/add','App\Http\Controllers\MecanicoReparacionController@store');
Route::post('mecanicoReparacion/edit/{id}','App\Http\Controllers\MecanicoReparacionController@update');
Route::delete('mecanicoReparacion/delete/{id}','App\Http\Controllers\MecanicoReparacionController@destroy');

//Facturacion
Route::get('facturacion','App\Http\Controllers\FacturacionController@index');
Route::get('facturacion/{id}','App\Http\Controllers\FacturacionController@show');
Route::post('facturacion/add/{id}','App\Http\Controllers\FacturacionController@store');
Route::post('facturacion/edit/{id}','App\Http\Controllers\FacturacionController@update');
Route::delete('facturacion/delete/{id}','App\Http\Controllers\FacturacionController@destroy');