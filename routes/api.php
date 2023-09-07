<?php

use App\Http\Controllers\CountriesController;
use App\Http\Controllers\StatesController;
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
    Route::controller(CountriesController::class)->group(function () {
        Route::get('/countries', 'index');
        Route::get('/countries/{id}', 'show');
        Route::post('/countries', 'store');
        Route::put('/countries/{id}', 'update');
        Route::delete('/countries/{id}', 'destroy');
    });

    Route::controller(StatesController::class)->group(function () {
        Route::get('/states', 'index');
        Route::get('/states/{id}', 'show');
        Route::post('/states', 'store');
        Route::put('/states/{id}', 'update');
        Route::delete('/states/{id}', 'destroy');
    });
});