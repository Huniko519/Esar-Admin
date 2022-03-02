<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use App\Models\ArchivedPrices;
use Facade\Ignition\Tabs\Tab;
use Illuminate\Http\Request;

class ArchivedPricesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        try {

            $archived_prices = ArchivedPrices::paginate($request->paginator, ['*'], 'page', $request->page);
            if ($archived_prices) {
                return response([
                    'status' => 'success',
                    'code' => 1,
                    'data' => $archived_prices
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
                'message' => "Failed to get archived_prices, please try again. {$exception->getMessage()}"
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
            $archived_prices = ArchivedPrices::create($request->all());
            $archived_prices->save();

            return response([
                'status' => 'success',
                'code' => 1,
                'data' => $archived_prices
            ], 200);
        } catch (\Exception $exception) {
            return response([
                'status' => 'error',
                'code' => 0,
                'message' => "Failed to store archived_prices, please try again. {$exception->getMessage()}"
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
            $requestData = ['id','car_id','is_automatic_price','price','discount_week','discount_month','price_from_date','price_until_date','custom_price','creation_date','created_at','updated_at'];
            $archived_prices = ArchivedPrices::where(function ($q) use ($requestData, $searchQuery) {
                foreach ($requestData as $field)
                    $q->orWhere($field, 'like', "%{$searchQuery}%");
            })->paginate($request->paginator, ['*'], 'page', $request->page);
            if ($archived_prices) {
                return response([
                    'status' => 'success',
                    'code' => 1,
                    'data' => $archived_prices
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
                'message' => "Failed to get archived_prices, please try again. {$exception->getMessage()}"
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
            $archived_prices = ArchivedPrices::where('id', '=', $id)->first();
            if ($archived_prices) {
                return response([
                    'status' => 'success',
                    'code' => 1,
                    'data' => $archived_prices
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
                'message' => "Failed to get archived_prices data, please try again. {$exception->getMessage()}"
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

            $archived_prices = ArchivedPrices::find($id);

           $archived_prices->car_id = $input['car_id'];$archived_prices->is_automatic_price = $input['is_automatic_price'];$archived_prices->price = $input['price'];$archived_prices->discount_week = $input['discount_week'];$archived_prices->discount_month = $input['discount_month'];$archived_prices->price_from_date = $input['price_from_date'];$archived_prices->price_until_date = $input['price_until_date'];$archived_prices->custom_price = $input['custom_price'];$archived_prices->creation_date = $input['creation_date'];$archived_prices->created_at = $input['created_at'];$archived_prices->updated_at = $input['updated_at'];

            $res = $archived_prices->update();
            if ($res) {
                return response([
                    'status' => 'success',
                    'code' => 1,
                    'data' => $archived_prices
                ], 200);
            }
            return response([
                'status' => 'error',
                'code' => 0,
                'data' => "Failed to update archived_prices"
            ], 500);
        } catch (\Exception $exception) {
            return response([
                'status' => 'error',
                'code' => 0,
                'message' => "Failed to update archived_prices, please try again. {$exception->getMessage()}"
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
            $res = ArchivedPrices::find($id)->delete();
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
                    'data' => "Failed to delete archived_prices"
                ], 500);
            }
        } catch (\Exception $exception) {
            return response([
                'status' => 'error',
                'code' => 0,
                'message' => "Failed to delete archived_prices, please try again. {$exception->getMessage()}"
            ], 500);
        }
    }
}

