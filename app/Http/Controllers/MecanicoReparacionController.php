<?php

namespace App\Http\Controllers;

use App\Models\MecanicoReparacion;
use Illuminate\Http\Request;

class MecanicoReparacionController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        $mecanicos = MecanicoReparacion::join("mecanicos", "mecanicos.id", "=", "mecanico_reparacions.mecanicoID")
            ->join("reparacions", "reparacions.id", "=", "mecanico_reparacions.reparacionID")
            ->select("mecanicos.nombre", "mecanico_reparacions.*")
           // ->where("mecanico_reparacions.estado", 1)
            ->where("mecanico_reparacions.active", 1)
            ->get();
        return response()->json($mecanicos, 200);
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
            "reparacionID" => "required",

            "mecanicoID" => "required",

            "fechaCreado" => "required"
        ];
        $messages = [
            "reparacionID.required" => "El producto es requerido",
            "mecanicoID.required" => "La cantidad es requerida",
            "fechaCreado.required" => "La fecha es requerida"
        ];
        $validador = validator($request->all(), $rules, $messages);
        if ($validador->fails())
            return response()->json($validador->errors()->all(), 200);
        else {
            $mecanicos = MecanicoReparacion::create($request->only('mecanicoID', 'reparacionID', 'usuarioCreador', 'fechaCreado'));
            return response()->json(["Mensaje" => "Registrado correctamente", "data" => $mecanicos, "estado" => true], 200);
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
        $mecanicos = MecanicoReparacion::find($id);
        if (is_null($mecanicos) || $mecanicos->active == 0)
            return response()->json(["Mensaje" => "No se pudo encontrar"], 400);
        else {
            $rules = [
                "reparacionID" => "required",

                "mecanicoID" => "required",

                "fechaEditado" => "required"
            ];
            $messages = [
                "reparacionID.required" => "El producto es requerido",
                "mecanicoID.required" => "La cantidad es requerida",
                "fechaEditado.required" => "La fecha es requerida"
            ];
            $validador = validator($request->all(), $rules, $messages);
            if ($validador->fails())
                return response()->json($validador->errors()->all(), 200);
            else {
                $mecanicos->update($request->all());
                return response()->json(["Mensaje" => "Modificado correctamente", "data" => $mecanicos, "estado" => true], 200);
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
    }
}
