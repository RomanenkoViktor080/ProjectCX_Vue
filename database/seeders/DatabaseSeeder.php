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
        $this->call([
            CategorySeeder::class,
            AttributeSeeder::class,
            ProductSeeder::class,
            UserSeeder::class,
        ]);
    }
}

