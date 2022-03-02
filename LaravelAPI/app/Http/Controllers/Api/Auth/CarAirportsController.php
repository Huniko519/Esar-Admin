<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use App\Models\CarAirports;
use Facade\Ignition\Tabs\Tab;
use Illuminate\Http\Request;

class CarAirportsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        try {

            $car_airports = CarAirports::paginate($request->paginator, ['*'], 'page', $request->page);
            if ($car_airports) {
                return response([
                    'status' => 'success',
                    'code' => 1,
                    'data' => $car_airports
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
                'message' => "Failed to get car_airports, please try again. {$exception->getMessage()}"
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
            $car_airports = CarAirports::create($request->all());
            $car_airports->save();

            return response([
                'status' => 'success',
                'code' => 1,
                'data' => $car_airports
            ], 200);
        } catch (\Exception $exception) {
            return response([
                'status' => 'error',
                'code' => 0,
                'message' => "Failed to store car_airports, please try again. {$exception->getMessage()}"
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
            $requestData = ['id','car_id','airport_name','arabic_airport_name','airport_city','arabic_airport_city','airport_state','arabic_airport_state','latitude','longitude','region','delivery_fee','work_on_airport','created_at','updated_at'];
            $car_airports = CarAirports::where(function ($q) use ($requestData, $searchQuery) {
                foreach ($requestData as $field)
                    $q->orWhere($field, 'like', "%{$searchQuery}%");
            })->paginate($request->paginator, ['*'], 'page', $request->page);
            if ($car_airports) {
                return response([
                    'status' => 'success',
                    'code' => 1,
                    'data' => $car_airports
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
                'message' => "Failed to get car_airports, please try again. {$exception->getMessage()}"
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
            $car_airports = CarAirports::where('id', '=', $id)->first();
            if ($car_airports) {
                return response([
                    'status' => 'success',
                    'code' => 1,
                    'data' => $car_airports
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
                'message' => "Failed to get car_airports data, please try again. {$exception->getMessage()}"
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

            $car_airports = CarAirports::find($id);

           $car_airports->car_id = $input['car_id'];$car_airports->airport_name = $input['airport_name'];$car_airports->arabic_airport_name = $input['arabic_airport_name'];$car_airports->airport_city = $input['airport_city'];$car_airports->arabic_airport_city = $input['arabic_airport_city'];$car_airports->airport_state = $input['airport_state'];$car_airports->arabic_airport_state = $input['arabic_airport_state'];$car_airports->latitude = $input['latitude'];$car_airports->longitude = $input['longitude'];$car_airports->region = $input['region'];$car_airports->delivery_fee = $input['delivery_fee'];$car_airports->work_on_airport = $input['work_on_airport'];$car_airports->created_at = $input['created_at'];$car_airports->updated_at = $input['updated_at'];

            $res = $car_airports->update();
            if ($res) {
                return response([
                    'status' => 'success',
                    'code' => 1,
                    'data' => $car_airports
                ], 200);
            }
            return response([
                'status' => 'error',
                'code' => 0,
                'data' => "Failed to update car_airports"
            ], 500);
        } catch (\Exception $exception) {
            return response([
                'status' => 'error',
                'code' => 0,
                'message' => "Failed to update car_airports, please try again. {$exception->getMessage()}"
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
            $res = CarAirports::find($id)->delete();
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
                    'data' => "Failed to delete car_airports"
                ], 500);
            }
        } catch (\Exception $exception) {
            return response([
                'status' => 'error',
                'code' => 0,
                'message' => "Failed to delete car_airports, please try again. {$exception->getMessage()}"
            ], 500);
        }
    }
}

