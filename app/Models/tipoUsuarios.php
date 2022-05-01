<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class tipoUsuarios extends Model
{
   // use HasFactory;
   public $timestamps  = false;
   protected $fillable = ['id','tipo','descripcion','usuarioCreador','usuarioEditor','usuarioEliminador','fechaCreado','fechaEliminado','fechaEditado'];

   protected $guardedc=[];
   public function scopeActive($query)
   {
       # code...
       $query->where('active',1);
   }
}
