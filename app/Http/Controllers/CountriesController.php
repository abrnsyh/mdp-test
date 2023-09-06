<?php

namespace App\Http\Controllers;

use App\Models\Countries;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CountriesController extends Controller {
    public function store(Request $request) {
        $request->validate([
            'name' => 'required|max:50|string|min:1',
            'code' => 'string|required|max:2|min:2',
            'continent' => 'string|required|max:2|min:2',
        ]);

        Countries::create([
            'name' => $request->name,
            'code' => $request->code,
            'continent' => $request->continent
        ]);

        return redirect()->back();
    }

    public function show($id) {
        $country = Countries::where('id', $id)->with(['states', 'states.country'])->first();
        return Inertia::render('Country/CountryDetail', [
            'countryData' => $country
        ]);
    }

    public function update(Request $request, $id) {
        $request->validate([
            'name' => 'required|max:50|string|min:1',
            'code' => 'string|required|max:2|min:2',
            'continent' => 'string|required|max:2|min:2',
        ]);
        $country = Countries::find($id);

        $country->name = $request->name;
        $country->code = $request->code;
        $country->continent = $request->continent;
        $country->save();

        return redirect()->back();
    }

    public function destroy($id) {
        Countries::find($id)->delete();
        return to_route('home');
    }
}