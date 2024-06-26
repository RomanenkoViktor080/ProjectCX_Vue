<?php

use App\Http\Controllers\Api\User\AuthenticationController;
use App\Http\Controllers\Api\User\Basket\BasketProductChangeQuantityController;
use App\Http\Controllers\Api\User\Basket\BasketProductDeleteController;
use App\Http\Controllers\Api\User\Basket\BasketProductGetController;
use App\Http\Controllers\Api\User\Basket\BasketProductStoreController;
use App\Http\Controllers\Api\User\Catalog\CatalogController;
use App\Http\Controllers\Api\User\Catalog\FilterDataController;
use App\Http\Controllers\Api\User\Catalog\SorterDataController;
use App\Http\Controllers\Api\User\Product\ProductAllController;
use App\Http\Controllers\Api\User\Product\ProductFilterController;
use App\Http\Controllers\Api\User\Product\ProductGetController;
use App\Http\Controllers\Api\User\Product\ProductGetPreviewController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/


//Маршруты аутентификация и выхода из аккаунта
Route::post('/sign-in', [AuthenticationController::class, 'login']);
Route::post('/sign-up', [AuthenticationController::class, 'register']);

//Получения информации о пользователе
Route::get('/user', [AuthenticationController::class, 'check']);

//Маршрут для получения данных странички товара
Route::get('/product/{product}', ProductGetController::class);
//Маршрут для получения данных товара (краткая информация в popup)
Route::get('/product-preview/{product}', ProductGetPreviewController::class);
//Маршрут для получения всех товаров
Route::get('/products', ProductAllController::class);
//Маршрут для получения данных фильтра категории
Route::get('/catalog/filter-data/{category}', FilterDataController::class);
//Маршрут для получения отфильтрованных товаров
Route::get('/catalog/{category}', ProductFilterController::class);
//Информация для блока с сортировкой товаров
Route::get('/sorter-data', SorterDataController::class);

//Маршрут получения данных каталога
Route::get('/catalog-data', CatalogController::class);

//Start Работа с корзиной
//Маршрут для добавления товара в корзину
Route::post('/basket', BasketProductStoreController::class);
//Получение данных корзины
Route::post('/basket-data', BasketProductGetController::class);
//Маршрут для удаления товара из корзины
Route::delete('/basket/{product}', BasketProductDeleteController::class)->middleware(['middleware' => 'auth.api']);
//Маршрут для изменения количеств товара в корзине пользователя
Route::patch('/basket/{product}/quantity', BasketProductChangeQuantityController::class)->middleware(['middleware' => 'auth.api']);
//End Работа с корзиной


// Маршруты только для аутентифицированных пользователей
Route::group(['middleware' => 'auth.api'], function () {
    Route::post('/logout', [AuthenticationController::class, 'logout']);
});


// отправка письма полсе аутентивикации или после запроса на смену пароль, также повторноя отпрака письма (!в разработке!)


/*
Route::get('/email/verify/{id}/{hash}', [VerifyEmailController::class, '__invoke'])
    ->middleware(['signed', 'throttle:6,1'])
    ->name('verification.verify');
*/

Route::get('/email/verify/{id}/{hash}', function (Request $request) {
    return 0;
})->middleware(['signed', 'throttle:6,1'])->name('verification.verify');

// Resend link to verify email
Route::post('/email/verify/resend', function (Request $request) {
    return 0;
    /*
    $request->user()->sendEmailVerificationNotification();
        return back()->with('message', 'Verification link sent!');
    */
})->middleware(['auth:api', 'throttle:6,1'])->name('verification.send');
