<?php

namespace App\Http\Controllers;

use App\Models\Repuestos;
use Illuminate\Http\Request;

class RepuestoController extends Controller
{
    public function index()
    {
        //
        $Repuesto = Repuestos::active()->get();
        return response()->json($Repuesto, 200);
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
            "cantidad" => "required",
            "precio"=>"required",
            "stock"=>"required",
            "condicion"=>"required",
            "fechaCreado" => "required"
        ];
        $messages = [
            "nombre.required" => "El nombre es requerido",
            "cantidad.required" => "La cantidad es requerida",
            "precio.required"=>"El precio es requerido",
            "stock.required"=>"El stock es requerido",
            "condicion.required"=>"La condicion es requerida",
            "fechaCreado.required" => "La fecha es requerida"
        ];
        $validador = validator($request->all(), $rules, $messages);
        if ($validador->fails())
            return response()->json($validador->errors()->all(), 200);
        else {
            
            $Repuesto = Repuestos::create($request->only('nombre', 'cantidad','precio','stock','condicion', 'usuarioCreador', 'fechaCreado'));
            return response()->json(["Mensaje" => "Registrado correctamente", "data" => $Repuesto, "estado" => true], 200);
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
        $Repuesto = Repuestos::find($id);
        if (is_null($Repuesto) || $Repuesto->active == 0)
            return response()->json(["Mensaje" => "No se pudo encontrar"], 400);
        else
            return response()->json($Repuesto, 200);
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
         $Repuesto = Repuestos::find($id);
        if (is_null($Repuesto))
            return response()->json(["Mensaje" => "No se pudo encontrar"], 400);
        else{
            $rules = [
                "nombre" => "required",
                "cantidad" => "required",
                "precio"=>"required",
                "stock"=>"required",
                "condicion"=>"required",
                "fechaCreado" => "required"
            ];
            $messages = [
                "nombre" => "El nombre es requerido",
                "cantidad" => "La cantidad es requerida",
                "precio"=>"El precio es requerido",
                "stock"=>"El stock es requerido",
                "condicion"=>"La condicion es requerida",
                "fechaCreado" => "La fecha es requerida"
            ];
        $validador = validator($request->all(), $rules, $messages);
        if ($validador->fails())
            return response()->json($validador->errors()->all(), 200);
        else {
            $Repuesto->update($request->all());
            $Repuesto->save();
            return response()->json(["Mensaje" => "Registrado correctamente", "data" => $Repuesto, "estado" => true], 200);
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
        $Repuesto = Repuestos::find($id);
        if (is_null($Repuesto) || $Repuesto->active == 0)
            return response()->json(["Mensaje" => "No se encuentra el registro de id:" . $id], 400);
        else {
            $Repuesto->active = 0;
            $Repuesto->save();
            return response()->json(["Mensaje" => "Eliminado correctamente!", "data" => $Repuesto,"estado"=>true], 200);
        }
    }
}
