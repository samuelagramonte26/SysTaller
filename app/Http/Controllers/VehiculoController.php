<?php

namespace App\Http\Controllers;

use App\Models\Cliente;
use App\Models\Vehiculos;
use Illuminate\Http\Request;
use PHPUnit\Framework\Constraint\Count;

class VehiculoController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        $vechiculos = Vehiculos::join('clientes', 'clientes.id', '=', 'vehiculos.clienteID')
            ->select(
                'vehiculos.*',
                'clientes.nombre as cliente'
            )
            ->where('vehiculos.active', 1)
            ->get();
        return response()->json($vechiculos, 200);
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
            'color' => 'required',
            'marca' => 'required',
            'modelo' => 'required',
            'clienteID' => 'required',
            'matricula' => 'required',
            
        ];
        $messages = [
            'color.required' => 'El color es requerido',
            'marca.required' => 'La marca es requerida',
            'modelo.required' => 'El modelo es requerido',
            'clienteID.required' => 'El cliente es requerido',
            'matricula.required' => 'La maricula es requerida',
          
        ];
        $validador = validator($request->all(), $rules, $messages);
        if ($validador->fails()) {
            return response($validador->errors()->all(), 200);
        } else {
            $request->request->add(array('fechaCreado'=>date('Y-d-m')));
          
            $vechiculo = Vehiculos::create($request->only('color', 'marca', 'modelo', 'clienteID', 'matricula', 'usuarioCreador', 'fechaCreado'));
           $cliente = Cliente::find($request->clienteID);
          
         
           $dato[0] = json_decode(json_encode($vechiculo),true);
           $dato[0]["cliente"] = $cliente->nombre;
         
        
 
            return response()->json(["Mensaje" => "Registrado correctamente.", "estado" => true, "data" => $dato], 200);
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
        $vehiculo = Vehiculos::find($id);
        if(is_null($vehiculo))
        return response()->json(["Mensaje"=>"No se encontro ningun registro.","estado"=>false],404);
        else
        return response()->json($vehiculo,200);

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
        $vehiculo = Vehiculos::find($id);
        if (is_null($vehiculo))
            return response()->json(["Mensaje" => "No se encontro ningun registro", "estado" => false], 404);
        else {
            $rules = [
                'color' => 'required',
                'marca' => 'required',
                'modelo' => 'required',
                'clienteID' => 'required',
                'matricula' => 'required',
                
            ];
            $messages = [
                'color.required' => 'El color es requerido',
                'marca.required' => 'La marca es requerida',
                'modelo.required' => 'El modelo es requerido',
                'clienteID.required' => 'El cliente es requerido',
                'matricula.required' => 'La maricula es requerida',
                
            ];
            $validador = validator($request->all(), $rules, $messages);
            if ($validador->fails()) {
                return response($validador->errors()->all(), 200);
            }
            $request->request->add(array('fechaEditado'=>date('Y-d-m')));

            $vehiculo->update($request->all());
            $vehiculo->save();
            return response()->json(["Mensaje"=>"Modificado correctamente.","estado"=>true,"data"=>$vehiculo],200);
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
        $vehiculo = Vehiculos::find($id);
        if (is_null($vehiculo))
            return response()->json(["Mensaje" => "No se encontro ningun registro", "estado" => false], 404);
        else{
            $vehiculo->active = 0;
            $vehiculo->fechaEliminado = date('Y-d-m');
            $vehiculo->save();
            return response()->json(["Mensaje"=>"Eliminado correctamente.","estado"=>true,"data"=>$vehiculo],200);

        }
    }

  
}
