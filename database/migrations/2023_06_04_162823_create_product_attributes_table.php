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
        Schema::create('product_attributes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('product_id')
                ->index('product_id-idx')
            ->references('id')->on('products')->cascadeOnDelete()->cascadeOnUpdate();

            $table->foreignId('attribute_id')
                ->index('attribute_id-idx')
                ->references('id')->on('attributes')->cascadeOnDelete()->cascadeOnUpdate();

            $table->foreignId('attribute_value_id')
                ->index('attribute_value_id-idx')
                ->references('id')->on('attribute_values')->cascadeOnDelete()->cascadeOnUpdate();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('product_attributes');
    }
};
