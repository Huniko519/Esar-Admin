<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use App\Models\TripHistories;
use Facade\Ignition\Tabs\Tab;
use Illuminate\Http\Request;

class TripHistoriesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        try {

            $trip_histories = TripHistories::paginate($request->paginator, ['*'], 'page', $request->page);
            if ($trip_histories) {
                return response([
                    'status' => 'success',
                    'code' => 1,
                    'data' => $trip_histories
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
                'message' => "Failed to get trip_histories, please try again. {$exception->getMessage()}"
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
            $trip_histories = TripHistories::create($request->all());
            $trip_histories->save();

            return response([
                'status' => 'success',
                'code' => 1,
                'data' => $trip_histories
            ], 200);
        } catch (\Exception $exception) {
            return response([
                'status' => 'error',
                'code' => 0,
                'message' => "Failed to store trip_histories, please try again. {$exception->getMessage()}"
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
            $trip_histories = TripHistories::where(function ($q) use ($requestData, $searchQuery) {
                foreach ($requestData as $field)
                    $q->orWhere($field, 'like', "%{$searchQuery}%");
            })->paginate($request->paginator, ['*'], 'page', $request->page);
            if ($trip_histories) {
                return response([
                    'status' => 'success',
                    'code' => 1,
                    'data' => $trip_histories
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
                'message' => "Failed to get trip_histories, please try again. {$exception->getMessage()}"
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
            $trip_histories = TripHistories::where('id', '=', $id)->first();
            if ($trip_histories) {
                return response([
                    'status' => 'success',
                    'code' => 1,
                    'data' => $trip_histories
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
                'message' => "Failed to get trip_histories data, please try again. {$exception->getMessage()}"
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

            $trip_histories = TripHistories::find($id);

           $trip_histories->chat_id = $input['chat_id'];$trip_histories->owner_id = $input['owner_id'];$trip_histories->car_id = $input['car_id'];$trip_histories->renter_id = $input['renter_id'];$trip_histories->delivery_on_airport = $input['delivery_on_airport'];$trip_histories->airport_id = $input['airport_id'];$trip_histories->delivery_on_car_location = $input['delivery_on_car_location'];$trip_histories->delivery_on_renter_location = $input['delivery_on_renter_location'];$trip_histories->long_location = $input['long_location'];$trip_histories->lat_location = $input['lat_location'];$trip_histories->pickup_location = $input['pickup_location'];$trip_histories->notice_time = $input['notice_time'];$trip_histories->booked_instantly = $input['booked_instantly'];$trip_histories->renter_confirm_trip = $input['renter_confirm_trip'];$trip_histories->owner_confirm_trip = $input['owner_confirm_trip'];$trip_histories->status = $input['status'];$trip_histories->telr_cancel = $input['telr_cancel'];$trip_histories->renter_confirm_trip_update = $input['renter_confirm_trip_update'];$trip_histories->owner_confirm_trip_update = $input['owner_confirm_trip_update'];$trip_histories->telr_cancel_modification = $input['telr_cancel_modification'];$trip_histories->trip_modified = $input['trip_modified'];$trip_histories->is_trip_modified = $input['is_trip_modified'];$trip_histories->i_agree = $input['i_agree'];$trip_histories->start_date = $input['start_date'];$trip_histories->end_date = $input['end_date'];$trip_histories->created_at = $input['created_at'];$trip_histories->updated_at = $input['updated_at'];

            $res = $trip_histories->update();
            if ($res) {
                return response([
                    'status' => 'success',
                    'code' => 1,
                    'data' => $trip_histories
                ], 200);
            }
            return response([
                'status' => 'error',
                'code' => 0,
                'data' => "Failed to update trip_histories"
            ], 500);
        } catch (\Exception $exception) {
            return response([
                'status' => 'error',
                'code' => 0,
                'message' => "Failed to update trip_histories, please try again. {$exception->getMessage()}"
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
            $res = TripHistories::find($id)->delete();
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
                    'data' => "Failed to delete trip_histories"
                ], 500);
            }
        } catch (\Exception $exception) {
            return response([
                'status' => 'error',
                'code' => 0,
                'message' => "Failed to delete trip_histories, please try again. {$exception->getMessage()}"
            ], 500);
        }
    }
}

