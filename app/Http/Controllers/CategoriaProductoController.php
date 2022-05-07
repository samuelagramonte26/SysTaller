<?php

namespace App\Http\Controllers;

use App\Models\CategoriaProductos;
use Illuminate\Http\Request;

class CategoriaProductoController extends Controller
{
   /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        $categorias = CategoriaProductos::active()->get();
        return response()->json($categorias, 200);
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
            "categoria" => "required",
            "descripcion" => "required",
           
        ];
        $messages = [
            "categoria.required" => "La categoria es requerida.",
            "descripcion.required" => "La descripcion es requerida",
          
        ];
        $validador = validator($request->all(), $rules, $messages);
        if ($validador->fails())
            return response()->json($validador->errors()->all(), 200);
        else {
            $request->request->add(array('fechaCreado' => date('Y-d-m')));

            $categoria = CategoriaProductos::create($request->only('categoria','descripcion','usuarioCreador','fechaCreado'));
            return response()->json(["Mensaje"=>"Registrado correctamente","estado"=>true,"data"=>$categoria],200);
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
        $categoria = CategoriaProductos::find($id);
        if (is_null($categoria) || $categoria->active == 0)
            return response()->json(["Mensaje" => "No se encontro ningun registro.", "estado" => false], 404);
        else
            return response()->json($categoria, 200);
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
        $categoria = CategoriaProductos::find($id);
        if (is_null($categoria))
            return response()->json(["Mensaje" => "No se encontro ningun registro.", "estado" => false], 404);
        else{
        $rules = [
            "categoria" => "required",
            "descripcion" => "required",
        
        ];
        $messages = [
            "categoria.required" => "La categoria es requerida.",
            "descripcion.required" => "La descripcion es requerida",
           
        ];
        $validador = validator($request->all(), $rules, $messages);
        if ($validador->fails())
            return response()->json($validador->errors()->all(), 200);
        else {
            $request->request->add(array('fechaEditado' => date('Y-d-m')));
            $categoria->update($request->all());
            $categoria->save();
            return response()->json(["Mensaje"=>"Modificado correctamente","estado"=>true,"data"=>$categoria],200);
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
        $categoria = CategoriaProductos::find($id);
        if (is_null($categoria))
            return response()->json(["Mensaje" => "No se encontro ningun registro.", "estado" => false], 404);
        else {
            $categoria->active = 0;
            $categoria->fechaEliminado = date('Y-d-m');
            $categoria->save();
            return response()->json(["Mensaje" => "Eliminado correctamente.","estado" => true], 200);
        }
    }
}
