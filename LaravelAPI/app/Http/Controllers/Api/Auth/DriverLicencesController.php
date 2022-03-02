<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use App\Models\DriverLicences;
use Facade\Ignition\Tabs\Tab;
use Illuminate\Http\Request;

class DriverLicencesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        try {

            $driver_licences = DriverLicences::paginate($request->paginator, ['*'], 'page', $request->page);
            if ($driver_licences) {
                return response([
                    'status' => 'success',
                    'code' => 1,
                    'data' => $driver_licences
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
                'message' => "Failed to get driver_licences, please try again. {$exception->getMessage()}"
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
            $driver_licences = DriverLicences::create($request->all());
            $driver_licences->save();

            return response([
                'status' => 'success',
                'code' => 1,
                'data' => $driver_licences
            ], 200);
        } catch (\Exception $exception) {
            return response([
                'status' => 'error',
                'code' => 0,
                'message' => "Failed to store driver_licences, please try again. {$exception->getMessage()}"
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
            $requestData = ['id','user_id','dl_number','country','state','city','issued_by','date_of_issue','expiration_date','expired','image_path','image_path_small','created_at','updated_at'];
            $driver_licences = DriverLicences::where(function ($q) use ($requestData, $searchQuery) {
                foreach ($requestData as $field)
                    $q->orWhere($field, 'like', "%{$searchQuery}%");
            })->paginate($request->paginator, ['*'], 'page', $request->page);
            if ($driver_licences) {
                return response([
                    'status' => 'success',
                    'code' => 1,
                    'data' => $driver_licences
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
                'message' => "Failed to get driver_licences, please try again. {$exception->getMessage()}"
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
            $driver_licences = DriverLicences::where('id', '=', $id)->first();
            if ($driver_licences) {
                return response([
                    'status' => 'success',
                    'code' => 1,
                    'data' => $driver_licences
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
                'message' => "Failed to get driver_licences data, please try again. {$exception->getMessage()}"
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

            $driver_licences = DriverLicences::find($id);

           $driver_licences->user_id = $input['user_id'];$driver_licences->dl_number = $input['dl_number'];$driver_licences->country = $input['country'];$driver_licences->state = $input['state'];$driver_licences->city = $input['city'];$driver_licences->issued_by = $input['issued_by'];$driver_licences->date_of_issue = $input['date_of_issue'];$driver_licences->expiration_date = $input['expiration_date'];$driver_licences->expired = $input['expired'];$driver_licences->image_path = $input['image_path'];$driver_licences->image_path_small = $input['image_path_small'];$driver_licences->created_at = $input['created_at'];$driver_licences->updated_at = $input['updated_at'];

            $res = $driver_licences->update();
            if ($res) {
                return response([
                    'status' => 'success',
                    'code' => 1,
                    'data' => $driver_licences
                ], 200);
            }
            return response([
                'status' => 'error',
                'code' => 0,
                'data' => "Failed to update driver_licences"
            ], 500);
        } catch (\Exception $exception) {
            return response([
                'status' => 'error',
                'code' => 0,
                'message' => "Failed to update driver_licences, please try again. {$exception->getMessage()}"
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
            $res = DriverLicences::find($id)->delete();
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
                    'data' => "Failed to delete driver_licences"
                ], 500);
            }
        } catch (\Exception $exception) {
            return response([
                'status' => 'error',
                'code' => 0,
                'message' => "Failed to delete driver_licences, please try again. {$exception->getMessage()}"
            ], 500);
        }
    }
}

