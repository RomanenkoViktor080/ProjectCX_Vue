<?php

namespace Tests\Feature;

use App\Models\CategoryModel;
use App\Models\ProductImageModel;
use App\Models\ProductModel;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class BasketTest extends TestCase
{
    use RefreshDatabase;

    /**
     * @test
     */
    public function authorized_user_add_exist_product_to_basket(): void
    {
        $user = User::factory()->create();
        $product = ProductModel::factory()
            ->has(ProductImageModel::factory(), 'frontImage')
            ->for(CategoryModel::factory(), 'category')
            ->create();
        $response = $this->actingAs($user)->post('/api/basket', ['productId' => $product->id]);

        $response->assertStatus(200);
        $this->assertDatabaseCount('basket_products', 1);
    }

    /**
     * @test
     */
    public function unauthorized_user_add_exist_product_to_basket(): void
    {
        $product = ProductModel::factory()
            ->has(ProductImageModel::factory(), 'frontImage')
            ->for(CategoryModel::factory(), 'category')
            ->create();
        $response = $this->post('/api/basket', ['productId' => $product->id]);

        $response->assertStatus(200);
        $this->assertDatabaseCount('basket_products', 0);
    }

    /**
     * @test
     */
    public function add_not_exist_product_to_basket(): void
    {
        $response = $this->post('/api/basket', ['productId' => 1]);
        $response->assertStatus(404);
    }

    /**
     * @test
     */
    public function authorized_user_delete_not_exist_product_from_basket(): void
    {
        $user = User::factory()->create();
        $response = $this->actingAs($user)->delete('/api/basket/1');

        $response->assertNotFound();
    }

    /**
     * @test
     */
    public function authorized_user_delete_exist_product_from_basket(): void
    {
        $user = User::factory()
            ->has(ProductModel::factory()
                ->has(ProductImageModel::factory(), 'frontImage')
                ->for(CategoryModel::factory(), 'category'), 'basketProducts')
            ->create();
        $this->assertDatabaseCount('basket_products', 1);
        $response = $this->actingAs($user)->delete('/api/basket/1');
        $response->assertNoContent();
        $this->assertDatabaseCount('basket_products', 0);
    }

    /**
     * @test
     */
    public function unauthorized_user_delete_exist_product_from_basket(): void
    {
        $product = ProductModel::factory()
            ->has(ProductImageModel::factory(), 'frontImage')
            ->for(CategoryModel::factory(), 'category')
            ->create();
        $response = $this->delete("/api/basket/$product->id");
        $response->assertUnauthorized();
    }

    /**
     * @test
     */
    public function unauthorized_user_delete_not_exist_product_from_basket(): void
    {
        $response = $this->delete('/api/basket/1');
        $response->assertNotFound();
    }
    /**
     * @test
     */
    public function authorized_user_change_quantity_for_not_exist_product_from_basket(): void
    {
        $user = User::factory()->create();
        $response = $this->actingAs($user)->patch('/api/basket/1/quantity');
        $response->assertNotFound();
    }
    /**
     * @test
     */
    public function authorized_user_change_quantity_for_exist_product_from_basket(): void
    {
        $user = User::factory()
            ->has(ProductModel::factory()
                ->has(ProductImageModel::factory(), 'frontImage')
                ->for(CategoryModel::factory(), 'category'), 'basketProducts')
            ->create();
        $product = $user->basketProducts()->first();
        $response = $this->actingAs($user)->patch("/api/basket/$product->id/quantity", ['quantity' => rand(1, 10)]);
        $response->assertOk();
    }
    /**
     * @test
     */
    public function unauthorized_user_change_quantity_for_not_exist_product_from_basket(): void
    {
        $response = $this->patch('/api/basket/1/quantity', ['quantity' => rand(1, 10)]);
        $response->assertNotFound();
    }
}
