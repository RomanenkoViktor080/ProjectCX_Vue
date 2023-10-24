<?php

namespace Database\Seeders;

use App\Models\AttributeModel;
use App\Models\AttributeTypeModel;
use App\Models\AttributeValueModel;
use App\Models\CategoryModel;
use App\Models\ProductModel;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $attributes = AttributeModel::all();
        $attributeValues = AttributeValueModel::all();
        $categoryAttributesCount = 10;
        $categoryAttributeValuesCount = 8;

        $categories = CategoryModel::query()->with('products')->get();
        /**
         *
         * @var CategoryModel $category
         * @var ProductModel $categoryProducts
         */
        foreach ($categories as $category) {
            //Атрибуты для связи с категорией
            $categoryAttributes = $attributes->random($categoryAttributesCount);
            //Значения атрибутов для связи с категорией
            $categoryAttributesValues = $attributeValues->random($categoryAttributeValuesCount * $categoryAttributesCount);

            $categoryProducts = $category->products;
            //Создание связи атрибутов категории
            $category->attributes()->attach($categoryAttributes);
            $category->attributeTitlesPivot->each(function ($query) use ($category, &$categoryAttributesValues, $categoryAttributeValuesCount, $categoryProducts) {
                $categoryAttributeProducts = $categoryProducts->random(round($categoryProducts->count() * 0.6));
                $currentCategoryAttributeValues = $categoryAttributesValues->random($categoryAttributeValuesCount);
                $categoryAttributesValues = $categoryAttributesValues->diff($currentCategoryAttributeValues);
                //Создание связи между значений атрибутов категории
                $query->attributeValues()->attach($currentCategoryAttributeValues, ['category_id' => $category->id, 'attribute_id' => $query->attribute_id]);
                //Создание связи атрибутов товаров с их значением
                $categoryAttributeProducts->each(function ($product) use ($currentCategoryAttributeValues, $query) {
                    $product->attributes()->attach($query->attribute_id, ['attribute_value_id' => $currentCategoryAttributeValues->random()->id]);
                });
            });
        }
    }
}
