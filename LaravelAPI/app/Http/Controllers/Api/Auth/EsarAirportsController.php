<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use App\Models\EsarAirports;
use Facade\Ignition\Tabs\Tab;
use Illuminate\Http\Request;

class EsarAirportsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        try {

            $esar_airports = EsarAirports::paginate($request->paginator, ['*'], 'page', $request->page);
            if ($esar_airports) {
                return response([
                    'status' => 'success',
                    'code' => 1,
                    'data' => $esar_airports
                ], 200);
            } else {
                return response([
                    'status' => 'error',
                    'code' => 0,
                    'data' => "No record found"
                ], 404);
            }
        } catch (\Exception $exception) {
            return response([
                'status' => 'error',
                'code' => 0,
                'message' => "Failed to get esar_airports, please try again. {$exception->getMessage()}"
            ], 500);
        }
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request)
    {
    }



    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        try {
            $esar_airports = EsarAirports::create($request->all());
            $esar_airports->save();

            return response([
                'status' => 'success',
                'code' => 1,
                'data' => $esar_airports
            ], 200);
        } catch (\Exception $exception) {
            return response([
                'status' => 'error',
                'code' => 0,
                'message' => "Failed to store esar_airports, please try again. {$exception->getMessage()}"
            ], 500);
        }
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function search($search, Request $request)
    {
        try {
            $searchQuery = trim($search);
            $requestData = ['id','iata','icao','airport_name','arabic_airport_name','alternative_name','arabic_alternative_name','airport_city','arabic_airport_city','airport_state','arabic_airport_state','latitude','longitude','region'];
            $esar_airports = EsarAirports::where(function ($q) use ($requestData, $searchQuery) {
                foreach ($requestData as $field)
                    $q->orWhere($field, 'like', "%{$searchQuery}%");
            })->paginate($request->paginator, ['*'], 'page', $request->page);
            if ($esar_airports) {
                return response([
                    'status' => 'success',
                    'code' => 1,
                    'data' => $esar_airports
                ], 200);
            } else {
                return response([
                    'status' => 'error',
                    'code' => 0,
                    'data' => "No record found"
                ], 404);
            }
        } catch (\Exception $exception) {
            return response([
                'status' => 'error',
                'code' => 0,
                'message' => "Failed to get esar_airports, please try again. {$exception->getMessage()}"
            ], 500);
        }
    }
    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        try {
            $esar_airports = EsarAirports::where('id', '=', $id)->first();
            if ($esar_airports) {
                return response([
                    'status' => 'success',
                    'code' => 1,
                    'data' => $esar_airports
                ], 200);
            } else {

                return response([
                    'status' => 'error',
                    'code' => 0,
                    'message' => "No record found"
                ], 404);
            }
        } catch (\Exception $exception) {
            return response([
                'status' => 'error',
                'code' => 0,
                'message' => "Failed to get esar_airports data, please try again. {$exception->getMessage()}"
            ], 500);
        }
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        try {
            $input = $request->all();

            $esar_airports = EsarAirports::find($id);

           $esar_airports->iata = $input['iata'];$esar_airports->icao = $input['icao'];$esar_airports->airport_name = $input['airport_name'];$esar_airports->arabic_airport_name = $input['arabic_airport_name'];$esar_airports->alternative_name = $input['alternative_name'];$esar_airports->arabic_alternative_name = $input['arabic_alternative_name'];$esar_airports->airport_city = $input['airport_city'];$esar_airports->arabic_airport_city = $input['arabic_airport_city'];$esar_airports->airport_state = $input['airport_state'];$esar_airports->arabic_airport_state = $input['arabic_airport_state'];$esar_airports->latitude = $input['latitude'];$esar_airports->longitude = $input['longitude'];$esar_airports->region = $input['region'];

            $res = $esar_airports->update();
            if ($res) {
                return response([
                    'status' => 'success',
                    'code' => 1,
                    'data' => $esar_airports
                ], 200);
            }
            return response([
                'status' => 'error',
                'code' => 0,
                'data' => "Failed to update esar_airports"
            ], 500);
        } catch (\Exception $exception) {
            return response([
                'status' => 'error',
                'code' => 0,
                'message' => "Failed to update esar_airports, please try again. {$exception->getMessage()}"
            ], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        try {
            $res = EsarAirports::find($id)->delete();
            if ($res) {
                return response([
                    'status' => 'success',
                    'code' => 1,
                    'message' => "Deleted successfully"
                ], 200);
            } else {
                return response([
                    'status' => 'error',
                    'code' => 0,
                    'data' => "Failed to delete esar_airports"
                ], 500);
            }
        } catch (\Exception $exception) {
            return response([
                'status' => 'error',
                'code' => 0,
                'message' => "Failed to delete esar_airports, please try again. {$exception->getMessage()}"
            ], 500);
        }
    }
}

