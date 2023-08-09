<?php

namespace Database\Factories;

use App\Models\AttributeModel;
use App\Models\AttributeValueModel;
use Illuminate\Database\Eloquent\Factories\Factory;

class AttributeValueModelFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */

    protected $model = AttributeValueModel::class;
    public function definition(): array
    {
        return [
            'value' => $this->faker->unique()->company(),
        ];
    }
}
