<?php

namespace App\Http\Controllers;

use App\Models\taller;
use Illuminate\Http\Request;

class tallerController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        $tallers = taller::active()->get();
        return response()->json($tallers, 200);
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

            "direccion" => "required",
            "rnc" => "required",
            "correo" => "required",


            "telefono" => "required"
        ];
        $messages = [
            "nombre.required" => "El nombre es requerido",
            "direccion.required" => "La direccion es requerida",
            "rnc.required" => "El RNC es requerido",
            "correo.required" => "El correo es requerido",
            "telefono.required" => "El telefono es requerido"
        ];
        $validador = validator($request->all(), $rules, $messages);
        if ($validador->fails())
            return response()->json($validador->errors()->all(), 200);
        else {
            $request->request->add(array('fechaCreado' => date('Y-d-m')));

            $taller = taller::create($request->only('direccion', 'telefono', 'rnc', 'correo', 'nombre', 'usuarioCreador', 'fechaCreado'));
            return response()->json(["Mensaje" => "Registrado correctamente", "estado" => true, "data" => $taller], 200);
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
        $taller = taller::find($id);
        if (is_null($taller))
            return response()->json(["Mensaje" => "No se pudo encontrar","estado"=>false], 400);
        else
            return response()->json($taller, 200);
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
        $taller = taller::find($id);
        if (is_null($taller))
            return response()->json(["Mensaje" => "No se encuentra el registro de id:" . $id,"estado"=>false], 400);
        else {
            $rules = [
                "nombre" => "required",

                "direccion" => "required",
                "rnc" => "required",
                "correo" => "required",


                "telefono" => "required"
            ];
            $messages = [
                "nombre.required" => "El nombre es requerido",
                "direccion.required" => "La direccion es requerida",
                "rnc.required" => "El RNC es requerido",
                "correo.required" => "El correo es requerido",
                "telefono.required" => "El telefono es requerido"
            ];
            $validador = validator($request->all(), $rules, $messages);
            if ($validador->fails())
                return response()->json($validador->errors()->all(), 200);
            else {
                $request->request->add(array('fechaEditado' => date('Y-d-m')));

                $taller->update($request->all());
                $taller->save();
                return response()->json(["Mensaje" => "Actualizado correctamente!","estado"=>true ,"data" => $taller], 200);
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
        $taller = taller::find($id);
        if (is_null($taller))
            return response()->json(["Mensaje" => "No se encuentra el registro de id:" . $id,"estado"=>false], 400);
        else {
            $taller->active = 0;
            $taller->fechaEliminado = date('Y-d-m');
            $taller->save();
            return response()->json(["Mensaje" => "Eliminado correctamente!","estado"=>true, "data" => $taller], 200);
        }
    }
}
