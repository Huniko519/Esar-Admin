<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use App\Models\Users;
use Facade\Ignition\Tabs\Tab;
use Illuminate\Http\Request;

class UsersController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        try {

            $users = Users::paginate($request->paginator, ['*'], 'page', $request->page);
            if ($users) {
                return response([
                    'status' => 'success',
                    'code' => 1,
                    'data' => $users
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
                'message' => "Failed to get users, please try again. {$exception->getMessage()}"
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
            $users = Users::create($request->all());
            $users->save();

            return response([
                'status' => 'success',
                'code' => 1,
                'data' => $users
            ], 200);
        } catch (\Exception $exception) {
            return response([
                'status' => 'error',
                'code' => 0,
                'message' => "Failed to store users, please try again. {$exception->getMessage()}"
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
            $requestData = ['id','first_name','last_name','email','password','currency_type','country_code','phone_number','email_verified','phone_verified','approved_to_drive','id_verified','sms_code','verify_email_token','is_facebook','friends_count','is_google','listed','reviewed','count_stars','stars_as_renter','reviewed_as_owner','count_stars_as_owner','stars_as_owner','user_stars','trips','car_trips','count_penalty_renter','count_penalty_owner','count_penalty_in_period','penalty_amount','penalty_period','sms_notifications','email_promotions','transmission_expert','work_from_time','work_until_time','is_working_time','payment','bank_name','holder_name','iban','account_number','is_bank_account','promo_code','promo_code_used','user_active_status','admin_delete','deleting_time','created_at','updated_at','is_apple'];
            $users = Users::where(function ($q) use ($requestData, $searchQuery) {
                foreach ($requestData as $field)
                    $q->orWhere($field, 'like', "%{$searchQuery}%");
            })->paginate($request->paginator, ['*'], 'page', $request->page);
            if ($users) {
                return response([
                    'status' => 'success',
                    'code' => 1,
                    'data' => $users
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
                'message' => "Failed to get users, please try again. {$exception->getMessage()}"
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
            $users = Users::where('id', '=', $id)->first();
            if ($users) {
                return response([
                    'status' => 'success',
                    'code' => 1,
                    'data' => $users
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
                'message' => "Failed to get users data, please try again. {$exception->getMessage()}"
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

            $users = Users::find($id);

           $users->first_name = $input['first_name'];$users->last_name = $input['last_name'];$users->email = $input['email'];$users->password = $input['password'];$users->currency_type = $input['currency_type'];$users->country_code = $input['country_code'];$users->phone_number = $input['phone_number'];$users->email_verified = $input['email_verified'];$users->phone_verified = $input['phone_verified'];$users->approved_to_drive = $input['approved_to_drive'];$users->id_verified = $input['id_verified'];$users->sms_code = $input['sms_code'];$users->verify_email_token = $input['verify_email_token'];$users->is_facebook = $input['is_facebook'];$users->friends_count = $input['friends_count'];$users->is_google = $input['is_google'];$users->listed = $input['listed'];$users->reviewed = $input['reviewed'];$users->count_stars = $input['count_stars'];$users->stars_as_renter = $input['stars_as_renter'];$users->reviewed_as_owner = $input['reviewed_as_owner'];$users->count_stars_as_owner = $input['count_stars_as_owner'];$users->stars_as_owner = $input['stars_as_owner'];$users->user_stars = $input['user_stars'];$users->trips = $input['trips'];$users->car_trips = $input['car_trips'];$users->count_penalty_renter = $input['count_penalty_renter'];$users->count_penalty_owner = $input['count_penalty_owner'];$users->count_penalty_in_period = $input['count_penalty_in_period'];$users->penalty_amount = $input['penalty_amount'];$users->penalty_period = $input['penalty_period'];$users->sms_notifications = $input['sms_notifications'];$users->email_promotions = $input['email_promotions'];$users->transmission_expert = $input['transmission_expert'];$users->work_from_time = $input['work_from_time'];$users->work_until_time = $input['work_until_time'];$users->is_working_time = $input['is_working_time'];$users->payment = $input['payment'];$users->bank_name = $input['bank_name'];$users->holder_name = $input['holder_name'];$users->iban = $input['iban'];$users->account_number = $input['account_number'];$users->is_bank_account = $input['is_bank_account'];$users->promo_code = $input['promo_code'];$users->promo_code_used = $input['promo_code_used'];$users->user_active_status = $input['user_active_status'];$users->admin_delete = $input['admin_delete'];$users->deleting_time = $input['deleting_time'];$users->created_at = $input['created_at'];$users->updated_at = $input['updated_at'];$users->is_apple = $input['is_apple'];

            $res = $users->update();
            if ($res) {
                return response([
                    'status' => 'success',
                    'code' => 1,
                    'data' => $users
                ], 200);
            }
            return response([
                'status' => 'error',
                'code' => 0,
                'data' => "Failed to update users"
            ], 500);
        } catch (\Exception $exception) {
            return response([
                'status' => 'error',
                'code' => 0,
                'message' => "Failed to update users, please try again. {$exception->getMessage()}"
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
            $res = Users::find($id)->delete();
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
                    'data' => "Failed to delete users"
                ], 500);
            }
        } catch (\Exception $exception) {
            return response([
                'status' => 'error',
                'code' => 0,
                'message' => "Failed to delete users, please try again. {$exception->getMessage()}"
            ], 500);
        }
    }
}

