<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTipoUsuariosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tipo_usuarios', function (Blueprint $table) {
            $table->id();
            $table->string("tipo");
           $table->string("descripcion");
           $table->boolean("active")->default(true);
           $table->date("fechaCreado")->nullable();
           $table->date("fechaEditado")->nullable();
           $table->date("fechaEliminado")->nullable();
           $table->integer("usuarioCreador")->nullable();
           $table->integer("usuarioEditor")->nullable();
           $table->integer("usuarioEliminador")->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tipo_usuarios');
    }
}
