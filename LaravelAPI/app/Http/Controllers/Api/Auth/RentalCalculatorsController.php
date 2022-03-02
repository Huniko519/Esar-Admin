<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use App\Models\RentalCalculators;
use Facade\Ignition\Tabs\Tab;
use Illuminate\Http\Request;

class RentalCalculatorsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        try {

            $rental_calculators = RentalCalculators::paginate($request->paginator, ['*'], 'page', $request->page);
            if ($rental_calculators) {
                return response([
                    'status' => 'success',
                    'code' => 1,
                    'data' => $rental_calculators
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
                'message' => "Failed to get rental_calculators, please try again. {$exception->getMessage()}"
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
            $rental_calculators = RentalCalculators::create($request->all());
            $rental_calculators->save();

            return response([
                'status' => 'success',
                'code' => 1,
                'data' => $rental_calculators
            ], 200);
        } catch (\Exception $exception) {
            return response([
                'status' => 'error',
                'code' => 0,
                'message' => "Failed to store rental_calculators, please try again. {$exception->getMessage()}"
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
            $requestData = ['id','email','phone','car_manufacturer','car_manufacturer_arabic','car_model','production_year','model_class','trim','style','car_transmission','car_transmission_arabic','car_value','vehicle_type','vehicle_type_arabic','car_odometer','real_odometer','daily_price','yearly_price','created_at','updated_at'];
            $rental_calculators = RentalCalculators::where(function ($q) use ($requestData, $searchQuery) {
                foreach ($requestData as $field)
                    $q->orWhere($field, 'like', "%{$searchQuery}%");
            })->paginate($request->paginator, ['*'], 'page', $request->page);
            if ($rental_calculators) {
                return response([
                    'status' => 'success',
                    'code' => 1,
                    'data' => $rental_calculators
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
                'message' => "Failed to get rental_calculators, please try again. {$exception->getMessage()}"
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
            $rental_calculators = RentalCalculators::where('id', '=', $id)->first();
            if ($rental_calculators) {
                return response([
                    'status' => 'success',
                    'code' => 1,
                    'data' => $rental_calculators
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
                'message' => "Failed to get rental_calculators data, please try again. {$exception->getMessage()}"
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

            $rental_calculators = RentalCalculators::find($id);

           $rental_calculators->email = $input['email'];$rental_calculators->phone = $input['phone'];$rental_calculators->car_manufacturer = $input['car_manufacturer'];$rental_calculators->car_manufacturer_arabic = $input['car_manufacturer_arabic'];$rental_calculators->car_model = $input['car_model'];$rental_calculators->production_year = $input['production_year'];$rental_calculators->model_class = $input['model_class'];$rental_calculators->trim = $input['trim'];$rental_calculators->style = $input['style'];$rental_calculators->car_transmission = $input['car_transmission'];$rental_calculators->car_transmission_arabic = $input['car_transmission_arabic'];$rental_calculators->car_value = $input['car_value'];$rental_calculators->vehicle_type = $input['vehicle_type'];$rental_calculators->vehicle_type_arabic = $input['vehicle_type_arabic'];$rental_calculators->car_odometer = $input['car_odometer'];$rental_calculators->real_odometer = $input['real_odometer'];$rental_calculators->daily_price = $input['daily_price'];$rental_calculators->yearly_price = $input['yearly_price'];$rental_calculators->created_at = $input['created_at'];$rental_calculators->updated_at = $input['updated_at'];

            $res = $rental_calculators->update();
            if ($res) {
                return response([
                    'status' => 'success',
                    'code' => 1,
                    'data' => $rental_calculators
                ], 200);
            }
            return response([
                'status' => 'error',
                'code' => 0,
                'data' => "Failed to update rental_calculators"
            ], 500);
        } catch (\Exception $exception) {
            return response([
                'status' => 'error',
                'code' => 0,
                'message' => "Failed to update rental_calculators, please try again. {$exception->getMessage()}"
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
            $res = RentalCalculators::find($id)->delete();
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
                    'data' => "Failed to delete rental_calculators"
                ], 500);
            }
        } catch (\Exception $exception) {
            return response([
                'status' => 'error',
                'code' => 0,
                'message' => "Failed to delete rental_calculators, please try again. {$exception->getMessage()}"
            ], 500);
        }
    }
}

