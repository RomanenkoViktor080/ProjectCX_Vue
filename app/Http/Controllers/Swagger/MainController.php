<?php

namespace App\Http\Controllers\Swagger;

/**
 * @OA\Info(
 *     version="1.0.1",
 *     title="ProjectCX Vue"
 * )
 *
 * @OA\PathItem(
 *     path="/api"
 * )
 *
 * @OA\Components(
 *     @OA\SecurityScheme(
 *         securityScheme="bearerAuth",
 *         type="http",
 *         scheme="bearer"
 *     )
 * )
 */
class MainController
{
}
