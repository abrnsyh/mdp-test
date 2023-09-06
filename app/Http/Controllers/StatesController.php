<?php

namespace App\Http\Controllers;

use App\Models\States;
use Illuminate\Http\Request;
use Inertia\Inertia;

class StatesController extends Controller {
    public function store(Request $request) {
        $request->validate([
            'name' => 'required|max:50|string|min:1',
            'country_id' => 'integer|required',
            'code' => 'integer|nullable',
            'kepulauan_code' => 'integer|nullable',
            'bagian' => 'string|min:3|nullable',
        ]);

        States::create([
            'name' => $request->name,
            'country_id' => $request->country_id,
            'code' => $request->code,
            'kepulauan_code' => $request->kepulauan_code,
            'bagian' => $request->bagian,
        ]);
        return redirect()->back();
    }

    public function show($id) {
        $state = States::where('id', $id)->with('country')->first();
        return Inertia::render('State/StateDetail', [
            'stateData' => $state
        ]);
    }
    public function update(Request $request, $id) {
        $request->validate([
            'name' => 'required|max:50|string|min:1',
            'country_id' => 'integer|required',
            'code' => 'integer|nullable',
            'kepulauan_code' => 'integer|nullable',
            'bagian' => 'string|min:3|nullable',
        ]);

        $state = States::find($id);
        $state->name = $request->name;
        $state->country_id = $request->country_id;
        $state->code = $request->code;
        $state->kepulauan_code = $request->kepulauan_code;
        $state->bagian = $request->bagian;

        $state->save();
        return redirect()->back();
    }

    public function destroy($id) {
        States::find($id)->delete();
        return to_route('home');
    }
}