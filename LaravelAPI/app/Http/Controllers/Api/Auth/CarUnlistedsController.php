<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use App\Models\CarUnlisteds;
use Facade\Ignition\Tabs\Tab;
use Illuminate\Http\Request;

class CarUnlistedsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        try {

            $car_unlisteds = CarUnlisteds::paginate($request->paginator, ['*'], 'page', $request->page);
            if ($car_unlisteds) {
                return response([
                    'status' => 'success',
                    'code' => 1,
                    'data' => $car_unlisteds
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
                'message' => "Failed to get car_unlisteds, please try again. {$exception->getMessage()}"
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
            $car_unlisteds = CarUnlisteds::create($request->all());
            $car_unlisteds->save();

            return response([
                'status' => 'success',
                'code' => 1,
                'data' => $car_unlisteds
            ], 200);
        } catch (\Exception $exception) {
            return response([
                'status' => 'error',
                'code' => 0,
                'message' => "Failed to store car_unlisteds, please try again. {$exception->getMessage()}"
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
            $requestData = ['id','car_id','car_status','user_auto_delete','admin_delete','have_no_car','safety_concerns','not_earning_enough','too_much_work','negative_experience','other_reason','start_date','end_date','feedback','created_at','updated_at'];
            $car_unlisteds = CarUnlisteds::where(function ($q) use ($requestData, $searchQuery) {
                foreach ($requestData as $field)
                    $q->orWhere($field, 'like', "%{$searchQuery}%");
            })->paginate($request->paginator, ['*'], 'page', $request->page);
            if ($car_unlisteds) {
                return response([
                    'status' => 'success',
                    'code' => 1,
                    'data' => $car_unlisteds
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
                'message' => "Failed to get car_unlisteds, please try again. {$exception->getMessage()}"
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
            $car_unlisteds = CarUnlisteds::where('id', '=', $id)->first();
            if ($car_unlisteds) {
                return response([
                    'status' => 'success',
                    'code' => 1,
                    'data' => $car_unlisteds
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
                'message' => "Failed to get car_unlisteds data, please try again. {$exception->getMessage()}"
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

            $car_unlisteds = CarUnlisteds::find($id);

           $car_unlisteds->car_id = $input['car_id'];$car_unlisteds->car_status = $input['car_status'];$car_unlisteds->user_auto_delete = $input['user_auto_delete'];$car_unlisteds->admin_delete = $input['admin_delete'];$car_unlisteds->have_no_car = $input['have_no_car'];$car_unlisteds->safety_concerns = $input['safety_concerns'];$car_unlisteds->not_earning_enough = $input['not_earning_enough'];$car_unlisteds->too_much_work = $input['too_much_work'];$car_unlisteds->negative_experience = $input['negative_experience'];$car_unlisteds->other_reason = $input['other_reason'];$car_unlisteds->start_date = $input['start_date'];$car_unlisteds->end_date = $input['end_date'];$car_unlisteds->feedback = $input['feedback'];$car_unlisteds->created_at = $input['created_at'];$car_unlisteds->updated_at = $input['updated_at'];

            $res = $car_unlisteds->update();
            if ($res) {
                return response([
                    'status' => 'success',
                    'code' => 1,
                    'data' => $car_unlisteds
                ], 200);
            }
            return response([
                'status' => 'error',
                'code' => 0,
                'data' => "Failed to update car_unlisteds"
            ], 500);
        } catch (\Exception $exception) {
            return response([
                'status' => 'error',
                'code' => 0,
                'message' => "Failed to update car_unlisteds, please try again. {$exception->getMessage()}"
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
            $res = CarUnlisteds::find($id)->delete();
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
                    'data' => "Failed to delete car_unlisteds"
                ], 500);
            }
        } catch (\Exception $exception) {
            return response([
                'status' => 'error',
                'code' => 0,
                'message' => "Failed to delete car_unlisteds, please try again. {$exception->getMessage()}"
            ], 500);
        }
    }
}

