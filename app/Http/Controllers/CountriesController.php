<?php

namespace App\Http\Controllers;

use App\Models\Countries;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CountriesController extends Controller {
    public function index(Request $request, Countries $countries) {
        $country = $countries->newQuery();
        $q = $request->query();
        if (empty($q)) {
            return Countries::with('states')->paginate(15);
        } else {
            if ($request->has('name')) {
                $country->where('name', $q['name']);
            }
            if ($request->has('code')) {
                $country->where('code', $q['code']);
            }
            if ($request->has('continent')) {
                $country->where('continent', $q['continent']);
            }

            $response = $country->with('states')->get();
            return $response->count() <= 0 ? response()->json([
                'message' => 'Data not found'
            ], 404) : $response;
        }
    }

    public function store(Request $request) {
        $request->validate([
            'name' => 'required|max:50|string|min:1',
            'code' => 'string|required|max:2|min:2',
            'continent' => 'string|required|max:2|min:2',
        ]);

        $data = Countries::create([
            'name' => $request->name,
            'code' => $request->code,
            'continent' => $request->continent
        ]);

        if ($request->wantsJson()) {
            return response()->json([
                'message' => 'Country successfully created',
                'data' => $data
            ]);
        } else {
            return redirect()->back();
        }

    }

    public function show(Request $request, $id) {
        $country = Countries::where('id', $id)->with(['states', 'states.country'])->first();
        if ($request->wantsJson()) {
            if ($country === null) {
                return response()->json([
                    'message' => 'data not found'
                ], 404);
            }
            return response()->json([
                'data' => $country
            ]);
        } else {
            return Inertia::render('Country/CountryDetail', [
                'countryData' => $country
            ]);
        }
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

        if ($request->wantsJson()) {
            return response()->json([
                'message' => 'Country Successfully Updated',
                'data' => $country
            ]);
        } else {
            return redirect()->back();
        }

    }

    public function destroy(Request $request, $id) {
        Countries::find($id)->delete();
        if ($request->wantsJson()) {
            return response()->json([
                'message' => 'Country successfully deleted',
            ]);
        } else {
            return to_route('home');
        }
    }
}