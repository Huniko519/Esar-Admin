<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use App\Models\TransactionLogs;
use Facade\Ignition\Tabs\Tab;
use Illuminate\Http\Request;

class TransactionLogsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        try {

            $transaction_logs = TransactionLogs::paginate($request->paginator, ['*'], 'page', $request->page);
            if ($transaction_logs) {
                return response([
                    'status' => 'success',
                    'code' => 1,
                    'data' => $transaction_logs
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
                'message' => "Failed to get transaction_logs, please try again. {$exception->getMessage()}"
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
            $transaction_logs = TransactionLogs::create($request->all());
            $transaction_logs->save();

            return response([
                'status' => 'success',
                'code' => 1,
                'data' => $transaction_logs
            ], 200);
        } catch (\Exception $exception) {
            return response([
                'status' => 'error',
                'code' => 0,
                'message' => "Failed to store transaction_logs, please try again. {$exception->getMessage()}"
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
            $requestData = ['id','trip_id','trip_bill_id','user_id','device_os_version','app_version','payment_sdk_version','error_message','error_code','error_id','stack_trace','amount','currency','cart_id','transaction_class','transaction_type','transaction_first_reference','test_mode','transaction_time','city','country','region','street_address','first_name','last_name','title','email','device_manufacturer','device_model','device_longitude','device_latitude','app_id','app_name','store_id','auth_key','created_at','updated_at'];
            $transaction_logs = TransactionLogs::where(function ($q) use ($requestData, $searchQuery) {
                foreach ($requestData as $field)
                    $q->orWhere($field, 'like', "%{$searchQuery}%");
            })->paginate($request->paginator, ['*'], 'page', $request->page);
            if ($transaction_logs) {
                return response([
                    'status' => 'success',
                    'code' => 1,
                    'data' => $transaction_logs
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
                'message' => "Failed to get transaction_logs, please try again. {$exception->getMessage()}"
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
            $transaction_logs = TransactionLogs::where('id', '=', $id)->first();
            if ($transaction_logs) {
                return response([
                    'status' => 'success',
                    'code' => 1,
                    'data' => $transaction_logs
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
                'message' => "Failed to get transaction_logs data, please try again. {$exception->getMessage()}"
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

            $transaction_logs = TransactionLogs::find($id);

           $transaction_logs->trip_id = $input['trip_id'];$transaction_logs->trip_bill_id = $input['trip_bill_id'];$transaction_logs->user_id = $input['user_id'];$transaction_logs->device_os_version = $input['device_os_version'];$transaction_logs->app_version = $input['app_version'];$transaction_logs->payment_sdk_version = $input['payment_sdk_version'];$transaction_logs->error_message = $input['error_message'];$transaction_logs->error_code = $input['error_code'];$transaction_logs->error_id = $input['error_id'];$transaction_logs->stack_trace = $input['stack_trace'];$transaction_logs->amount = $input['amount'];$transaction_logs->currency = $input['currency'];$transaction_logs->cart_id = $input['cart_id'];$transaction_logs->transaction_class = $input['transaction_class'];$transaction_logs->transaction_type = $input['transaction_type'];$transaction_logs->transaction_first_reference = $input['transaction_first_reference'];$transaction_logs->test_mode = $input['test_mode'];$transaction_logs->transaction_time = $input['transaction_time'];$transaction_logs->city = $input['city'];$transaction_logs->country = $input['country'];$transaction_logs->region = $input['region'];$transaction_logs->street_address = $input['street_address'];$transaction_logs->first_name = $input['first_name'];$transaction_logs->last_name = $input['last_name'];$transaction_logs->title = $input['title'];$transaction_logs->email = $input['email'];$transaction_logs->device_manufacturer = $input['device_manufacturer'];$transaction_logs->device_model = $input['device_model'];$transaction_logs->device_longitude = $input['device_longitude'];$transaction_logs->device_latitude = $input['device_latitude'];$transaction_logs->app_id = $input['app_id'];$transaction_logs->app_name = $input['app_name'];$transaction_logs->store_id = $input['store_id'];$transaction_logs->auth_key = $input['auth_key'];$transaction_logs->created_at = $input['created_at'];$transaction_logs->updated_at = $input['updated_at'];

            $res = $transaction_logs->update();
            if ($res) {
                return response([
                    'status' => 'success',
                    'code' => 1,
                    'data' => $transaction_logs
                ], 200);
            }
            return response([
                'status' => 'error',
                'code' => 0,
                'data' => "Failed to update transaction_logs"
            ], 500);
        } catch (\Exception $exception) {
            return response([
                'status' => 'error',
                'code' => 0,
                'message' => "Failed to update transaction_logs, please try again. {$exception->getMessage()}"
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
            $res = TransactionLogs::find($id)->delete();
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
                    'data' => "Failed to delete transaction_logs"
                ], 500);
            }
        } catch (\Exception $exception) {
            return response([
                'status' => 'error',
                'code' => 0,
                'message' => "Failed to delete transaction_logs, please try again. {$exception->getMessage()}"
            ], 500);
        }
    }
}

