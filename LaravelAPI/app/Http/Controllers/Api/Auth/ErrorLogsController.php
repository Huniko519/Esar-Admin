<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use App\Models\ErrorLogs;
use Facade\Ignition\Tabs\Tab;
use Illuminate\Http\Request;

class ErrorLogsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        try {

            $error_logs = ErrorLogs::paginate($request->paginator, ['*'], 'page', $request->page);
            if ($error_logs) {
                return response([
                    'status' => 'success',
                    'code' => 1,
                    'data' => $error_logs
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
                'message' => "Failed to get error_logs, please try again. {$exception->getMessage()}"
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
            $error_logs = ErrorLogs::create($request->all());
            $error_logs->save();

            return response([
                'status' => 'success',
                'code' => 1,
                'data' => $error_logs
            ], 200);
        } catch (\Exception $exception) {
            return response([
                'status' => 'error',
                'code' => 0,
                'message' => "Failed to store error_logs, please try again. {$exception->getMessage()}"
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
            $requestData = ['id','request_uri','redirect_uri','referer','user_agent','status_code','message','file','line','code','sql_error','error_info','model','exception_trace','headers','ids','exception_previous','severity','user_id','car_id','trip_id','trip_bill_id','chat_id','created_at','updated_at'];
            $error_logs = ErrorLogs::where(function ($q) use ($requestData, $searchQuery) {
                foreach ($requestData as $field)
                    $q->orWhere($field, 'like', "%{$searchQuery}%");
            })->paginate($request->paginator, ['*'], 'page', $request->page);
            if ($error_logs) {
                return response([
                    'status' => 'success',
                    'code' => 1,
                    'data' => $error_logs
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
                'message' => "Failed to get error_logs, please try again. {$exception->getMessage()}"
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
            $error_logs = ErrorLogs::where('id', '=', $id)->first();
            if ($error_logs) {
                return response([
                    'status' => 'success',
                    'code' => 1,
                    'data' => $error_logs
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
                'message' => "Failed to get error_logs data, please try again. {$exception->getMessage()}"
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

            $error_logs = ErrorLogs::find($id);

           $error_logs->request_uri = $input['request_uri'];$error_logs->redirect_uri = $input['redirect_uri'];$error_logs->referer = $input['referer'];$error_logs->user_agent = $input['user_agent'];$error_logs->status_code = $input['status_code'];$error_logs->message = $input['message'];$error_logs->file = $input['file'];$error_logs->line = $input['line'];$error_logs->code = $input['code'];$error_logs->sql_error = $input['sql_error'];$error_logs->error_info = $input['error_info'];$error_logs->model = $input['model'];$error_logs->exception_trace = $input['exception_trace'];$error_logs->headers = $input['headers'];$error_logs->ids = $input['ids'];$error_logs->exception_previous = $input['exception_previous'];$error_logs->severity = $input['severity'];$error_logs->user_id = $input['user_id'];$error_logs->car_id = $input['car_id'];$error_logs->trip_id = $input['trip_id'];$error_logs->trip_bill_id = $input['trip_bill_id'];$error_logs->chat_id = $input['chat_id'];$error_logs->created_at = $input['created_at'];$error_logs->updated_at = $input['updated_at'];

            $res = $error_logs->update();
            if ($res) {
                return response([
                    'status' => 'success',
                    'code' => 1,
                    'data' => $error_logs
                ], 200);
            }
            return response([
                'status' => 'error',
                'code' => 0,
                'data' => "Failed to update error_logs"
            ], 500);
        } catch (\Exception $exception) {
            return response([
                'status' => 'error',
                'code' => 0,
                'message' => "Failed to update error_logs, please try again. {$exception->getMessage()}"
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
            $res = ErrorLogs::find($id)->delete();
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
                    'data' => "Failed to delete error_logs"
                ], 500);
            }
        } catch (\Exception $exception) {
            return response([
                'status' => 'error',
                'code' => 0,
                'message' => "Failed to delete error_logs, please try again. {$exception->getMessage()}"
            ], 500);
        }
    }
}

