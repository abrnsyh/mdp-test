<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CountriesController;
use App\Http\Controllers\StatesController;
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


Route::prefix('v1')->group(function () {
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);

    Route::middleware('auth:api')->group(function () {
        Route::controller(CountriesController::class)->group(function () {
            Route::post('/countries', 'store');
            Route::put('/countries/{id}', 'update');
            Route::delete('/countries/{id}', 'destroy');
        });
        Route::controller(StatesController::class)->group(function () {
            Route::post('/states', 'store');
            Route::put('/states/{id}', 'update');
            Route::delete('/states/{id}', 'destroy');
        });
    });

    Route::controller(CountriesController::class)->group(function () {
        Route::get('/countries', 'index');
        Route::get('/countries/{id}', 'show');
    });

    Route::controller(StatesController::class)->group(function () {
        Route::get('/states', 'index');
        Route::get('/states/{id}', 'show');
    });
});