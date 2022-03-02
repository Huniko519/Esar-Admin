<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use App\Models\CarRegistrations;
use Facade\Ignition\Tabs\Tab;
use Illuminate\Http\Request;

class CarRegistrationsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        try {

            $car_registrations = CarRegistrations::paginate($request->paginator, ['*'], 'page', $request->page);
            if ($car_registrations) {
                return response([
                    'status' => 'success',
                    'code' => 1,
                    'data' => $car_registrations
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
                'message' => "Failed to get car_registrations, please try again. {$exception->getMessage()}"
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
            $car_registrations = CarRegistrations::create($request->all());
            $car_registrations->save();

            return response([
                'status' => 'success',
                'code' => 1,
                'data' => $car_registrations
            ], 200);
        } catch (\Exception $exception) {
            return response([
                'status' => 'error',
                'code' => 0,
                'message' => "Failed to store car_registrations, please try again. {$exception->getMessage()}"
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
            $requestData = ['id','car_id','country','state','city','licence_plate','expiration_date','date_of_issue','small_car_registration_image','original_car_registration_image','expired','created_at','updated_at'];
            $car_registrations = CarRegistrations::where(function ($q) use ($requestData, $searchQuery) {
                foreach ($requestData as $field)
                    $q->orWhere($field, 'like', "%{$searchQuery}%");
            })->paginate($request->paginator, ['*'], 'page', $request->page);
            if ($car_registrations) {
                return response([
                    'status' => 'success',
                    'code' => 1,
                    'data' => $car_registrations
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
                'message' => "Failed to get car_registrations, please try again. {$exception->getMessage()}"
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
            $car_registrations = CarRegistrations::where('id', '=', $id)->first();
            if ($car_registrations) {
                return response([
                    'status' => 'success',
                    'code' => 1,
                    'data' => $car_registrations
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
                'message' => "Failed to get car_registrations data, please try again. {$exception->getMessage()}"
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

            $car_registrations = CarRegistrations::find($id);

           $car_registrations->car_id = $input['car_id'];$car_registrations->country = $input['country'];$car_registrations->state = $input['state'];$car_registrations->city = $input['city'];$car_registrations->licence_plate = $input['licence_plate'];$car_registrations->expiration_date = $input['expiration_date'];$car_registrations->date_of_issue = $input['date_of_issue'];$car_registrations->small_car_registration_image = $input['small_car_registration_image'];$car_registrations->original_car_registration_image = $input['original_car_registration_image'];$car_registrations->expired = $input['expired'];$car_registrations->created_at = $input['created_at'];$car_registrations->updated_at = $input['updated_at'];

            $res = $car_registrations->update();
            if ($res) {
                return response([
                    'status' => 'success',
                    'code' => 1,
                    'data' => $car_registrations
                ], 200);
            }
            return response([
                'status' => 'error',
                'code' => 0,
                'data' => "Failed to update car_registrations"
            ], 500);
        } catch (\Exception $exception) {
            return response([
                'status' => 'error',
                'code' => 0,
                'message' => "Failed to update car_registrations, please try again. {$exception->getMessage()}"
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
            $res = CarRegistrations::find($id)->delete();
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
                    'data' => "Failed to delete car_registrations"
                ], 500);
            }
        } catch (\Exception $exception) {
            return response([
                'status' => 'error',
                'code' => 0,
                'message' => "Failed to delete car_registrations, please try again. {$exception->getMessage()}"
            ], 500);
        }
    }
}

