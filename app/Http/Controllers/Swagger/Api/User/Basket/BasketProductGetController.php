<?php

namespace App\Http\Controllers\Swagger\Api\User\Basket;

/**
 * @OA\Post(
 *     path="/api/basket-data",
 *     tags={"Корзина"},
 *     summary="Получить товары корзины",
 *     security={{"bearerAuth":{}}},
 *     @OA\RequestBody(
 *        description="Для получения данных корзины неавторизированого пользователя",
 *        @OA\JsonContent(
 *            @OA\Property(property="products", type="array", @OA\Items(
 *                @OA\Property(property="id", type="integer"),
 *                @OA\Property(property="quantity", type="integer"),
 *            )),
 *            example={
 *                "products" : {
 *                    {
 *                        "id": 1,
 *                        "quantity": 2
 *                    },
 *                    {
 *                         "id": 4,
 *                         "quantity": 5
 *                    }
 *                }
 *              }
 *           )
 *       ),
 *     @OA\Response(
 *         response="200",
 *         description="successful",
 *         @OA\JsonContent(
 *             @OA\Property(type="array", @OA\Items(
 *                 @OA\Property(property="id", type="integer"),
 *                 @OA\Property(property="title", type="string"),
 *                 @OA\Property(property="price", type="integer"),
 *                 @OA\Property(property="frontImage", type="string"),
 *                 @OA\Property(property="quantity", type="integer"),
 *             )),
 *             example={
 *                 {
 *                     "id": 1,
 *                     "title": "Conn-Beer",
 *                     "price": 3553,
 *                     "frontImage": "https://via.placeholder.com/300x400.png/00ffee?text=laudantium",
 *                     "quantity": 2,
 *                 },
 *                 {
 *                      "id": 4,
 *                      "title": "Bergnaum, Little and Gleason",
 *                      "price": 3603,
 *                      "frontImage": "https://via.placeholder.com/300x400.png/0088ff?text=architecto",
 *                      "quantity": 5,
 *                  }
 *             }
 *         ),
 *     )
 * )
 */
class BasketProductGetController
{

}
