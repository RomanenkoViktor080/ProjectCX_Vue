<?php

namespace Database\Seeders;

use App\Models\AttributeModel;
use App\Models\AttributeTypeModel;
use App\Models\AttributeValueModel;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class AttributeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        AttributeModel::factory()->count(1000)
            ->has(AttributeTypeModel::factory(), 'attributeType')
            ->create();

        AttributeValueModel::factory()->count(5000)->create();
    }
}
