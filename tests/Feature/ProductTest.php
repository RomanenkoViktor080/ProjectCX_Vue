<?php

namespace Tests\Feature;

use App\Models\CategoryModel;
use App\Models\ProductImageModel;
use App\Models\ProductModel;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Ramsey\Uuid\Type\Integer;
use Tests\TestCase;

class ProductTest extends TestCase
{
    use RefreshDatabase;

    /**
     * @test
     */
    public function exist_product_get_card_data(): void
    {
        $product = ProductModel::factory()
            ->for(CategoryModel::factory(), 'category')
            ->create();;
        $response = $this->get("/api/product/$product->id");
        $response->assertStatus(200);
    }

    /**
     * @test
     */
    public function not_exist_product_get_card_data(): void
    {
        $response = $this->get('/api/product/1');
        $response->assertStatus(404);
    }

    /**
     * @test
     */
    public function exist_product_get_card_preview_data(): void
    {
        $product = ProductModel::factory()
            ->for(CategoryModel::factory(), 'category')
            ->create();
        $response = $this->get("/api/product-preview/$product->id");
        $response->assertStatus(200);
    }

    /**
     * @test
     */
    public function not_exist_product_get_card_preview_data(): void
    {
        $response = $this->get('/api/product-preview/1');
        $response->assertStatus(404);
    }

    /**
     * @test
     */
    public function get_all_product_data_card(): void
    {
        $productCount = 3;
        ProductModel::factory()
            ->for(CategoryModel::factory(), 'category')
            ->has(ProductImageModel::factory(), 'frontImage')
            ->count($productCount)
            ->create();
        $response = $this->get('/api/products');
        $response->assertStatus(200);
        $response->assertJsonCount($productCount);
        $this->assertDatabaseCount('products', $productCount);
    }
}
