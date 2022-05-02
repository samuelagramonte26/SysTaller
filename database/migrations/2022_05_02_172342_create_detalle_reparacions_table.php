<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDetalleReparacionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('detalle_reparacions', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger("reparacionID");
            $table->unsignedBigInteger("productoID");
            $table->integer("cantidad");
            $table->float("subTotal");
          
            $table->boolean("active")->default(true);
            $table->date("fechaCreado")->nullable();
            $table->date("fechaEditado")->nullable();
            $table->date("fechaEliminado")->nullable();
            $table->integer("usuarioCreador")->nullable();
            $table->integer("usuarioEditor")->nullable();
            $table->integer("usuarioEliminador")->nullable();

            $table->foreign("reparacionID")->references("id")->on("reparacions")->onDelete("cascade");
            $table->foreign("productoID")->references("id")->on("productos")->onDelete("cascade");
           
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('detalle_reparacions');
    }
}
