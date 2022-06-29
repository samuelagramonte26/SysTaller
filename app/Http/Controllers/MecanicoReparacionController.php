<?php

namespace App\Http\Controllers;

use App\Models\MecanicoReparacion;
use App\Models\Mecanicos;
use App\Models\Reparacion;
use Illuminate\Http\Request;

class MecanicoReparacionController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        $mecanicos = MecanicoReparacion::join("mecanicos", "mecanicos.id", "=", "mecanico_reparacions.mecanicoID")
        ->join("reparacions", "reparacions.id", "=", "mecanico_reparacions.reparacionID")
        ->join("clientes", "clientes.id", "=", "reparacions.clienteID")
        ->join("vehiculos", "vehiculos.id", "=", "reparacions.vehiculoID")
            ->select("mecanicos.nombre as mecanico","clientes.nombre as cliente","vehiculos.color","vehiculos.matricula","vehiculos.modelo","vehiculos.marca", "mecanico_reparacions.*")
            ->where("mecanico_reparacions.active", 1)
            ->get();
        return response()->json($mecanicos, 200);
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
            "reparacionID" => "required",

            "mecanicoID" => "required",

          
        ];
        $messages = [
            "reparacionID.required" => "El producto es requerido",
            "mecanicoID.required" => "La cantidad es requerida",
            
        ];
        $validador = validator($request->all(), $rules, $messages);
        if ($validador->fails())
            return response()->json($validador->errors()->all(), 200);
        else {
            $request->request->add(array('fechaCreado' => date('Y-d-m')));
           
            $mecanicos = MecanicoReparacion::create($request->only('mecanicoID', 'reparacionID', 'usuarioCreador', 'fechaCreado'));
            $reparacion = Reparacion::find($request->reparacionID);
            $mecanico = Mecanicos::find($request->mecanicoID);
       // $mecanicoFree = Mecanicos::select("id","nombre","apellido")->where("estado",0)->where("active",1)->get();
         //   $datos[0] = json_decode(json_encode($mecanicos),true);
           // $datos[][0] = json_decode(json_encode($mecanicoFree),true);;
        //print_r($datos);
            $mecanico->estado = 1;
            $mecanico->save();
            $reparacion->estado = 2;
            $reparacion->save();
            return response()->json(["Mensaje" => "Registrado correctamente", "data" => $mecanicos, "estado" => true], 200);
            
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
        $mecanicos = MecanicoReparacion::find($id);
        if (is_null($mecanicos) || $mecanicos->active == 0)
            return response()->json(["Mensaje" => "No se pudo encontrar"], 400);
        else {
            $rules = [
                "reparacionID" => "required",

                "mecanicoID" => "required",

                "fechaEditado" => "required"
            ];
            $messages = [
                "reparacionID.required" => "El producto es requerido",
                "mecanicoID.required" => "La cantidad es requerida",
                "fechaEditado.required" => "La fecha es requerida"
            ];
            $validador = validator($request->all(), $rules, $messages);
            if ($validador->fails())
                return response()->json($validador->errors()->all(), 200);
            else {
                $mecanicos->update($request->all());
                return response()->json(["Mensaje" => "Modificado correctamente", "data" => $mecanicos, "estado" => true], 200);
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
        $mecanicoR = MecanicoReparacion::find($id);
      
        if (is_null($mecanicoR))
            return response()->json(["Mensaje" => "No se encontro ningun registro.", "estado" => false], 404);
        else {
            $mecanico = Mecanicos::find($mecanicoR->mecanicoID);
            $mecanico->estado = 0;
            $mecanico->save();
            $mecanicoR->active = 0;
            $mecanicoR->fechaEliminado = date('Y-d-m');
            $mecanicoR->save();
            return response()->json(["Mensaje" => "Eliminado correctamente.",  "estado" => true], 200);
        }
    }
}
