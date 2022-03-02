<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use App\Models\Cars;
use Facade\Ignition\Tabs\Tab;
use Illuminate\Http\Request;

class CarsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        try {

            $cars = Cars::paginate($request->paginator, ['*'], 'page', $request->page);
            if ($cars) {
                return response([
                    'status' => 'success',
                    'code' => 1,
                    'data' => $cars
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
                'message' => "Failed to get cars, please try again. {$exception->getMessage()}"
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
            $cars = Cars::create($request->all());
            $cars->save();

            return response([
                'status' => 'success',
                'code' => 1,
                'data' => $cars
            ], 200);
        } catch (\Exception $exception) {
            return response([
                'status' => 'error',
                'code' => 0,
                'message' => "Failed to store cars, please try again. {$exception->getMessage()}"
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
            $requestData = ['id','user_id','long_location','lat_location','car_city','car_manufacturer','car_manufacturer_arabic','car_model','production_year','model_class','trim','style','car_transmission','brended','car_value','vehicle_type','vehicle_type_arabic','car_odometer','real_odometer','deposit','count_stars','count_reviews','count_rates','count_trips','key_hand_off','parking_details','notice','car_location_notice','airport_notice','guest_location_notice','short_trip','long_trip','weekend_trip','long_term_trip','is_registration_car_verified','is_insurance_verified','car_is_active','is_deleted','paid_advertising','phase','created_at','updated_at'];
            $cars = Cars::where(function ($q) use ($requestData, $searchQuery) {
                foreach ($requestData as $field)
                    $q->orWhere($field, 'like', "%{$searchQuery}%");
            })->paginate($request->paginator, ['*'], 'page', $request->page);
            if ($cars) {
                return response([
                    'status' => 'success',
                    'code' => 1,
                    'data' => $cars
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
                'message' => "Failed to get cars, please try again. {$exception->getMessage()}"
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
            $cars = Cars::where('id', '=', $id)->first();
            if ($cars) {
                return response([
                    'status' => 'success',
                    'code' => 1,
                    'data' => $cars
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
                'message' => "Failed to get cars data, please try again. {$exception->getMessage()}"
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

            $cars = Cars::find($id);

           $cars->user_id = $input['user_id'];$cars->long_location = $input['long_location'];$cars->lat_location = $input['lat_location'];$cars->car_city = $input['car_city'];$cars->car_manufacturer = $input['car_manufacturer'];$cars->car_manufacturer_arabic = $input['car_manufacturer_arabic'];$cars->car_model = $input['car_model'];$cars->production_year = $input['production_year'];$cars->model_class = $input['model_class'];$cars->trim = $input['trim'];$cars->style = $input['style'];$cars->car_transmission = $input['car_transmission'];$cars->brended = $input['brended'];$cars->car_value = $input['car_value'];$cars->vehicle_type = $input['vehicle_type'];$cars->vehicle_type_arabic = $input['vehicle_type_arabic'];$cars->car_odometer = $input['car_odometer'];$cars->real_odometer = $input['real_odometer'];$cars->deposit = $input['deposit'];$cars->count_stars = $input['count_stars'];$cars->count_reviews = $input['count_reviews'];$cars->count_rates = $input['count_rates'];$cars->count_trips = $input['count_trips'];$cars->key_hand_off = $input['key_hand_off'];$cars->parking_details = $input['parking_details'];$cars->notice = $input['notice'];$cars->car_location_notice = $input['car_location_notice'];$cars->airport_notice = $input['airport_notice'];$cars->guest_location_notice = $input['guest_location_notice'];$cars->short_trip = $input['short_trip'];$cars->long_trip = $input['long_trip'];$cars->weekend_trip = $input['weekend_trip'];$cars->long_term_trip = $input['long_term_trip'];$cars->is_registration_car_verified = $input['is_registration_car_verified'];$cars->is_insurance_verified = $input['is_insurance_verified'];$cars->car_is_active = $input['car_is_active'];$cars->is_deleted = $input['is_deleted'];$cars->paid_advertising = $input['paid_advertising'];$cars->phase = $input['phase'];$cars->created_at = $input['created_at'];$cars->updated_at = $input['updated_at'];

            $res = $cars->update();
            if ($res) {
                return response([
                    'status' => 'success',
                    'code' => 1,
                    'data' => $cars
                ], 200);
            }
            return response([
                'status' => 'error',
                'code' => 0,
                'data' => "Failed to update cars"
            ], 500);
        } catch (\Exception $exception) {
            return response([
                'status' => 'error',
                'code' => 0,
                'message' => "Failed to update cars, please try again. {$exception->getMessage()}"
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
            $res = Cars::find($id)->delete();
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
                    'data' => "Failed to delete cars"
                ], 500);
            }
        } catch (\Exception $exception) {
            return response([
                'status' => 'error',
                'code' => 0,
                'message' => "Failed to delete cars, please try again. {$exception->getMessage()}"
            ], 500);
        }
    }
}

