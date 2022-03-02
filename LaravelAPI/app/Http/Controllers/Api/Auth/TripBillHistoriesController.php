<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use App\Models\TripBillHistories;
use Facade\Ignition\Tabs\Tab;
use Illuminate\Http\Request;

class TripBillHistoriesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        try {

            $trip_bill_histories = TripBillHistories::paginate($request->paginator, ['*'], 'page', $request->page);
            if ($trip_bill_histories) {
                return response([
                    'status' => 'success',
                    'code' => 1,
                    'data' => $trip_bill_histories
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
                'message' => "Failed to get trip_bill_histories, please try again. {$exception->getMessage()}"
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
            $trip_bill_histories = TripBillHistories::create($request->all());
            $trip_bill_histories->save();

            return response([
                'status' => 'success',
                'code' => 1,
                'data' => $trip_bill_histories
            ], 200);
        } catch (\Exception $exception) {
            return response([
                'status' => 'error',
                'code' => 0,
                'message' => "Failed to store trip_bill_histories, please try again. {$exception->getMessage()}"
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
            $requestData = ['id','trip_id','trip_days','trip_start_date','trip_end_date','deposit','discount_week','discount_month','discount_amount','promo_code','promo_code_discount','is_promo_fixed','promo_discount','average_price','service_fee','delivery_fee','trip_price','price_with_discount','has_been_refund','refund_amount','owner_earning','esar_earning','trip_total','esar_paid','esar_paid_date','booked_instantly','trip_paid','order_ref','tran_ref','trip_bill_status','created_at','updated_at'];
            $trip_bill_histories = TripBillHistories::where(function ($q) use ($requestData, $searchQuery) {
                foreach ($requestData as $field)
                    $q->orWhere($field, 'like', "%{$searchQuery}%");
            })->paginate($request->paginator, ['*'], 'page', $request->page);
            if ($trip_bill_histories) {
                return response([
                    'status' => 'success',
                    'code' => 1,
                    'data' => $trip_bill_histories
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
                'message' => "Failed to get trip_bill_histories, please try again. {$exception->getMessage()}"
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
            $trip_bill_histories = TripBillHistories::where('id', '=', $id)->first();
            if ($trip_bill_histories) {
                return response([
                    'status' => 'success',
                    'code' => 1,
                    'data' => $trip_bill_histories
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
                'message' => "Failed to get trip_bill_histories data, please try again. {$exception->getMessage()}"
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

            $trip_bill_histories = TripBillHistories::find($id);

           $trip_bill_histories->id = $input['id'];$trip_bill_histories->trip_id = $input['trip_id'];$trip_bill_histories->trip_days = $input['trip_days'];$trip_bill_histories->trip_start_date = $input['trip_start_date'];$trip_bill_histories->trip_end_date = $input['trip_end_date'];$trip_bill_histories->deposit = $input['deposit'];$trip_bill_histories->discount_week = $input['discount_week'];$trip_bill_histories->discount_month = $input['discount_month'];$trip_bill_histories->discount_amount = $input['discount_amount'];$trip_bill_histories->promo_code = $input['promo_code'];$trip_bill_histories->promo_code_discount = $input['promo_code_discount'];$trip_bill_histories->is_promo_fixed = $input['is_promo_fixed'];$trip_bill_histories->promo_discount = $input['promo_discount'];$trip_bill_histories->average_price = $input['average_price'];$trip_bill_histories->service_fee = $input['service_fee'];$trip_bill_histories->delivery_fee = $input['delivery_fee'];$trip_bill_histories->trip_price = $input['trip_price'];$trip_bill_histories->price_with_discount = $input['price_with_discount'];$trip_bill_histories->has_been_refund = $input['has_been_refund'];$trip_bill_histories->refund_amount = $input['refund_amount'];$trip_bill_histories->owner_earning = $input['owner_earning'];$trip_bill_histories->esar_earning = $input['esar_earning'];$trip_bill_histories->trip_total = $input['trip_total'];$trip_bill_histories->esar_paid = $input['esar_paid'];$trip_bill_histories->esar_paid_date = $input['esar_paid_date'];$trip_bill_histories->booked_instantly = $input['booked_instantly'];$trip_bill_histories->trip_paid = $input['trip_paid'];$trip_bill_histories->order_ref = $input['order_ref'];$trip_bill_histories->tran_ref = $input['tran_ref'];$trip_bill_histories->trip_bill_status = $input['trip_bill_status'];$trip_bill_histories->created_at = $input['created_at'];$trip_bill_histories->updated_at = $input['updated_at'];

            $res = $trip_bill_histories->update();
            if ($res) {
                return response([
                    'status' => 'success',
                    'code' => 1,
                    'data' => $trip_bill_histories
                ], 200);
            }
            return response([
                'status' => 'error',
                'code' => 0,
                'data' => "Failed to update trip_bill_histories"
            ], 500);
        } catch (\Exception $exception) {
            return response([
                'status' => 'error',
                'code' => 0,
                'message' => "Failed to update trip_bill_histories, please try again. {$exception->getMessage()}"
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
            $res = TripBillHistories::find($id)->delete();
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
                    'data' => "Failed to delete trip_bill_histories"
                ], 500);
            }
        } catch (\Exception $exception) {
            return response([
                'status' => 'error',
                'code' => 0,
                'message' => "Failed to delete trip_bill_histories, please try again. {$exception->getMessage()}"
            ], 500);
        }
    }
}

