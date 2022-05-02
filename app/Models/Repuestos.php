<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Repuestos extends Model
{
   // use HasFactory;
   public $timestamps = false;
   protected $fillable = ['nombre','cantidad','precio','stock','condicion','usuarioCreador','usuarioEditor','usuarioEliminador','fechaCreado','fechaEliminado','fechaEditado'];
   public function scopeActive($query){
       $query->where("active",1);
   }
}
