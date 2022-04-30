<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Mecanicos extends Model
{
    //use HasFactory;
    public $timestamps = false;
    protected $fillable = ['nombre','apellido','cedula','fechaNacimiento','usuarioCreador','usuarioEditor','usuarioEliminador','fechaCreado','fechaEliminado','fechaEditado'];
    public function scopeActive($query){
        $query->where("active",1);
    }
}
