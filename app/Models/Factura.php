<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Factura extends Model
{
    //use HasFactory;
    public $timestamps = false;
    protected $fillable = ['id', 'reparacionID', 'fecha','tallerID', 'total', 'itbis', 'numero', 'usuarioCreador', 'usuarioEditor', 'usuarioEliminador', 'fechaCreado', 'fechaEliminado', 'fechaEditado'];
    public function scopeActive($query)
    {
        $query->where("active", 1);
    }
}
