<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use App\Models\CountryCurrencies;
use Facade\Ignition\Tabs\Tab;
use Illuminate\Http\Request;

class CountryCurrenciesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        try {

            $country_currencies = CountryCurrencies::paginate($request->paginator, ['*'], 'page', $request->page);
            if ($country_currencies) {
                return response([
                    'status' => 'success',
                    'code' => 1,
                    'data' => $country_currencies
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
                'message' => "Failed to get country_currencies, please try again. {$exception->getMessage()}"
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
            $country_currencies = CountryCurrencies::create($request->all());
            $country_currencies->save();

            return response([
                'status' => 'success',
                'code' => 1,
                'data' => $country_currencies
            ], 200);
        } catch (\Exception $exception) {
            return response([
                'status' => 'error',
                'code' => 0,
                'message' => "Failed to store country_currencies, please try again. {$exception->getMessage()}"
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
            $requestData = ['id','country','arabic_country','currency','arabic_currency','code','arabic_code','symbol','arabic_symbol','created_at','updated_at'];
            $country_currencies = CountryCurrencies::where(function ($q) use ($requestData, $searchQuery) {
                foreach ($requestData as $field)
                    $q->orWhere($field, 'like', "%{$searchQuery}%");
            })->paginate($request->paginator, ['*'], 'page', $request->page);
            if ($country_currencies) {
                return response([
                    'status' => 'success',
                    'code' => 1,
                    'data' => $country_currencies
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
                'message' => "Failed to get country_currencies, please try again. {$exception->getMessage()}"
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
            $country_currencies = CountryCurrencies::where('id', '=', $id)->first();
            if ($country_currencies) {
                return response([
                    'status' => 'success',
                    'code' => 1,
                    'data' => $country_currencies
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
                'message' => "Failed to get country_currencies data, please try again. {$exception->getMessage()}"
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

            $country_currencies = CountryCurrencies::find($id);

           $country_currencies->country = $input['country'];$country_currencies->arabic_country = $input['arabic_country'];$country_currencies->currency = $input['currency'];$country_currencies->arabic_currency = $input['arabic_currency'];$country_currencies->code = $input['code'];$country_currencies->arabic_code = $input['arabic_code'];$country_currencies->symbol = $input['symbol'];$country_currencies->arabic_symbol = $input['arabic_symbol'];$country_currencies->created_at = $input['created_at'];$country_currencies->updated_at = $input['updated_at'];

            $res = $country_currencies->update();
            if ($res) {
                return response([
                    'status' => 'success',
                    'code' => 1,
                    'data' => $country_currencies
                ], 200);
            }
            return response([
                'status' => 'error',
                'code' => 0,
                'data' => "Failed to update country_currencies"
            ], 500);
        } catch (\Exception $exception) {
            return response([
                'status' => 'error',
                'code' => 0,
                'message' => "Failed to update country_currencies, please try again. {$exception->getMessage()}"
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
            $res = CountryCurrencies::find($id)->delete();
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
                    'data' => "Failed to delete country_currencies"
                ], 500);
            }
        } catch (\Exception $exception) {
            return response([
                'status' => 'error',
                'code' => 0,
                'message' => "Failed to delete country_currencies, please try again. {$exception->getMessage()}"
            ], 500);
        }
    }
}

