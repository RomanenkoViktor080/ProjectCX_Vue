<?php

namespace Database\Factories;

use App\Models\AttributeModel;
use Illuminate\Database\Eloquent\Factories\Factory;

class AttributeModelFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    protected $model = AttributeModel::class;

    public function definition(): array
    {
        return [
            'title' => $this->faker->unique()->company(),
        ];
    }
}
