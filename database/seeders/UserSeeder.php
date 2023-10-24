<?php

namespace Database\Seeders;

use App\Models\ProductModel;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        $basketProducts = ProductModel::all()->random(60);
        /**
         * @var User $user
         */

        $user = User::factory()->create([
            'email' => 'test@gmail.com',
            'password' => bcrypt('testps')
        ]);
        //Генерация связи корзины пользователя
        $user->basketProducts()
            ->attach($basketProducts->map(fn ($basketProduct) => ['product_id' => $basketProduct->id, 'quantity' => rand(1, 10)]));
    }
}
