<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use App\Models\TripCancellations;
use Facade\Ignition\Tabs\Tab;
use Illuminate\Http\Request;

class TripCancellationsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        try {

            $trip_cancellations = TripCancellations::paginate($request->paginator, ['*'], 'page', $request->page);
            if ($trip_cancellations) {
                return response([
                    'status' => 'success',
                    'code' => 1,
                    'data' => $trip_cancellations
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
                'message' => "Failed to get trip_cancellations, please try again. {$exception->getMessage()}"
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
            $trip_cancellations = TripCancellations::create($request->all());
            $trip_cancellations->save();

            return response([
                'status' => 'success',
                'code' => 1,
                'data' => $trip_cancellations
            ], 200);
        } catch (\Exception $exception) {
            return response([
                'status' => 'error',
                'code' => 0,
                'message' => "Failed to store trip_cancellations, please try again. {$exception->getMessage()}"
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
            $requestData = ['id','user_id','trip_id','promotions','unavailable','repair','guest_cancel','uncomfortable','auto_cancel','telr_cancel','other','reason','created_at','updated_at'];
            $trip_cancellations = TripCancellations::where(function ($q) use ($requestData, $searchQuery) {
                foreach ($requestData as $field)
                    $q->orWhere($field, 'like', "%{$searchQuery}%");
            })->paginate($request->paginator, ['*'], 'page', $request->page);
            if ($trip_cancellations) {
                return response([
                    'status' => 'success',
                    'code' => 1,
                    'data' => $trip_cancellations
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
                'message' => "Failed to get trip_cancellations, please try again. {$exception->getMessage()}"
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
            $trip_cancellations = TripCancellations::where('id', '=', $id)->first();
            if ($trip_cancellations) {
                return response([
                    'status' => 'success',
                    'code' => 1,
                    'data' => $trip_cancellations
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
                'message' => "Failed to get trip_cancellations data, please try again. {$exception->getMessage()}"
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

            $trip_cancellations = TripCancellations::find($id);

           $trip_cancellations->user_id = $input['user_id'];$trip_cancellations->trip_id = $input['trip_id'];$trip_cancellations->promotions = $input['promotions'];$trip_cancellations->unavailable = $input['unavailable'];$trip_cancellations->repair = $input['repair'];$trip_cancellations->guest_cancel = $input['guest_cancel'];$trip_cancellations->uncomfortable = $input['uncomfortable'];$trip_cancellations->auto_cancel = $input['auto_cancel'];$trip_cancellations->telr_cancel = $input['telr_cancel'];$trip_cancellations->other = $input['other'];$trip_cancellations->reason = $input['reason'];$trip_cancellations->created_at = $input['created_at'];$trip_cancellations->updated_at = $input['updated_at'];

            $res = $trip_cancellations->update();
            if ($res) {
                return response([
                    'status' => 'success',
                    'code' => 1,
                    'data' => $trip_cancellations
                ], 200);
            }
            return response([
                'status' => 'error',
                'code' => 0,
                'data' => "Failed to update trip_cancellations"
            ], 500);
        } catch (\Exception $exception) {
            return response([
                'status' => 'error',
                'code' => 0,
                'message' => "Failed to update trip_cancellations, please try again. {$exception->getMessage()}"
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
            $res = TripCancellations::find($id)->delete();
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
                    'data' => "Failed to delete trip_cancellations"
                ], 500);
            }
        } catch (\Exception $exception) {
            return response([
                'status' => 'error',
                'code' => 0,
                'message' => "Failed to delete trip_cancellations, please try again. {$exception->getMessage()}"
            ], 500);
        }
    }
}

