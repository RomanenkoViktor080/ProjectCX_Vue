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
        Schema::create('category_attributes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('category_id')
                ->index('category_id-idx')
                ->references('id')->on('categories')->cascadeOnDelete()->cascadeOnUpdate();
            $table->foreignId('attribute_id')
                ->index('attribute_id-idx')
                ->references('id')->on('attributes')->cascadeOnDelete()->cascadeOnUpdate();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('category_attributes');
    }
};
