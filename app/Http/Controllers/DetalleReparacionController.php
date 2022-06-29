<?php

namespace App\Http\Controllers;

use App\Models\DetalleReparacion;
use App\Models\MecanicoReparacion;
use App\Models\Productos;
use App\Models\Reparacion;
use Illuminate\Http\Request;

class DetalleReparacionController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
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
        $reparacion = Reparacion::find($request->reparacionID);
        if (is_null($reparacion) || $reparacion->active == 0 || $reparacion->estado == 3)
            return response()->json(["Mensaje" => "No se pudo encontrar","estado"=>false], 404);
        else {
            $rules = [
                "productoID" => "required",

                "cantidad" => "required",

               
            ];
            $messages = [
                "productoID.required" => "El producto es requerido",
                "cantidad.required" => "La cantidad es requerida",
               
            ];
            $validador = validator($request->all(), $rules, $messages);
            if ($validador->fails())
                return response()->json($validador->errors()->all(), 200);
            else {
            $request->request->add(array('fechaCreado' => date('Y-d-m')));
            $request->request->add(array('subTotal' =>($request->cantidad*$request->precio)));
                $producto = Productos::find($request->productoID);
                $detalle = DetalleReparacion::create($request->only('productoID', 'reparacionID', 'cantidad', 'subTotal', 'usuarioCreador', 'fechaCreado'));
                $datos[0] = json_decode(json_encode($detalle),true);
                $datos[0]["producto"] =  $producto->producto;
                return response()->json(["Mensaje" => "Registrado correctamente", "data" => $datos, "estado" => true], 200);
            }
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
        $detalles  = DetalleReparacion::join("reparacions", "reparacions.id", "=", "reparacionID")
            ->join("productos", "productos.id", "=", "productoID")
            ->select("productos.producto", "detalle_reparacions.*","reparacions.estado")
            ->where("reparacions.id", $id)
            ->where("detalle_reparacions.active", 1)
            ->get();
        if (is_null($detalles))
            return response()->json(["Mensaje" => "No se encontro ningun registro.", "estado" => false], 404);
        else
            return response()->json($detalles, 200);
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
        $reparacion = Reparacion::find($request->reparacionID);
        $detalle = DetalleReparacion::find($id);
        if (is_null($reparacion) || $reparacion->active == 0 || $reparacion->estado == 3)
            return response()->json(["Mensaje" => "No se pudo encontrar la reparacion"], 404);
        else if (is_null($detalle) || $detalle->active == 0) {
            return response()->json(["Mensaje" => "No se pudo encontrar el detalle"], 404);
        } else {
            $rules = [
                "productoID" => "required",

                "cantidad" => "required",

                "fechaEditado" => "required"
            ];
            $messages = [
                "productoID.required" => "El producto es requerido",
                "cantidad.required" => "La cantidad es requerida",
                "fechaEditado.required" => "La fecha es requerida"
            ];
            $validador = validator($request->all(), $rules, $messages);
            if ($validador->fails())
                return response()->json($validador->errors()->all(), 200);
            else {
                $detalle->update($request->all());
                return response()->json(["Mensaje" => "Modificado correctamente", "data" => $detalle, "estado" => true], 200);
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
        $detalle = DetalleReparacion::find($id);
        if (is_null($detalle) || $detalle->active == 0)
            return response()->json(["Mensaje" => "No se pudo encontrar el detalle"], 404);

        else {
            $detalle->active = 0;
            $detalle->save();
            return response()->json(["Mensaje" => "Eliminado correctamente", "estado" => true], 200);
        }
    }

    public function terminarReparacion($id)
    {
        $reparacion = Reparacion::find($id);
        if (is_null($reparacion) || $reparacion->active == 0 || $reparacion->estado == 3)
            return response()->json(["Mensaje" => "No se pudo encontrar.", "estado" => false], 404);
        else {
            $reparacion->estado = 3;
            $reparacion->save();
          //  $mecanico = MecanicoReparacion::select("estado","id")->where("reparacionID",$id)->get();
            //return response($mecanico,200);
          //  $estadoMecanico = MecanicoReparacion::find($mecanico[0]->id);
           //$estadoMecanico->estado = 0;
           
           // $estadoMecanico->save();
            return response()->json(["Mensaje"=>"Reparacion terminada.","estado"=>true],200);
        }
    }
}
