<?php

namespace App\Http\Controllers;

use App\Models\States;
use Illuminate\Http\Request;
use Inertia\Inertia;

class StatesController extends Controller {

    public function index(Request $request, States $states) {
        $state = $states->newQuery();
        $q = $request->query();

        if (empty($q)) {
            return States::with('country')->paginate(15);
        } else {
            if ($request->has('name')) {
                $state->where('name', $q['name']);
            }
            if ($request->has('code')) {
                $state->where('code', $q['code']);
            }
            if ($request->has('kepulauan-code')) {
                $state->where('kepulauan_code', $q['kepulauan-code']);
            }
            if ($request->has('bagian')) {
                $state->where('bagian', $q['bagian']);
            }

            $response = $state->with('country')->get();
            return $response->count() <= 0 ? response()->json([
                'message' => 'Data not found'
            ], 404) : $response;
        }
    }

    public function store(Request $request) {
        $request->validate([
            'name' => 'required|max:50|string|min:1',
            'country_id' => 'integer|required',
            'code' => 'integer|nullable',
            'kepulauan_code' => 'integer|nullable',
            'bagian' => 'string|min:3|nullable',
        ]);

        $data = States::create([
            'name' => $request->name,
            'country_id' => $request->country_id,
            'code' => $request->code,
            'kepulauan_code' => $request->kepulauan_code,
            'bagian' => $request->bagian,
        ]);

        if ($request->wantsJson()) {
            return response()->json([
                'message' => 'State successfully created',
                'data' => $data
            ]);
        } else {
            return redirect()->back();
        }
    }

    public function show(Request $request, $id) {
        $state = States::where('id', $id)->with('country')->first();
        if ($request->wantsJson()) {
            if ($state === null) {
                return response()->json([
                    'message' => 'data not found'
                ], 404);
            }
            return response()->json([
                'data' => $state
            ]);
        } else {
            return Inertia::render('State/StateDetail', [
                'stateData' => $state
            ]);
        }
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

        if ($request->wantsJson()) {
            return response()->json([
                'message' => 'State Successfully Updated',
                'data' => $state
            ]);
        } else {
            return redirect()->back();
        }
    }

    public function destroy(Request $request, $id) {
        States::find($id)->delete();
        if ($request->wantsJson()) {
            return response()->json([
                'message' => 'State successfully deleted',
            ]);
        } else {
            return to_route('home');
        }
    }
}