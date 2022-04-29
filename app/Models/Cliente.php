<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cliente extends Model
{
   //use HasFactory;
   public $timestamp = false;
   protected $fillable = ['id','nombre','apellido','direccion','telefono','cedula'];

   protected $guardedc=[];
   public function scopeActive($query)
   {
       # code...
       $query->where('active',1);
   }
}
