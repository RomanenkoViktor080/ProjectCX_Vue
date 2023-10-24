<?php

namespace Database\Seeders;

use App\Models\CategoryAdditionalInformation;
use App\Models\CategoryModel;
use App\Models\ProductImageModel;
use App\Models\ProductModel;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //Генерация изображений товарара
        $productImages = ProductImageModel::factory()->count(5);
        //Генерация товаров с изображениями
        $products = ProductModel::factory()
            ->has($productImages, 'images')
            ->count(10);
        //Создание категорий, товаров категорий
        //Генерация категорий, вложенность 0
        CategoryModel::factory()->count(5)
            ->has($products, 'products')
            ->has(CategoryAdditionalInformation::factory(), 'additionalInformation')
            //Генерация категорий, вложенность 1
            ->has(CategoryModel::factory()->state(['depth' => 1])->count(6)
                ->has(CategoryAdditionalInformation::factory(), 'additionalInformation')
                ->has($products, 'products')
                //Генерация категорий, вложенность 2
                ->has(CategoryModel::factory()->state(['depth' => 2])->count(6)
                    ->has(CategoryAdditionalInformation::factory(), 'additionalInformation')
                    ->has($products, 'products')
                    //Генерация категорий, вложенность 3
                    ->has(CategoryModel::factory()->state(['depth' => 3])->count(2)
                        ->has(CategoryAdditionalInformation::factory(), 'additionalInformation')
                        ->has($products, 'products')
                        , 'childrenCategories')
                    , 'childrenCategories')
                , 'childrenCategories')
            ->create();
    }
}
