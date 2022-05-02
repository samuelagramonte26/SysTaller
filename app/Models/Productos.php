<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Productos extends Model
{
  // use HasFactory;
  public $timestamps = false;
  protected $fillable = ['id','producto','montoInicial','categoriaID','usuarioCreador','usuarioEditor','usuarioEliminador','fechaCreado','fechaEliminado','fechaEditado'];

  protected $guardedc=[];
  public function scopeActive($query)
  {
      # code...
      $query->where('active',1);
  }
}
