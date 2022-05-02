<?php

namespace App\Http\Controllers;

use App\Models\Usuarios;
use Illuminate\Http\Request;

class UsuarioController extends Controller
{
    public function index()
    {
        //
        $usuario = Usuarios::join("tipo_usuarios","tipo_usuarios.id","=","usuarios.id")->select("usuarios.*","tipo_usuarios.tipo as rol")->where('usuarios.active',1)->get();
        return response()->json($usuario, 200);
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
            "usuario" => "required",
            "clave" => "required",
            "fechaCreado" => "required"
        ];
        $messages = [
            "usuario.required" => "El usuario es requerido.",
            "clave.required" => "La clave es requerida",
            "fechaCreado.required" => "La fecha es requerida"
        ];
        $validador = validator($request->all(), $rules, $messages);
        if ($validador->fails())
            return response()->json($validador->errors()->all(), 200);
        else {
            $request->clave = md5($request->clave);
            $usuario = Usuarios::create($request->only('usuario', 'clave','tipoID', 'usuarioCreador', 'fechaCreado'));
            return response()->json(["Mensaje" => "Registrado correctamente", "data" => $usuario, "estado" => true], 200);
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
        $usuario = Usuarios::find($id);
        if (is_null($usuario))
            return response()->json(["Mensaje" => "No se pudo encontrar"], 400);
        else
            return response()->json($usuario, 200);
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
         $usuario = Usuarios::find($id);
        if (is_null($usuario))
            return response()->json(["Mensaje" => "No se pudo encontrar"], 400);
        else{
        $rules = [
            "usuario" => "required",
            "clave" => "required",
            "fechaCreado" => "required"
        ];
        $messages = [
            "usuario.required" => "El nombre es requerido.",
            "clave.required" => "La clave es requerida",
            "fechaCreado.required" => "La fecha es requerida"
        ];
        $validador = validator($request->all(), $rules, $messages);
        if ($validador->fails())
            return response()->json($validador->errors()->all(), 200);
        else {
            $usuario->update($request->all());
            $usuario->save();
            return response()->json(["Mensaje" => "Registrado correctamente", "data" => $usuario, "estado" => true], 200);
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
        $usuario = Usuarios::find($id);
        if (is_null($usuario))
            return response()->json(["Mensaje" => "No se encuentra el registro de id:" . $id], 400);
        else {
            $usuario->active = 0;
            $usuario->save();
            return response()->json(["Mensaje" => "Eliminado correctamente!", "data" => $usuario], 200);
        }
    }
}
