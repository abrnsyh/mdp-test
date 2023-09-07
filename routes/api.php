<?php

use App\Http\Controllers\CountriesController;
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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::prefix('v1')->group(function () {
    Route::get('/countries', [CountriesController::class, 'index']);
    Route::get('/countries/{id}', [CountriesController::class, 'show']);
    Route::post('/countries', [CountriesController::class, 'store']);
    Route::put('/countries/{id}', [CountriesController::class, 'update']);
    Route::delete('/countries/{id}', [CountriesController::class, 'destroy']);
});