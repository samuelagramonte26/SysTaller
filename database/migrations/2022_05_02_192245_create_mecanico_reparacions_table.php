<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMecanicoReparacionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('mecanico_reparacions', function (Blueprint $table) {
            $table->id();
           $table->unsignedBigInteger("mecanicoID");
           $table->unsignedBigInteger("reparacionID");
           $table->boolean("estado")->default(true);
           $table->boolean("active")->default(true);
            $table->date("fechaCreado")->nullable();
            $table->date("fechaEditado")->nullable();
            $table->date("fechaEliminado")->nullable();
            $table->integer("usuarioCreador")->nullable();
            $table->integer("usuarioEditor")->nullable();
            $table->integer("usuarioEliminador")->nullable();

            $table->foreign("reparacionID")->references("id")->on("reparacions")->onDelete("cascade");
            $table->foreign("mecanicoID")->references("id")->on("mecanicos")->onDelete("cascade");
           
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('mecanico_reparacions');
    }
}
