<?php

namespace Database\Factories;

use App\Models\ProductImageModel;
use Illuminate\Database\Eloquent\Factories\Factory;

class ProductImageModelFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    protected $model = ProductImageModel::class;
    private int $position = 1;
    public function definition(): array
    {
        return [
            'path' => $this->faker->imageUrl(300, 400),
            'position' => $this->position++,
        ];
    }
}
