<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use App\Models\CarInsurances;
use Facade\Ignition\Tabs\Tab;
use Illuminate\Http\Request;

class CarInsurancesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        try {

            $car_insurances = CarInsurances::paginate($request->paginator, ['*'], 'page', $request->page);
            if ($car_insurances) {
                return response([
                    'status' => 'success',
                    'code' => 1,
                    'data' => $car_insurances
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
                'message' => "Failed to get car_insurances, please try again. {$exception->getMessage()}"
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
            $car_insurances = CarInsurances::create($request->all());
            $car_insurances->save();

            return response([
                'status' => 'success',
                'code' => 1,
                'data' => $car_insurances
            ], 200);
        } catch (\Exception $exception) {
            return response([
                'status' => 'error',
                'code' => 0,
                'message' => "Failed to store car_insurances, please try again. {$exception->getMessage()}"
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
            $requestData = ['id','car_id','policy_number','detectable_amount','expiration_date','date_of_issue','expired','image_policy_card','small_image_policy_card','created_at','updated_at'];
            $car_insurances = CarInsurances::where(function ($q) use ($requestData, $searchQuery) {
                foreach ($requestData as $field)
                    $q->orWhere($field, 'like', "%{$searchQuery}%");
            })->paginate($request->paginator, ['*'], 'page', $request->page);
            if ($car_insurances) {
                return response([
                    'status' => 'success',
                    'code' => 1,
                    'data' => $car_insurances
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
                'message' => "Failed to get car_insurances, please try again. {$exception->getMessage()}"
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
            $car_insurances = CarInsurances::where('id', '=', $id)->first();
            if ($car_insurances) {
                return response([
                    'status' => 'success',
                    'code' => 1,
                    'data' => $car_insurances
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
                'message' => "Failed to get car_insurances data, please try again. {$exception->getMessage()}"
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

            $car_insurances = CarInsurances::find($id);

           $car_insurances->car_id = $input['car_id'];$car_insurances->policy_number = $input['policy_number'];$car_insurances->detectable_amount = $input['detectable_amount'];$car_insurances->expiration_date = $input['expiration_date'];$car_insurances->date_of_issue = $input['date_of_issue'];$car_insurances->expired = $input['expired'];$car_insurances->image_policy_card = $input['image_policy_card'];$car_insurances->small_image_policy_card = $input['small_image_policy_card'];$car_insurances->created_at = $input['created_at'];$car_insurances->updated_at = $input['updated_at'];

            $res = $car_insurances->update();
            if ($res) {
                return response([
                    'status' => 'success',
                    'code' => 1,
                    'data' => $car_insurances
                ], 200);
            }
            return response([
                'status' => 'error',
                'code' => 0,
                'data' => "Failed to update car_insurances"
            ], 500);
        } catch (\Exception $exception) {
            return response([
                'status' => 'error',
                'code' => 0,
                'message' => "Failed to update car_insurances, please try again. {$exception->getMessage()}"
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
            $res = CarInsurances::find($id)->delete();
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
                    'data' => "Failed to delete car_insurances"
                ], 500);
            }
        } catch (\Exception $exception) {
            return response([
                'status' => 'error',
                'code' => 0,
                'message' => "Failed to delete car_insurances, please try again. {$exception->getMessage()}"
            ], 500);
        }
    }
}

