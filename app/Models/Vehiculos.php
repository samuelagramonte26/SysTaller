<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Vehiculos extends Model
{
    //use HasFactory;
    public $timestamps = false;
    protected $fillable = ['id','marca','modelo','clienteID','color','matricula','usuarioCreador','usuarioEditor','usuarioEliminador','fechaCreado','fechaEliminado','fechaEditado'];

    protected $guarded = [];
    public function scopeActive($query){
        $query->where('active',1);
    }
}
