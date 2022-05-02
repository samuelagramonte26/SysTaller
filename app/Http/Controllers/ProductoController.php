<?php

namespace App\Http\Controllers;

use App\Models\Productos;
use Illuminate\Http\Request;

class ProductoController extends Controller
{
    public function index()
    {
        //
        $producto = Productos::join("categoria_productos","categoria_productos.id","productos.id")->select("productos.*","categoria_productos.categoria as categoria")->where('productos.active',1)->get();
        return response()->json($producto, 200);
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
            "producto" => "required",
            "montoInicial" => "required",
            "categoriaID"=>"required",
            "fechaCreado" => "required"
        ];
        $messages = [
            "producto.required" => "El producto es requerido",
            "montoInicial.required" => "La montoInicial es requerida",
            "categoriaID.required"=>"La categoria es requerida",
            "fechaCreado.required" => "La fecha es requerida"
        ];
        $validador = validator($request->all(), $rules, $messages);
        if ($validador->fails())
            return response()->json($validador->errors()->all(), 200);
        else {
            
            $producto = Productos::create($request->only('producto', 'montoInicial','categoriaID', 'usuarioCreador', 'fechaCreado'));
            return response()->json(["Mensaje" => "Registrado correctamente", "data" => $producto, "estado" => true], 200);
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
        $producto = Productos::find($id);
        if (is_null($producto) || $producto->active == 0)
            return response()->json(["Mensaje" => "No se pudo encontrar"], 400);
        else
            return response()->json($producto, 200);
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
         $producto = Productos::find($id);
        if (is_null($producto))
            return response()->json(["Mensaje" => "No se pudo encontrar"], 400);
        else{
            $rules = [
                "producto" => "required",
                "montoInicial" => "required",
                "categoriaID"=>"required",
                "fechaCreado" => "required"
            ];
            $messages = [
                "producto" => "El producto es requerido",
                "montoInicial" => "La montoInicial es requerida",
                "categoriaID"=>"El categoriaID es requerido",
                
                "fechaCreado" => "La fecha es requerida"
            ];
        $validador = validator($request->all(), $rules, $messages);
        if ($validador->fails())
            return response()->json($validador->errors()->all(), 200);
        else {
            $producto->update($request->all());
            $producto->save();
            return response()->json(["Mensaje" => "Registrado correctamente", "data" => $producto, "estado" => true], 200);
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
        $producto = Productos::find($id);
        if (is_null($producto) || $producto->active == 0)
            return response()->json(["Mensaje" => "No se encuentra el registro de id:" . $id], 400);
        else {
            $producto->active = 0;
            $producto->save();
            return response()->json(["Mensaje" => "Eliminado correctamente!", "data" => $producto,"estado"=>true], 200);
        }
    }
}
