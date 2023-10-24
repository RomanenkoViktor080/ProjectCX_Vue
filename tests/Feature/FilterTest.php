<?php

namespace Tests\Feature;

use App\Models\AttributeModel;
use App\Models\AttributeTypeModel;
use App\Models\AttributeValueModel;
use App\Models\CategoryModel;
use App\Models\ProductImageModel;
use App\Models\ProductModel;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class FilterTest extends TestCase
{
    use RefreshDatabase;

    /**
     * @test
     */
    public function get_filtered_product_for_exists_category(): void
    {
        $expectedQuantityProducts = 5;
        $attributeValue = AttributeValueModel::factory()->count(10)->create()->first();
        $products = ProductModel::factory()
            ->count($expectedQuantityProducts * 2)
            ->has(ProductImageModel::factory(), 'frontImage')
            ->for(CategoryModel::factory()
                ->has(AttributeModel::factory()
                    ->has(AttributeTypeModel::factory(), 'attributeType'), 'attributes')
                , 'category')
            ->create();
        $attribute = AttributeModel::query()->first();
        $products->random($expectedQuantityProducts)->each(function ($product) use ($attributeValue, $attribute) {
            $product->attributes()->attach($attribute->id, ['attribute_value_id' => $attributeValue->id]);
        });

        ProductModel::factory()
            ->count(10)
            ->has(ProductImageModel::factory(), 'frontImage')
            ->for(CategoryModel::factory()
                ->has(AttributeModel::factory()
                    ->has(AttributeTypeModel::factory(), 'attributeType'), 'attributes')
                , 'category')
            ->create();

        $category = CategoryModel::query()->first();

        $response = $this->get("/api/catalog/$category->slug?$attribute->slug=$attributeValue->id");
        $response->assertStatus(200);
        $this->assertEquals($response->original->count(), $expectedQuantityProducts);

    }

    /**
     * @test
     */
    public function get_filtered_product_for_not_exists_category(): void
    {
        $response = $this->get("/api/catalog/not-exists-category");
        $response->assertNotFound();
    }

    /**
     * @test
     */
    public function get_category_filter_data_for_exists_category(): void
    {
        $expectedQuantityAttributes = 5;
        $category = CategoryModel::factory()->count(2)
            ->has(ProductModel::factory()->count(10), 'products')
            ->has(AttributeModel::factory()->count($expectedQuantityAttributes)
                ->has(AttributeTypeModel::factory(), 'attributeType'), 'attributes')
            ->create()->first();
        $attributeValues = AttributeValueModel::factory()->count(5)->create();

        $products = $category->products;

        $category->attributeTitlesPivot->each(function ($query) use ($category, $attributeValues, $products) {
            $currentAttributeValue = $attributeValues->random();
            $query->attributeValues()->attach($currentAttributeValue->id, ['category_id' => $category->id, 'attribute_id' => $query->attribute_id]);
            $products->each(function ($product) use ($currentAttributeValue, $query) {
                $product->attributes()->attach($query->attribute_id, ['attribute_value_id' => $currentAttributeValue->id]);
            });
        });


        $response = $this->get("/api/catalog/filter-data/$category->slug");
        $response->assertStatus(200);
//      $expectedQuantityAttributes + 1 так как генерируется дополнительный атрибут для фильтрации по цене
        $this->assertEquals($response->original->count(), $expectedQuantityAttributes + 1);

    }

    /**
     * @test
     */
    public function get_category_filter_data_for_not_exists_category(): void
    {
        $response = $this->get("/api/catalog/filter-data/not-exists-category");
        $response->assertNotFound();
    }
}
