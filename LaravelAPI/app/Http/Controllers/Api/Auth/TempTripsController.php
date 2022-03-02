<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use App\Models\TempTrips;
use Facade\Ignition\Tabs\Tab;
use Illuminate\Http\Request;

class TempTripsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        try {

            $temp_trips = TempTrips::paginate($request->paginator, ['*'], 'page', $request->page);
            if ($temp_trips) {
                return response([
                    'status' => 'success',
                    'code' => 1,
                    'data' => $temp_trips
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
                'message' => "Failed to get temp_trips, please try again. {$exception->getMessage()}"
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
            $temp_trips = TempTrips::create($request->all());
            $temp_trips->save();

            return response([
                'status' => 'success',
                'code' => 1,
                'data' => $temp_trips
            ], 200);
        } catch (\Exception $exception) {
            return response([
                'status' => 'error',
                'code' => 0,
                'message' => "Failed to store temp_trips, please try again. {$exception->getMessage()}"
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
            $requestData = ['id','chat_id','owner_id','car_id','renter_id','delivery_on_airport','airport_id','delivery_on_car_location','delivery_on_renter_location','long_location','lat_location','pickup_location','notice_time','booked_instantly','renter_confirm_trip','owner_confirm_trip','status','telr_cancel','renter_confirm_trip_update','owner_confirm_trip_update','telr_cancel_modification','trip_modified','is_trip_modified','i_agree','start_date','end_date','created_at','updated_at'];
            $temp_trips = TempTrips::where(function ($q) use ($requestData, $searchQuery) {
                foreach ($requestData as $field)
                    $q->orWhere($field, 'like', "%{$searchQuery}%");
            })->paginate($request->paginator, ['*'], 'page', $request->page);
            if ($temp_trips) {
                return response([
                    'status' => 'success',
                    'code' => 1,
                    'data' => $temp_trips
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
                'message' => "Failed to get temp_trips, please try again. {$exception->getMessage()}"
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
            $temp_trips = TempTrips::where('id', '=', $id)->first();
            if ($temp_trips) {
                return response([
                    'status' => 'success',
                    'code' => 1,
                    'data' => $temp_trips
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
                'message' => "Failed to get temp_trips data, please try again. {$exception->getMessage()}"
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

            $temp_trips = TempTrips::find($id);

           $temp_trips->chat_id = $input['chat_id'];$temp_trips->owner_id = $input['owner_id'];$temp_trips->car_id = $input['car_id'];$temp_trips->renter_id = $input['renter_id'];$temp_trips->delivery_on_airport = $input['delivery_on_airport'];$temp_trips->airport_id = $input['airport_id'];$temp_trips->delivery_on_car_location = $input['delivery_on_car_location'];$temp_trips->delivery_on_renter_location = $input['delivery_on_renter_location'];$temp_trips->long_location = $input['long_location'];$temp_trips->lat_location = $input['lat_location'];$temp_trips->pickup_location = $input['pickup_location'];$temp_trips->notice_time = $input['notice_time'];$temp_trips->booked_instantly = $input['booked_instantly'];$temp_trips->renter_confirm_trip = $input['renter_confirm_trip'];$temp_trips->owner_confirm_trip = $input['owner_confirm_trip'];$temp_trips->status = $input['status'];$temp_trips->telr_cancel = $input['telr_cancel'];$temp_trips->renter_confirm_trip_update = $input['renter_confirm_trip_update'];$temp_trips->owner_confirm_trip_update = $input['owner_confirm_trip_update'];$temp_trips->telr_cancel_modification = $input['telr_cancel_modification'];$temp_trips->trip_modified = $input['trip_modified'];$temp_trips->is_trip_modified = $input['is_trip_modified'];$temp_trips->i_agree = $input['i_agree'];$temp_trips->start_date = $input['start_date'];$temp_trips->end_date = $input['end_date'];$temp_trips->created_at = $input['created_at'];$temp_trips->updated_at = $input['updated_at'];

            $res = $temp_trips->update();
            if ($res) {
                return response([
                    'status' => 'success',
                    'code' => 1,
                    'data' => $temp_trips
                ], 200);
            }
            return response([
                'status' => 'error',
                'code' => 0,
                'data' => "Failed to update temp_trips"
            ], 500);
        } catch (\Exception $exception) {
            return response([
                'status' => 'error',
                'code' => 0,
                'message' => "Failed to update temp_trips, please try again. {$exception->getMessage()}"
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
            $res = TempTrips::find($id)->delete();
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
                    'data' => "Failed to delete temp_trips"
                ], 500);
            }
        } catch (\Exception $exception) {
            return response([
                'status' => 'error',
                'code' => 0,
                'message' => "Failed to delete temp_trips, please try again. {$exception->getMessage()}"
            ], 500);
        }
    }
}

