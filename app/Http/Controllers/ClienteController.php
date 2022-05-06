<?php

namespace App\Http\Controllers;

use App\Models\Cliente;
use Illuminate\Http\Request;

class ClienteController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        $clientes = Cliente::active()->get();
        return response()->json($clientes,200);
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
        $cliente = Cliente::create($request->only('nombre','apellido','direccion','telefono','cedula','usuarioCreador','usuarioEditor','usuarioEliminador','fechaCreado','fechaEliminado','fechaEditado'));
        return response()->json(["Mensaje"=>"Registrado correctamente.","data"=>$cliente,"estado"=>true],200);
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
        $cliente = Cliente::find($id);
        if(is_null($cliente))
        return response()->json(["Mensaje"=>"No se encontro ningun registro.","estado"=>false],404);
        else
        return response()->json($cliente,200);

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
        $cliente = Cliente::find($id);
        if(is_null($cliente))
        return response()->json(["mensaje"=>"No se encontro ningun registro.","estado"=>false],404);
        else{
            $cliente->update($request->all());
            $cliente->save();
            return response()->json(["Mensaje"=>"Modificado correctamente","data"=>$cliente,"estado"=>true],200);
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
        $cliente = Cliente::find($id);
        if(is_null($cliente))
        return response()->json(["mensaje"=>"No se encontro ningun registro.","estado"=>false],404);
        else{
            $cliente->active = 0;
            $cliente->save();
            return response()->json(["Mensaje"=>"Eliminado correctamente","data"=>$cliente,"estado"=>true],200);
        }
    }
}
