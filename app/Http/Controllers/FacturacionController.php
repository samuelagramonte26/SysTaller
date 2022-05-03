<?php

namespace App\Http\Controllers;

use App\Models\DetalleReparacion;
use App\Models\Factura;
use App\Models\MecanicoReparacion;
use App\Models\Reparacion;
use Illuminate\Http\Request;

class FacturacionController extends Controller
{
    /**
     * Display a listing of the resource.
     
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        $facturas = Factura::join("tallers","tallers.id","=","tallerID")
        ->join("reparacions","reparacions.id","=","reparacionID")
        ->join("clientes","clientes.id","=","reparacions.clienteID")
        ->join("vehiculos","vehiculos.id","=","reparacions.vehiculoID")
        ->select("tallers.*","clientes.nombre as cliente","clientes.apellido","vehiculos.matricula","vehiculos.color","facturas.total","facturas.itbis","facturas.numero")
        //->where("reparacions.estado",3)
        ->where("facturas.active",1)
        ->get();
        return response()->json($facturas,200);
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
            "reparacionID"=>"required",
            "tallerID"=>"required",
            "fecha"=>"required"
        ];
        $messages = [
            "reparacionID.required"=>"La reparacion es requerida",
            "tallerID.required"=>"El  taller es requerido",
            "fecha.required"=>"La fecha es requerida"
        ];
        $validador = validator($request->all(),$rules,$messages);
        if($validador->fails()){
            return response()->json($validador->errors()->all(),200);
        }
        $subtotales = DetalleReparacion::where("reparacionID",$request->reparacionID)->sum("subTotal");
        // array_push($reque,$subtotales);
        $itbis = $subtotales * 0.18;
        $reparacion = Reparacion::select("reparacions.*")->where("id",$request->reparacionID)->get();
        $numero = $reparacion[0]->id . $reparacion[0]->clienteID . $reparacion[0]->vehiculoID;
        $request->request->add(array("total"=>$subtotales,"itbis"=>$itbis,"numero"=>$numero));
       // return response($request,200);
        $factura = Factura::create($request->only('tallerID',"reparacionID","fecha","fechaCreado","usuarioCreador","total","itbis","numero"));
        return response()->json(["Mensaje"=>"Registrado correctamente.","estado"=>true,"data"=>$factura],200);
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
        $factura = Factura::find($id);
        if(is_null($factura) || $factura->active == 0){
            return response()->json(["Mensaje" => "No se pudo encontrar"], 404);
        }else{
            $facturas = Factura::join("tallers","tallers.id","=","tallerID")
            ->join("reparacions","reparacions.id","=","reparacionID")
            ->join("clientes","clientes.id","=","reparacions.clienteID")
            ->join("vehiculos","vehiculos.id","=","reparacions.vehiculoID")
            ->select("tallers.*","clientes.nombre as cliente","clientes.apellido","vehiculos.matricula","vehiculos.color","facturas.total","facturas.itbis","facturas.numero")
            ->where("facturas.id",$id)
            ->get();

            $detalle = DetalleReparacion::join("productos","productos.id","=","productoID")->select("detalle_reparacions.subTotal","productos.producto")->where("reparacionID",$factura->reparacionID)->get();
           $mecanicos = MecanicoReparacion::join("mecanicos","mecanicos.id","=","mecanicoID")->select("mecanicos.nombre","mecanicos.apellido")->where("reparacionID",$factura->reparacionID)->get();
           $facturaDetalle["factura"]= $facturas;
           $facturaDetalle["detallles"]= $detalle;
           $facturaDetalle["mecanicos"]= $mecanicos;
           
        return response()->json($facturaDetalle,200);

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
        $factura = Factura::find($id);
        if(is_null($factura) || $factura->active == 0){
            return response()->json(["Mensaje" => "No se pudo encontrar"], 404);
        }else{
        $rules = [
            "reparacionID"=>"required",
            "tallerID"=>"required",
            "fecha"=>"required"
        ];
        $messages = [
            "reparacionID.required"=>"La reparacion es requerida",
            "tallerID.required"=>"El  taller es requerido",
            "fecha.required"=>"La fecha es requerida"
        ];
        $validador = validator($request->all(),$rules,$messages);
        if($validador->fails()){
            return response()->json($validador->errors()->all(),200);
        }
        $factura->update($request->all());
        $factura->save();
        return response()->json(["Mensaje"=>"Modificado correctamente.","estado"=>true,"data"=>$factura],200);


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
        $factura = Factura::find($id);
        if(is_null($factura) || $factura->active == 0){
            return response()->json(["Mensaje" => "No se pudo encontrar"], 404);
        }else{
            $factura->active = 0;
            $factura->save();
            return response()->json(["Mensaje"=>"Eliminado correctamente","estado"=>true],200);
        }
    }
}
