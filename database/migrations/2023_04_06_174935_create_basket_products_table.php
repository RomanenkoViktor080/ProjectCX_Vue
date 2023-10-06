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
        Schema::create('basket_products', function (Blueprint $table) {
            $table->id();
            $table->unsignedInteger('quantity')->default(1);
            $table->foreignId('product_id')
                ->index('basket_products_product_id-idx')
                ->references('id')->on('products')->cascadeOnDelete()->cascadeOnUpdate();
            $table->foreignId('user_id')
                ->index('basket_products_user_id-idx')
                ->references('id')->on('users')->cascadeOnDelete()->cascadeOnUpdate();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('basket_products');
    }
};
