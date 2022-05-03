<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateFacturasTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('facturas', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger("reparacionID");
            $table->unsignedBigInteger("tallerID");
            $table->date("fecha");
            $table->float("total");
            $table->float("itbis");
            $table->string("numero");

            $table->boolean("active")->default(true);
            $table->date("fechaCreado")->nullable();
            $table->date("fechaEditado")->nullable();
            $table->date("fechaEliminado")->nullable();
            $table->integer("usuarioCreador")->nullable();
            $table->integer("usuarioEditor")->nullable();
            $table->integer("usuarioEliminador")->nullable();

            $table->foreign("reparacionID")->references("id")->on("reparacions")->onDelete("cascade");
            $table->foreign("tallerID")->references("id")->on("tallers")->onDelete("cascade");
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('facturas');
    }
}
