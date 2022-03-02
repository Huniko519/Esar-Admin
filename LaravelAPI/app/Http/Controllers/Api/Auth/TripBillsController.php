<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use App\Models\TripBills;
use Facade\Ignition\Tabs\Tab;
use Illuminate\Http\Request;

class TripBillsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        try {

            $trip_bills = TripBills::paginate($request->paginator, ['*'], 'page', $request->page);
            if ($trip_bills) {
                return response([
                    'status' => 'success',
                    'code' => 1,
                    'data' => $trip_bills
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
                'message' => "Failed to get trip_bills, please try again. {$exception->getMessage()}"
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
            $trip_bills = TripBills::create($request->all());
            $trip_bills->save();

            return response([
                'status' => 'success',
                'code' => 1,
                'data' => $trip_bills
            ], 200);
        } catch (\Exception $exception) {
            return response([
                'status' => 'error',
                'code' => 0,
                'message' => "Failed to store trip_bills, please try again. {$exception->getMessage()}"
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
            $trip_bills = TripBills::where(function ($q) use ($requestData, $searchQuery) {
                foreach ($requestData as $field)
                    $q->orWhere($field, 'like', "%{$searchQuery}%");
            })->paginate($request->paginator, ['*'], 'page', $request->page);
            if ($trip_bills) {
                return response([
                    'status' => 'success',
                    'code' => 1,
                    'data' => $trip_bills
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
                'message' => "Failed to get trip_bills, please try again. {$exception->getMessage()}"
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
            $trip_bills = TripBills::where('id', '=', $id)->first();
            if ($trip_bills) {
                return response([
                    'status' => 'success',
                    'code' => 1,
                    'data' => $trip_bills
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
                'message' => "Failed to get trip_bills data, please try again. {$exception->getMessage()}"
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

            $trip_bills = TripBills::find($id);

           $trip_bills->trip_id = $input['trip_id'];$trip_bills->trip_days = $input['trip_days'];$trip_bills->trip_start_date = $input['trip_start_date'];$trip_bills->trip_end_date = $input['trip_end_date'];$trip_bills->deposit = $input['deposit'];$trip_bills->discount_week = $input['discount_week'];$trip_bills->discount_month = $input['discount_month'];$trip_bills->discount_amount = $input['discount_amount'];$trip_bills->promo_code = $input['promo_code'];$trip_bills->promo_code_discount = $input['promo_code_discount'];$trip_bills->is_promo_fixed = $input['is_promo_fixed'];$trip_bills->promo_discount = $input['promo_discount'];$trip_bills->average_price = $input['average_price'];$trip_bills->service_fee = $input['service_fee'];$trip_bills->delivery_fee = $input['delivery_fee'];$trip_bills->trip_price = $input['trip_price'];$trip_bills->price_with_discount = $input['price_with_discount'];$trip_bills->has_been_refund = $input['has_been_refund'];$trip_bills->refund_amount = $input['refund_amount'];$trip_bills->owner_earning = $input['owner_earning'];$trip_bills->esar_earning = $input['esar_earning'];$trip_bills->trip_total = $input['trip_total'];$trip_bills->esar_paid = $input['esar_paid'];$trip_bills->esar_paid_date = $input['esar_paid_date'];$trip_bills->booked_instantly = $input['booked_instantly'];$trip_bills->trip_paid = $input['trip_paid'];$trip_bills->order_ref = $input['order_ref'];$trip_bills->tran_ref = $input['tran_ref'];$trip_bills->trip_bill_status = $input['trip_bill_status'];$trip_bills->created_at = $input['created_at'];$trip_bills->updated_at = $input['updated_at'];

            $res = $trip_bills->update();
            if ($res) {
                return response([
                    'status' => 'success',
                    'code' => 1,
                    'data' => $trip_bills
                ], 200);
            }
            return response([
                'status' => 'error',
                'code' => 0,
                'data' => "Failed to update trip_bills"
            ], 500);
        } catch (\Exception $exception) {
            return response([
                'status' => 'error',
                'code' => 0,
                'message' => "Failed to update trip_bills, please try again. {$exception->getMessage()}"
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
            $res = TripBills::find($id)->delete();
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
                    'data' => "Failed to delete trip_bills"
                ], 500);
            }
        } catch (\Exception $exception) {
            return response([
                'status' => 'error',
                'code' => 0,
                'message' => "Failed to delete trip_bills, please try again. {$exception->getMessage()}"
            ], 500);
        }
    }
}

