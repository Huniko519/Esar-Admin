<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use App\Models\Trips;
use Facade\Ignition\Tabs\Tab;
use Illuminate\Http\Request;

class TripsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        try {

            $trips = Trips::paginate($request->paginator, ['*'], 'page', $request->page);
            if ($trips) {
                return response([
                    'status' => 'success',
                    'code' => 1,
                    'data' => $trips
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
                'message' => "Failed to get trips, please try again. {$exception->getMessage()}"
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
            $trips = Trips::create($request->all());
            $trips->save();

            return response([
                'status' => 'success',
                'code' => 1,
                'data' => $trips
            ], 200);
        } catch (\Exception $exception) {
            return response([
                'status' => 'error',
                'code' => 0,
                'message' => "Failed to store trips, please try again. {$exception->getMessage()}"
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
            $trips = Trips::where(function ($q) use ($requestData, $searchQuery) {
                foreach ($requestData as $field)
                    $q->orWhere($field, 'like', "%{$searchQuery}%");
            })->paginate($request->paginator, ['*'], 'page', $request->page);
            if ($trips) {
                return response([
                    'status' => 'success',
                    'code' => 1,
                    'data' => $trips
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
                'message' => "Failed to get trips, please try again. {$exception->getMessage()}"
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
            $trips = Trips::where('id', '=', $id)->first();
            if ($trips) {
                return response([
                    'status' => 'success',
                    'code' => 1,
                    'data' => $trips
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
                'message' => "Failed to get trips data, please try again. {$exception->getMessage()}"
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

            $trips = Trips::find($id);

           $trips->chat_id = $input['chat_id'];$trips->owner_id = $input['owner_id'];$trips->car_id = $input['car_id'];$trips->renter_id = $input['renter_id'];$trips->delivery_on_airport = $input['delivery_on_airport'];$trips->airport_id = $input['airport_id'];$trips->delivery_on_car_location = $input['delivery_on_car_location'];$trips->delivery_on_renter_location = $input['delivery_on_renter_location'];$trips->long_location = $input['long_location'];$trips->lat_location = $input['lat_location'];$trips->pickup_location = $input['pickup_location'];$trips->notice_time = $input['notice_time'];$trips->booked_instantly = $input['booked_instantly'];$trips->renter_confirm_trip = $input['renter_confirm_trip'];$trips->owner_confirm_trip = $input['owner_confirm_trip'];$trips->status = $input['status'];$trips->telr_cancel = $input['telr_cancel'];$trips->renter_confirm_trip_update = $input['renter_confirm_trip_update'];$trips->owner_confirm_trip_update = $input['owner_confirm_trip_update'];$trips->telr_cancel_modification = $input['telr_cancel_modification'];$trips->trip_modified = $input['trip_modified'];$trips->is_trip_modified = $input['is_trip_modified'];$trips->i_agree = $input['i_agree'];$trips->start_date = $input['start_date'];$trips->end_date = $input['end_date'];$trips->created_at = $input['created_at'];$trips->updated_at = $input['updated_at'];

            $res = $trips->update();
            if ($res) {
                return response([
                    'status' => 'success',
                    'code' => 1,
                    'data' => $trips
                ], 200);
            }
            return response([
                'status' => 'error',
                'code' => 0,
                'data' => "Failed to update trips"
            ], 500);
        } catch (\Exception $exception) {
            return response([
                'status' => 'error',
                'code' => 0,
                'message' => "Failed to update trips, please try again. {$exception->getMessage()}"
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
            $res = Trips::find($id)->delete();
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
                    'data' => "Failed to delete trips"
                ], 500);
            }
        } catch (\Exception $exception) {
            return response([
                'status' => 'error',
                'code' => 0,
                'message' => "Failed to delete trips, please try again. {$exception->getMessage()}"
            ], 500);
        }
    }
}

