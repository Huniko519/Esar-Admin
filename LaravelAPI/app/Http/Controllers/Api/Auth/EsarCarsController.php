<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use App\Models\EsarCars;
use Facade\Ignition\Tabs\Tab;
use Illuminate\Http\Request;

class EsarCarsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        try {

            $esar_cars = EsarCars::paginate($request->paginator, ['*'], 'page', $request->page);
            if ($esar_cars) {
                return response([
                    'status' => 'success',
                    'code' => 1,
                    'data' => $esar_cars
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
                'message' => "Failed to get esar_cars, please try again. {$exception->getMessage()}"
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
            $esar_cars = EsarCars::create($request->all());
            $esar_cars->save();

            return response([
                'status' => 'success',
                'code' => 1,
                'data' => $esar_cars
            ], 200);
        } catch (\Exception $exception) {
            return response([
                'status' => 'error',
                'code' => 0,
                'message' => "Failed to store esar_cars, please try again. {$exception->getMessage()}"
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
            $requestData = ['id','model_make_id','manufacturer_arabic','model_name','model_trim','model_year','model_class','model_body','model_engine_fuel','model_transmission_type','model_transmission_type_arabic','model_seats','model_doors','model_lkm_hwy','model_lkm_city'];
            $esar_cars = EsarCars::where(function ($q) use ($requestData, $searchQuery) {
                foreach ($requestData as $field)
                    $q->orWhere($field, 'like', "%{$searchQuery}%");
            })->paginate($request->paginator, ['*'], 'page', $request->page);
            if ($esar_cars) {
                return response([
                    'status' => 'success',
                    'code' => 1,
                    'data' => $esar_cars
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
                'message' => "Failed to get esar_cars, please try again. {$exception->getMessage()}"
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
            $esar_cars = EsarCars::where('id', '=', $id)->first();
            if ($esar_cars) {
                return response([
                    'status' => 'success',
                    'code' => 1,
                    'data' => $esar_cars
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
                'message' => "Failed to get esar_cars data, please try again. {$exception->getMessage()}"
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

            $esar_cars = EsarCars::find($id);

           $esar_cars->id = $input['id'];$esar_cars->model_make_id = $input['model_make_id'];$esar_cars->manufacturer_arabic = $input['manufacturer_arabic'];$esar_cars->model_name = $input['model_name'];$esar_cars->model_trim = $input['model_trim'];$esar_cars->model_year = $input['model_year'];$esar_cars->model_class = $input['model_class'];$esar_cars->model_body = $input['model_body'];$esar_cars->model_engine_fuel = $input['model_engine_fuel'];$esar_cars->model_transmission_type = $input['model_transmission_type'];$esar_cars->model_transmission_type_arabic = $input['model_transmission_type_arabic'];$esar_cars->model_seats = $input['model_seats'];$esar_cars->model_doors = $input['model_doors'];$esar_cars->model_lkm_hwy = $input['model_lkm_hwy'];$esar_cars->model_lkm_city = $input['model_lkm_city'];

            $res = $esar_cars->update();
            if ($res) {
                return response([
                    'status' => 'success',
                    'code' => 1,
                    'data' => $esar_cars
                ], 200);
            }
            return response([
                'status' => 'error',
                'code' => 0,
                'data' => "Failed to update esar_cars"
            ], 500);
        } catch (\Exception $exception) {
            return response([
                'status' => 'error',
                'code' => 0,
                'message' => "Failed to update esar_cars, please try again. {$exception->getMessage()}"
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
            $res = EsarCars::find($id)->delete();
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
                    'data' => "Failed to delete esar_cars"
                ], 500);
            }
        } catch (\Exception $exception) {
            return response([
                'status' => 'error',
                'code' => 0,
                'message' => "Failed to delete esar_cars, please try again. {$exception->getMessage()}"
            ], 500);
        }
    }
}

