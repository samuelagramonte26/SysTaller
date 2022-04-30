<?php

namespace App\Http\Controllers;

use App\Models\Servicios;
use Illuminate\Http\Request;

class ServiciosController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        $servicios = Servicios::active()->get();
        return response()->json($servicios, 200);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
        $rules = [
            "nombre" => "required",
            "descripcion" => "required",
            "fechaCreado" => "required"
        ];
        $messages = [
            "nombre.required" => "El nombre es requerido.",
            "descripcion.required" => "La descripcion es requerida",
            "fechaCreado.required" => "La fecha es requerida"
        ];
        $validador = validator($request->all(), $rules, $messages);
        if ($validador->fails())
            return response()->json($validador->errors()->all(), 200);
        else {
            $servicio = Servicios::create($request->only('nombre','descripcion','usuarioCreador','fechaCreado'));
            return response()->json(["Mensaje"=>"Registrado correctamente","data"=>$servicio],200);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
        $servicio = Servicios::find($id);
        if (is_null($servicio) || $servicio->active == 0)
            return response()->json(["Mensaje" => "No se encontro ningun registro.", "estado" => false], 404);
        else
            return response()->json($servicio, 200);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
        $servicio = Servicios::find($id);
        if (is_null($servicio))
            return response()->json(["Mensaje" => "No se encontro ningun registro.", "estado" => false], 404);
        else{
        $rules = [
            "nombre" => "required",
            "descripcion" => "required",
            "fechaEditado" => "required"
        ];
        $messages = [
            "nombre.required" => "El nombre es requerido.",
            "descripcion.required" => "La descripcion es requerida",
            "fechaCreado.required" => "La fecha es requerida"
        ];
        $validador = validator($request->all(), $rules, $messages);
        if ($validador->fails())
            return response()->json($validador->errors()->all(), 200);
        else {
            $servicio->update($request->all());
            $servicio->save();
            return response()->json(["Mensaje"=>"Modificado correctamente","data"=>$servicio],200);
        }
    }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
        $servicio = Servicios::find($id);
        if (is_null($servicio))
            return response()->json(["Mensaje" => "No se encontro ningun registro.", "estado" => false], 404);
        else {
            $servicio->active = 0;
            $servicio->save();
            return response()->json(["Mensaje" => "Eliminado correctamente.", "data" => $servicio, "estado" => true], 200);
        }
    }
}
