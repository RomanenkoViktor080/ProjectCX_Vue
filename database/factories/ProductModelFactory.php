<?php

namespace Database\Factories;

use App\Models\ProductModel;
use Illuminate\Database\Eloquent\Factories\Factory;

class ProductModelFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    protected $model = ProductModel::class;

    public function definition(): array
    {
        return [
            'title' => $this->faker->company(),
            'description' => $this->faker->text(),
            'price' => $this->faker->numberBetween(1, 10000),
        ];
    }
}
