<?php

use App\Http\Controllers\CountriesController;
use App\Http\Controllers\StatesController;
use App\Models\Countries;
use App\Models\States;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    $country = Countries::with('states')->get();
    $states = States::with('country')->get();
    return Inertia::render('Welcome', [
        'country' => $country,
        'states' => $states
    ]);
})->name('home');

Route::controller(CountriesController::class)->group(function () {
    Route::get('/country/{id}', 'show')->name('country.show');
    Route::post('/country', 'store')->name('country.store');
    Route::put('/country/{id}', 'update')->name('country.update');
    Route::delete('/country/{id}', 'destroy')->name('country.destroy');
});

Route::controller(StatesController::class)->group(function () {
    Route::get('/state/{id}', 'show')->name('state.show');
    Route::post('/state', 'store')->name('state.store');
    Route::put('/state/{id}', 'update')->name('state.update');
    Route::delete('/state/{id}', 'destroy')->name('state.destroy');
});