<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class taller extends Model
{
   // use HasFactory;
   public $timestamp = false;
   protected $fillable = ['id','nombre','direccion','telefono','correo','rnc'];

   protected $guardedc=[];
   public function scopeActive($query)
   {
       # code...
       $query->where('active',1);
   }
}
