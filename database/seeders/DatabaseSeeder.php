<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\AttributeModel;
use App\Models\AttributeTypeModel;
use App\Models\AttributeValueModel;
use App\Models\CategoryAdditionalInformation;
use App\Models\CategoryModel;
use App\Models\ProductImageModel;
use App\Models\ProductModel;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        //Создание картинок
        $productImages = ProductImageModel::factory()->count(5);
        //Создание товаров со связью с картинками
        $products = ProductModel::factory()
            ->has($productImages, 'images')
            ->count(10);
        //Создание категорий, товаров для категорий, картинок для товаров
        //Категории, глубина 0
        CategoryModel::factory()->count(5)
            ->has($products, 'products')
            ->has(CategoryAdditionalInformation::factory(), 'additionalInformation')
            //Категории, глубина 1
            ->has(CategoryModel::factory()->state(['depth' => 1])->count(9)
                ->has(CategoryAdditionalInformation::factory(), 'additionalInformation')
                ->has($products, 'products')
                //Категории, глубина 2
                ->has(CategoryModel::factory()->state(['depth' => 2])->count(9)
                    ->has(CategoryAdditionalInformation::factory(), 'additionalInformation')
                    ->has($products, 'products')
                    //Категории, глубина 3
                    ->has(CategoryModel::factory()->state(['depth' => 3])->count(3)
                        ->has(CategoryAdditionalInformation::factory(), 'additionalInformation')
                        ->has($products, 'products')
                        , 'childrenCategories')
                    , 'childrenCategories')
                , 'childrenCategories')
            ->create();

        //Создание атрибутов, значений атрибутов, настройка количества атрибутов для каждой категории и количество значений для каждого атрибута категории
        $attributes = AttributeModel::factory()->count(1000)
            ->has(AttributeTypeModel::factory(), 'attributeType')
            ->create();
        $attributeValues = AttributeValueModel::factory()->count(5000)->create();
        $categoryAttributesCount = 5;
        $categoryAttributeValuesCount = 5;

        $categories = CategoryModel::all();
        /**
         * !Создание cвязи между категориями и аттрибутами, а также между аттрибутами и зих значениями!
         * @var CategoryModel $category
         * @var ProductModel $categoryProducts
         */
        foreach ($categories as $category) {
            //Аттрибуты и их значения для заданной категории и их товаров
            $categoryAttributes = $attributes->random($categoryAttributesCount);
            $categoryAttributesValues = $attributeValues->random($categoryAttributeValuesCount * $categoryAttributesCount);
            //Все товары категории
            $categoryProducts = $category->products;
            //Заполнение таблицы с атрибутами категории
            $category->attributeTitles()->attach($categoryAttributes);
            //Заполнение таблиц с значениями атрибутов категории, атрибутов товаров категории
            $category->attributeTitlesPivot->each(function ($query) use ($category, &$categoryAttributesValues, $categoryAttributeValuesCount, $categoryProducts) {
                $categoryAttributeProducts = $categoryProducts->random(round($categoryProducts->count() * 0.6));
                $currentCategoryAttributeValues = $categoryAttributesValues->random($categoryAttributeValuesCount);
                $categoryAttributesValues = $categoryAttributesValues->diff($currentCategoryAttributeValues);
                //Заполнение таблицы значений аттрибутов категории
                $query->attributeValues()->attach($currentCategoryAttributeValues, ['category_id' => $category->id, 'attribute_id' => $query->attribute_id]);
                //Заполнение таблицы атрибутов товаров
                $categoryAttributeProducts->each(function ($product) use ($currentCategoryAttributeValues, $query) {
                    $product->attributes()->attach($query->attribute_id, ['attribute_value_id' => $currentCategoryAttributeValues->random()->id]);
                });
            });
        }

        $basketProducts = ProductModel::all()->shuffle()->take(60);
        /**
         * @var User $user
         */

        $user = User::factory()->create();
        //Заполнение таблицы корзины для пользователя
        $user->basketProducts()
            ->attach($basketProducts->map(function ($basketProduct) {
                return ['product_id' => $basketProduct->id, 'quantity' => rand(1, 10)];
            }));

    }
}

