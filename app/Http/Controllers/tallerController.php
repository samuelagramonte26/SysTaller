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
        return response()->json($tallers,200);

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
        $taller = taller::create($request->only('direccion','telefono','rnc','correo','nombre'));
        return response()->json(["Mensaje"=>"Registrado correctamente","data"=>$taller],200);
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
        if(is_null($taller))
            return response()->json(["Mensaje"=>"No se pudo encontrar"],400);
        else
        return response()->json($taller,200);

        
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
        if(is_null($taller))
        return response()->json(["Mensaje"=>"No se encuentra el registro de id:".$id],400);
        else{
            $taller->update($request->all());
            $taller->save();
            return response()->json(["Mensaje"=>"Actualizado correctamente!","data"=>$taller],200);
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
        if(is_null($taller))
        return response()->json(["Mensaje"=>"No se encuentra el registro de id:".$id],400);
        else{
            $taller->active = 0;
            $taller->save();
            return response()->json(["Mensaje"=>"Eliminado correctamente!","data"=>$taller],200);

        }
    }
}
