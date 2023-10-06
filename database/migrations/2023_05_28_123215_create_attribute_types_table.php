<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('attribute_types', function (Blueprint $table) {
            $table->id();
            $table->foreignId('attribute_id')
                ->index('attribute_types_attribute_id-idx')
                ->references('id')->on('attributes')->cascadeOnDelete()->cascadeOnUpdate();
            $table->unsignedInteger('type');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('attribute_types');
    }
};
