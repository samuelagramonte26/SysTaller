<?php

namespace App\Http\Controllers;

use App\Models\tipoUsuarios;
use Illuminate\Http\Request;

class TipoUsuarioController extends Controller
{
    public function index()
    {
        //
        $tipo = tipoUsuarios::active()->get();
        return response()->json($tipo, 200);
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
            "tipo" => "required",
            "descripcion" => "required",
            "fechaCreado" => "required"
        ];
        $messages = [
            "tipo.required" => "El nombre es requerido.",
            "descripcion.required" => "La descripcion es requerida",
            "fechaCreado.required" => "La fecha es requerida"
        ];
        $validador = validator($request->all(), $rules, $messages);
        if ($validador->fails())
            return response()->json($validador->errors()->all(), 200);
        else {
            $tipo = tipoUsuarios::create($request->only('tipo', 'descripcion', 'usuarioCreador', 'fechaCreado'));
            return response()->json(["Mensaje" => "Registrado correctamente", "data" => $tipo, "estado" => true], 200);
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
        $tipo = tipoUsuarios::find($id);
        if (is_null($tipo))
            return response()->json(["Mensaje" => "No se pudo encontrar"], 400);
        else
            return response()->json($tipo, 200);
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
         $tipo = tipoUsuarios::find($id);
        if (is_null($tipo))
            return response()->json(["Mensaje" => "No se pudo encontrar"], 400);
        else{
        $rules = [
            "tipo" => "required",
            "descripcion" => "required",
            "fechaCreado" => "required"
        ];
        $messages = [
            "tipo.required" => "El nombre es requerido.",
            "descripcion.required" => "La descripcion es requerida",
            "fechaCreado.required" => "La fecha es requerida"
        ];
        $validador = validator($request->all(), $rules, $messages);
        if ($validador->fails())
            return response()->json($validador->errors()->all(), 200);
        else {
            $tipo->update($request->all());
            $tipo->save();
            return response()->json(["Mensaje" => "Registrado correctamente", "data" => $tipo, "estado" => true], 200);
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
        $tipo = tipoUsuarios::find($id);
        if (is_null($tipo))
            return response()->json(["Mensaje" => "No se encuentra el registro de id:" . $id], 400);
        else {
            $tipo->active = 0;
            $tipo->save();
            return response()->json(["Mensaje" => "Eliminado correctamente!", "data" => $tipo], 200);
        }
    }
}
