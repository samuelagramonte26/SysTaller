<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Servicios extends Model
{
    //use HasFactory;
    public $timestamps = false;
    protected $fillable = ['nombre','descripcion','usuarioCreador','usuarioEditor','usuarioEliminador','fechaCreado','fechaEliminado','fechaEditado'];


    protected $guarded = [];
public function scopeActive($query){
    $query->where("active",1);
}
}
