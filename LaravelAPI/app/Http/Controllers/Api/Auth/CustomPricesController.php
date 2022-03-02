<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use App\Models\CustomPrices;
use Facade\Ignition\Tabs\Tab;
use Illuminate\Http\Request;

class CustomPricesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        try {

            $custom_prices = CustomPrices::paginate($request->paginator, ['*'], 'page', $request->page);
            if ($custom_prices) {
                return response([
                    'status' => 'success',
                    'code' => 1,
                    'data' => $custom_prices
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
                'message' => "Failed to get custom_prices, please try again. {$exception->getMessage()}"
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
            $custom_prices = CustomPrices::create($request->all());
            $custom_prices->save();

            return response([
                'status' => 'success',
                'code' => 1,
                'data' => $custom_prices
            ], 200);
        } catch (\Exception $exception) {
            return response([
                'status' => 'error',
                'code' => 0,
                'message' => "Failed to store custom_prices, please try again. {$exception->getMessage()}"
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
            $requestData = ['id','car_id','is_automatic_price','price','discount_week','discount_month','price_from_date','price_until_date','custom_price','created_at','updated_at'];
            $custom_prices = CustomPrices::where(function ($q) use ($requestData, $searchQuery) {
                foreach ($requestData as $field)
                    $q->orWhere($field, 'like', "%{$searchQuery}%");
            })->paginate($request->paginator, ['*'], 'page', $request->page);
            if ($custom_prices) {
                return response([
                    'status' => 'success',
                    'code' => 1,
                    'data' => $custom_prices
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
                'message' => "Failed to get custom_prices, please try again. {$exception->getMessage()}"
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
            $custom_prices = CustomPrices::where('id', '=', $id)->first();
            if ($custom_prices) {
                return response([
                    'status' => 'success',
                    'code' => 1,
                    'data' => $custom_prices
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
                'message' => "Failed to get custom_prices data, please try again. {$exception->getMessage()}"
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

            $custom_prices = CustomPrices::find($id);

           $custom_prices->car_id = $input['car_id'];$custom_prices->is_automatic_price = $input['is_automatic_price'];$custom_prices->price = $input['price'];$custom_prices->discount_week = $input['discount_week'];$custom_prices->discount_month = $input['discount_month'];$custom_prices->price_from_date = $input['price_from_date'];$custom_prices->price_until_date = $input['price_until_date'];$custom_prices->custom_price = $input['custom_price'];$custom_prices->created_at = $input['created_at'];$custom_prices->updated_at = $input['updated_at'];

            $res = $custom_prices->update();
            if ($res) {
                return response([
                    'status' => 'success',
                    'code' => 1,
                    'data' => $custom_prices
                ], 200);
            }
            return response([
                'status' => 'error',
                'code' => 0,
                'data' => "Failed to update custom_prices"
            ], 500);
        } catch (\Exception $exception) {
            return response([
                'status' => 'error',
                'code' => 0,
                'message' => "Failed to update custom_prices, please try again. {$exception->getMessage()}"
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
            $res = CustomPrices::find($id)->delete();
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
                    'data' => "Failed to delete custom_prices"
                ], 500);
            }
        } catch (\Exception $exception) {
            return response([
                'status' => 'error',
                'code' => 0,
                'message' => "Failed to delete custom_prices, please try again. {$exception->getMessage()}"
            ], 500);
        }
    }
}

