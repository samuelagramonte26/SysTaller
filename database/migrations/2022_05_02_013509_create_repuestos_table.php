<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateRepuestosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('repuestos', function (Blueprint $table) {
            $table->id();
           $table->string("nombre");
           $table->integer("cantidad");
           $table->float("precio");
           $table->integer("stock");
           $table->enum("condicion",["Nuevo","Medio uso"]);
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
        Schema::dropIfExists('repuestos');
    }
}
