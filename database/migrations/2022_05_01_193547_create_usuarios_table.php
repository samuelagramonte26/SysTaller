<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUsuariosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('usuarios', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger("tipoID");
            $table->string("usuario");
            $table->string("clave");
            $table->boolean("active")->default(true);
            $table->date("fechaCreado")->nullable();
            $table->date("fechaEditado")->nullable();
            $table->date("fechaEliminado")->nullable();
            $table->integer("usuarioCreador")->nullable();
            $table->integer("usuarioEditor")->nullable();
            $table->integer("usuarioEliminador")->nullable();
            $table->foreign("tipoID")->references("id")->on("tipo_usuarios")->onDelete("cascade");
          
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('usuarios');
    }
}
