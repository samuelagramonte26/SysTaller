<?php

namespace App\Http\Controllers;

use App\Models\Cliente;
use App\Models\Factura;
use App\Models\Mecanicos;
use App\Models\Reparacion;
use App\Models\Vehiculos;
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
        $reparaciones = Reparacion::join("clientes", "clientes.id", "clienteID")
            ->join("vehiculos", "vehiculos.id", "vehiculoID")->select(
                "reparacions.*",
                "clientes.nombre as cliente",
                "clientes.apellido",
                "vehiculos.matricula",
                "vehiculos.marca",
                "vehiculos.modelo",
                "vehiculos.color"
            )
            ->where('reparacions.estado',"!=",3)

            ->where('reparacions.active', 1)->get();
        return response()->json($reparaciones, 200);
    }
    public function terminadas()
    {
        $idRepar = Reparacion::select(
            "id"
        )->where("estado",3)
        ->where('active', 1)->get();
        $reparaciones = Reparacion::join("clientes", "clientes.id", "clienteID")
            ->join("vehiculos", "vehiculos.id", "vehiculoID")
            //->join("facturas","facturas.reparacionID","!=","reparacions.id")
            ->select(
                "reparacions.*",
                "clientes.nombre as cliente",
                "clientes.apellido",
                "vehiculos.matricula",
                "vehiculos.marca",
                "vehiculos.modelo",
                "vehiculos.color"
            )
            ->where('reparacions.estado', 3)
            //->where('facturas.active', 1)
            ->where('reparacions.active', 1)->get();
        return response()->json($reparaciones, 200);
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
           
            "fechaEntrada" => "required",
            "comentario" => "required",
            
        ];
        $messages = [
            "clienteID.required" => "El cliente es requerido.",
            "vehiculoID.required" => "El vehiculo es requerido",
            
            "fechaEntrada.required" => "La fecha de entrda es requerida",
            "comentario.required" => "El comentario es requerido",
            
        ];
        $validador = validator($request->all(), $rules, $messages);
        if ($validador->fails())
            return response()->json($validador->errors()->all(), 200);
        else {
           // $request->request->add(array('fechaCreado' =>'2020-30-20'));
            $request->request->add(array('estado' => 1));


            $reparacion = Reparacion::create($request->only('clienteID', 'vehiculoID', 'estado', 'fechaEntrada', 'comentario', 'usuarioCreador', 'fechaCreado'));

            $cliente = Cliente::find($request->clienteID);
            $vehiculo = Vehiculos::find($request->vehiculoID);
            $datos[0] = json_decode(json_encode($reparacion),true);
            $datos[0]["cliente"] = $cliente->nombre;
            $datos[0]["apellido"] = $cliente->apellido;
            $datos[0]["marca"] = $vehiculo->marca;
            $datos[0]["modelo"] = $vehiculo->modelo;
            $datos[0]["matricula"] = $vehiculo->matricula;
            $datos[0]["estado"] ="Chequeo";

            return response()->json(["Mensaje" => "Registrado correctamente", "data" => $datos[0], "estado" => true], 200);
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
        if (is_null($reparacion) || $reparacion->active == 0) {
            return response()->json(["Mensaje" => "No se pudo encontrar","estado"=>false], 404);
        } else {
            return response()->json($reparacion, 200);
        }
    }
    public function showVehiculoCliente($id){
       $vehiculos = Vehiculos::select("id","modelo","color")->where("clienteID",$id)->where("active",1)->get();
       return response()->json($vehiculos,200);
    }
    public function showChequeo(){
        $reparaciones = Reparacion::join("clientes", "clientes.id", "clienteID")
        ->join("vehiculos", "vehiculos.id", "vehiculoID")->select(
            "reparacions.*",
            "clientes.nombre as cliente",
            "clientes.apellido",
            "vehiculos.matricula",
            "vehiculos.marca",
            "vehiculos.modelo",
            "vehiculos.color"
        )
        ->where('reparacions.estado', 1)

        ->where('reparacions.active', 1)->get();
    return response()->json($reparaciones, 200);
    }
    public function showMecanicos(){
        $mecanicos = Mecanicos::select("id","nombre","apellido")->where("estado",0)->where("active",1)->get();
        return response()->json($mecanicos,200);
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
        if (is_null($reparacion) || $reparacion->active == 0) {
            return response()->json(["Mensaje" => "No se pudo encontrar","estado"=>false], 404);
        } else {
            $rules = [
                "clienteID" => "required",
                "vehiculoID" => "required",
              
                "fechaEntrada" => "required",
                "comentario" => "required",
               
            ];
            $messages = [
                "clienteID.required" => "El cliente es requerido.",
                "vehiculoID.required" => "El vehiculo es requerido",
               
                "fechaEntrada.required" => "La fecha de entrda es requerida",
                "comentario.required" => "El comentario es requerido",
              
            ];
            $validador = validator($request->all(), $rules, $messages);
            if ($validador->fails())
                return response()->json($validador->errors()->all(), 200);
            else {
                $request->request->add(array('fechaEditado' => date('Y-d-m')));

                $reparacion->update($request->all());
                $reparacion->save();
                $cliente = Cliente::find($request->clienteID);
                $vehiculo = Vehiculos::find($request->vehiculoID);
                $datos[0] = json_decode(json_encode($reparacion),true);
                $datos[0]["cliente"] = $cliente->nombre;
                $datos[0]["apellido"] = $cliente->apellido;
                $datos[0]["marca"] = $vehiculo->marca;
                $datos[0]["modelo"] = $vehiculo->modelo;
                $datos[0]["matricula"] = $vehiculo->matricula;
    
                return response()->json(["Mensaje" => "Modificado correctamente", "data" => $datos[0], "estado" => true], 200);
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
        if (is_null($reparacion) || $reparacion->active == 0) {
            return response()->json(["Mensaje" => "No se pudo encontrar","estado"=>false], 404);
        } else {
            $reparacion->active = 0;
            $reparacion->fechaEliminado = date('Y-d-m');
            $reparacion->save();
            return response()->json(["Mensaje" => "Eliminado correctamente.", "estado" => true], 200);
        }
    }
}
