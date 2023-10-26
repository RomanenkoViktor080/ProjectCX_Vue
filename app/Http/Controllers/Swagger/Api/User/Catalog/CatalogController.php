<?php

namespace App\Http\Controllers\Swagger\Api\User\Catalog;

/**
 * @OA\Get(
 *     path="/api/catalog-data",
 *     tags={"Категории"},
 *     summary="Получить каталог",
 *     @OA\Response(
 *         response=200,
 *         description="successful",
 *         @OA\JsonContent(
 *             @OA\Property(type="array", @OA\Items(
 *                 @OA\Property(property="id", type="integer"),
 *                 @OA\Property(property="title", type="string"),
 *                 @OA\Property(property="category_id", type="integer", nullable="true"),
 *                 @OA\Property(property="slug", type="string"),
 *                 @OA\Property(property="childrenCategories", type="array", @OA\Items(
 *                     @OA\Property(property="id", type="integer"),
 *                     @OA\Property(property="title", type="string"),
 *                     @OA\Property(property="category_id", type="integer", nullable="true"),
 *                     @OA\Property(property="slug", type="string"),
 *                     @OA\Property(property="childrenCategories", type="array", @OA\Items(
 *                         @OA\Property(property="id", type="integer"),
 *                         @OA\Property(property="title", type="string"),
 *                         @OA\Property(property="category_id", type="integer", nullable="true"),
 *                         @OA\Property(property="slug", type="string"),
 *                         @OA\Property(property="childrenCategories", type="array", @OA\Items()),
 *                     )),
 *                 )),
 *             )),
 *             example={
 *                 {
 *                     "id": 1,
 *                     "title": "title 1",
 *                     "category_id": null,
 *                     "slug": "title_1",
 *                     "childrenCategories": {
 *                         {
 *                             "id": 2,
 *                             "title": "title 2",
 *                             "category_id": 1,
 *                             "slug": "title_1",
 *                             "childrenCategories": {
 *                                 {
 *                                      "id": 4,
 *                                      "title": "title 4",
 *                                      "category_id": 2,
 *                                      "slug": "title_4",
 *                                      "childrenCategories": {}
 *                                  }
 *                             }
 *                         }
 *                     }
 *                 }
 *             }
 *         )
 *     )
 * )
 */
class CatalogController
{

}
