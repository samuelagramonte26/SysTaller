<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DetalleReparacion extends Model
{
    //use HasFactory;
    public $timestamps = false;
    protected $fillable = ['id','reparacionID','productoID','cantidad','subTotal','usuarioCreador','usuarioEditor','usuarioEliminador','fechaCreado','fechaEliminado','fechaEditado'];
    public function scopeActive($query){
        $query->where("active",1);
    }
}
