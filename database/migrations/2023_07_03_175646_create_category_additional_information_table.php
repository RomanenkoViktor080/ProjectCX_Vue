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
        Schema::create('category_additional_information', function (Blueprint $table) {
            $table->id();
            $table->foreignId('category_id')
                ->index('category_additional_information_category_id-idx')->references('id')->on('categories');
            $table->string('image');
            $table->string('icon');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('category_additional_information');
    }
};
