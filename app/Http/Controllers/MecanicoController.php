<?php

namespace App\Http\Controllers;

use App\Models\Mecanicos;
use Illuminate\Http\Request;

class MecanicoController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        $mecanicos = Mecanicos::active()->get();
        return response()->json($mecanicos,200);
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
            "apellido" => "required",
            "cedula"=>"required",
            "fechaNacimiento"=>"required"
        ];
        $messages = [
            "nombre.required" => "El nombre es requerido",
            "apellido.required" => "El apellido es requerido",
            "cedula.required"=>"La cedula es requerida",
            "fechaNacimiento.required"=>"La fecha de nacimiento es requerida"
        ];
        $validador = validator($request->all(), $rules, $messages);
        if ($validador->fails())
            return response()->json($validador->errors()->all(), 200);
        else {
        $mecanico = Mecanicos::create($request->only('nombre','apellido','fechaNacimiento','cedula','usuarioCreador','fechaCreado'));
        return response()->json(["Mensaje"=>"Registrado correctamente.","data"=>$mecanico,"estado"=>true],200);
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
        $mecanico = Mecanicos::find($id);
        if (is_null($mecanico) || $mecanico->active == 0)
            return response()->json(["Mensaje" => "No se encontro ningun registro.", "estado" => false], 404);
        else
            return response()->json($mecanico, 200);
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
        $mecanico = Mecanicos::find($id);
        if (is_null($mecanico))
        return response()->json(["Mensaje" => "No se encontro ningun registro.", "estado" => false], 404);
    else {
        $rules = [
            "nombre" => "required",
            "apellido" => "required",
            "cedula"=>"required",
            "fechaNacimiento"=>"required"
        ];
        $messages = [
            "nombre.required" => "El nombre es requerido",
            "apellido.required" => "El apellido es requerido",
            "cedula.required"=>"La cedula es requerida",
            "fechaNacimiento.required"=>"La fecha de nacimiento es requerida"
        ];
        $validador = validator($request->all(), $rules, $messages);
        if ($validador->fails())
            return response()->json($validador->errors()->all(), 200);
        else {
        $mecanico->update($request->all());
        return response()->json(["Mensaje"=>"Modificado correctamente.","data"=>$mecanico,"estado"=>true],200);
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
        $mecanico = Mecanicos::find($id);
        if (is_null($mecanico))
            return response()->json(["Mensaje" => "No se encontro ningun registro.", "estado" => false], 404);
        else {
            $mecanico->active = 0;
            $mecanico->save();
            return response()->json(["Mensaje" => "Eliminado correctamente.", "data" => $mecanico, "estado" => true], 200);
        }
    }
}
