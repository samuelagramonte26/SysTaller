<?php

namespace App\Http\Controllers;

use App\Models\Reparacion;
use Illuminate\Http\Request;

class ReparacionController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        $reparaciones = Reparacion::join("clientes","clientes.id","clienteID")
        ->join("vehiculos","vehiculos.id","vehiculoID")->select(
            "reparacions.*","clientes.nombre","clientes.apellido","vehiculos.matricula"
        )->where('reparacions.active',1)->get();
        return response()->json($reparaciones,200);
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
            "clienteID" => "required",
            "vehiculoID" => "required",
            "estado"=>"required",
            "fechaEntrada"=>"required",
            "comentario"=>"required",
            "fechaCreado" => "required"
        ];
        $messages = [
            "clienteID.required" => "El cliente es requerido.",
            "vehiculoID.required" => "El vehiculo es requerido",
            "estado.required"=>"El estado es requerido",
            "fechaEntrada.required"=>"La fecha de entrda es requerida",
            "comentario.required"=>"El comentario es requerido",
            "fechaCreado.required" => "La fecha creado es requerido"
        ];
        $validador = validator($request->all(), $rules, $messages);
        if ($validador->fails())
            return response()->json($validador->errors()->all(), 200);
        else {
            
            $reparacion = Reparacion::create($request->only('clienteID', 'vehiculoID','estado','fechaEntrada','comentario', 'usuarioCreador', 'fechaCreado'));
            return response()->json(["Mensaje" => "Registrado correctamente", "data" => $reparacion, "estado" => true], 200);
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
        $reparacion = Reparacion::find($id);
        if (is_null($reparacion) || $reparacion->active == 0){
            return response()->json(["Mensaje" => "No se pudo encontrar"], 400);

        }else{
            return response()->json($reparacion,200);
        }
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
        $reparacion = Reparacion::find($id);
        if (is_null($reparacion) || $reparacion->active == 0){
            return response()->json(["Mensaje" => "No se pudo encontrar"], 400);

        }else{
            $rules = [
                "clienteID" => "required",
                "vehiculoID" => "required",
                "estado"=>"required",
                "fechaEntrada"=>"required",
                "comentario"=>"required",
                "fechaEditado" => "required"
            ];
            $messages = [
                "clienteID.required" => "El cliente es requerido.",
                "vehiculoID.required" => "El vehiculo es requerido",
                "estado.required"=>"El estado es requerido",
                "fechaEntrada.required"=>"La fecha de entrda es requerida",
                "comentario.required"=>"El comentario es requerido",
                "fechaEditado.required" => "La fecha creado es requerido"
            ];
            $validador = validator($request->all(), $rules, $messages);
            if ($validador->fails())
                return response()->json($validador->errors()->all(), 200);
            else {
                
                $reparacion->update($request->all());
                $reparacion->save();
                return response()->json(["Mensaje" => "Modificado correctamente", "data" => $reparacion, "estado" => true], 200);
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
        $reparacion = Reparacion::find($id);
        if (is_null($reparacion) || $reparacion->active == 0){
            return response()->json(["Mensaje" => "No se pudo encontrar"], 400);

        }else{
            $reparacion->active = 0;
            $reparacion->save();
            return response()->json(["Mensaje" => "Eliminado correctamente!", "data" => $reparacion,"estado"=>true], 200);
        
        }
    }
}
