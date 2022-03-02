<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use App\Models\TripCars;
use Facade\Ignition\Tabs\Tab;
use Illuminate\Http\Request;

class TripCarsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        try {

            $trip_cars = TripCars::paginate($request->paginator, ['*'], 'page', $request->page);
            if ($trip_cars) {
                return response([
                    'status' => 'success',
                    'code' => 1,
                    'data' => $trip_cars
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
                'message' => "Failed to get trip_cars, please try again. {$exception->getMessage()}"
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
            $trip_cars = TripCars::create($request->all());
            $trip_cars->save();

            return response([
                'status' => 'success',
                'code' => 1,
                'data' => $trip_cars
            ], 200);
        } catch (\Exception $exception) {
            return response([
                'status' => 'error',
                'code' => 0,
                'message' => "Failed to store trip_cars, please try again. {$exception->getMessage()}"
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
            $requestData = ['id','trip_id','car_id','car_manufacturer','car_manufacturer_arabic','car_model','color','model_seats','model_doors','model_engine_fuel','gas_grade','model_lkm_city','model_lkm_hwy','hybrid','bike_rack','all_drive','child_seat','gps','ski_rack','bluetooth','usb','ventilated_seat','audio_input','convertible','toll_pass','sunroof','car_title','car_description','car_guidelines','original_image_path','small_image_path','created_at','updated_at'];
            $trip_cars = TripCars::where(function ($q) use ($requestData, $searchQuery) {
                foreach ($requestData as $field)
                    $q->orWhere($field, 'like', "%{$searchQuery}%");
            })->paginate($request->paginator, ['*'], 'page', $request->page);
            if ($trip_cars) {
                return response([
                    'status' => 'success',
                    'code' => 1,
                    'data' => $trip_cars
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
                'message' => "Failed to get trip_cars, please try again. {$exception->getMessage()}"
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
            $trip_cars = TripCars::where('id', '=', $id)->first();
            if ($trip_cars) {
                return response([
                    'status' => 'success',
                    'code' => 1,
                    'data' => $trip_cars
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
                'message' => "Failed to get trip_cars data, please try again. {$exception->getMessage()}"
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

            $trip_cars = TripCars::find($id);

           $trip_cars->trip_id = $input['trip_id'];$trip_cars->car_id = $input['car_id'];$trip_cars->car_manufacturer = $input['car_manufacturer'];$trip_cars->car_manufacturer_arabic = $input['car_manufacturer_arabic'];$trip_cars->car_model = $input['car_model'];$trip_cars->color = $input['color'];$trip_cars->model_seats = $input['model_seats'];$trip_cars->model_doors = $input['model_doors'];$trip_cars->model_engine_fuel = $input['model_engine_fuel'];$trip_cars->gas_grade = $input['gas_grade'];$trip_cars->model_lkm_city = $input['model_lkm_city'];$trip_cars->model_lkm_hwy = $input['model_lkm_hwy'];$trip_cars->hybrid = $input['hybrid'];$trip_cars->bike_rack = $input['bike_rack'];$trip_cars->all_drive = $input['all_drive'];$trip_cars->child_seat = $input['child_seat'];$trip_cars->gps = $input['gps'];$trip_cars->ski_rack = $input['ski_rack'];$trip_cars->bluetooth = $input['bluetooth'];$trip_cars->usb = $input['usb'];$trip_cars->ventilated_seat = $input['ventilated_seat'];$trip_cars->audio_input = $input['audio_input'];$trip_cars->convertible = $input['convertible'];$trip_cars->toll_pass = $input['toll_pass'];$trip_cars->sunroof = $input['sunroof'];$trip_cars->car_title = $input['car_title'];$trip_cars->car_description = $input['car_description'];$trip_cars->car_guidelines = $input['car_guidelines'];$trip_cars->original_image_path = $input['original_image_path'];$trip_cars->small_image_path = $input['small_image_path'];$trip_cars->created_at = $input['created_at'];$trip_cars->updated_at = $input['updated_at'];

            $res = $trip_cars->update();
            if ($res) {
                return response([
                    'status' => 'success',
                    'code' => 1,
                    'data' => $trip_cars
                ], 200);
            }
            return response([
                'status' => 'error',
                'code' => 0,
                'data' => "Failed to update trip_cars"
            ], 500);
        } catch (\Exception $exception) {
            return response([
                'status' => 'error',
                'code' => 0,
                'message' => "Failed to update trip_cars, please try again. {$exception->getMessage()}"
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
            $res = TripCars::find($id)->delete();
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
                    'data' => "Failed to delete trip_cars"
                ], 500);
            }
        } catch (\Exception $exception) {
            return response([
                'status' => 'error',
                'code' => 0,
                'message' => "Failed to delete trip_cars, please try again. {$exception->getMessage()}"
            ], 500);
        }
    }
}

