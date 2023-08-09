<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('category_attribute_values', function (Blueprint $table) {
            $table->id();
            $table->foreignId('category_attribute_id')
                ->index('category_attribute_id-idx')
                ->references('id')->on('category_attributes')->cascadeOnDelete()->cascadeOnUpdate();
            $table->foreignId('attribute_value_id')
                ->index('attribute_value_id-idx')
                ->references('id')->on('attribute_values')->cascadeOnDelete()->cascadeOnUpdate();

            //для поиска всех значений атрибута для нескольких категорий (возможно вынести в отдельную таблицу)
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
        Schema::dropIfExists('category_attribute_values');
    }
};
