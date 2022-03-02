<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use App\Models\TempProfileDatas;
use Facade\Ignition\Tabs\Tab;
use Illuminate\Http\Request;

class TempProfileDatasController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        try {

            $temp_profile_datas = TempProfileDatas::paginate($request->paginator, ['*'], 'page', $request->page);
            if ($temp_profile_datas) {
                return response([
                    'status' => 'success',
                    'code' => 1,
                    'data' => $temp_profile_datas
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
                'message' => "Failed to get temp_profile_datas, please try again. {$exception->getMessage()}"
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
            $temp_profile_datas = TempProfileDatas::create($request->all());
            $temp_profile_datas->save();

            return response([
                'status' => 'success',
                'code' => 1,
                'data' => $temp_profile_datas
            ], 200);
        } catch (\Exception $exception) {
            return response([
                'status' => 'error',
                'code' => 0,
                'message' => "Failed to store temp_profile_datas, please try again. {$exception->getMessage()}"
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
            $requestData = ['id','user_id','email','country_code','phone','sms_code','verify_email_token','created_at','updated_at'];
            $temp_profile_datas = TempProfileDatas::where(function ($q) use ($requestData, $searchQuery) {
                foreach ($requestData as $field)
                    $q->orWhere($field, 'like', "%{$searchQuery}%");
            })->paginate($request->paginator, ['*'], 'page', $request->page);
            if ($temp_profile_datas) {
                return response([
                    'status' => 'success',
                    'code' => 1,
                    'data' => $temp_profile_datas
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
                'message' => "Failed to get temp_profile_datas, please try again. {$exception->getMessage()}"
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
            $temp_profile_datas = TempProfileDatas::where('id', '=', $id)->first();
            if ($temp_profile_datas) {
                return response([
                    'status' => 'success',
                    'code' => 1,
                    'data' => $temp_profile_datas
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
                'message' => "Failed to get temp_profile_datas data, please try again. {$exception->getMessage()}"
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

            $temp_profile_datas = TempProfileDatas::find($id);

           $temp_profile_datas->user_id = $input['user_id'];$temp_profile_datas->email = $input['email'];$temp_profile_datas->country_code = $input['country_code'];$temp_profile_datas->phone = $input['phone'];$temp_profile_datas->sms_code = $input['sms_code'];$temp_profile_datas->verify_email_token = $input['verify_email_token'];$temp_profile_datas->created_at = $input['created_at'];$temp_profile_datas->updated_at = $input['updated_at'];

            $res = $temp_profile_datas->update();
            if ($res) {
                return response([
                    'status' => 'success',
                    'code' => 1,
                    'data' => $temp_profile_datas
                ], 200);
            }
            return response([
                'status' => 'error',
                'code' => 0,
                'data' => "Failed to update temp_profile_datas"
            ], 500);
        } catch (\Exception $exception) {
            return response([
                'status' => 'error',
                'code' => 0,
                'message' => "Failed to update temp_profile_datas, please try again. {$exception->getMessage()}"
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
            $res = TempProfileDatas::find($id)->delete();
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
                    'data' => "Failed to delete temp_profile_datas"
                ], 500);
            }
        } catch (\Exception $exception) {
            return response([
                'status' => 'error',
                'code' => 0,
                'message' => "Failed to delete temp_profile_datas, please try again. {$exception->getMessage()}"
            ], 500);
        }
    }
}

