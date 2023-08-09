<?php

namespace Database\Factories;

use App\Models\CategoryModel;
use Illuminate\Database\Eloquent\Factories\Factory;

class CategoryFilterModelFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    protected $model = CategoryModel::class;
    public function definition(): array
    {
        return [
            //
        ];
    }
}
