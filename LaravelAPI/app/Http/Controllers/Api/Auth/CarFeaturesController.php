<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use App\Models\CarFeatures;
use Facade\Ignition\Tabs\Tab;
use Illuminate\Http\Request;

class CarFeaturesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        try {

            $car_features = CarFeatures::paginate($request->paginator, ['*'], 'page', $request->page);
            if ($car_features) {
                return response([
                    'status' => 'success',
                    'code' => 1,
                    'data' => $car_features
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
                'message' => "Failed to get car_features, please try again. {$exception->getMessage()}"
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
            $car_features = CarFeatures::create($request->all());
            $car_features->save();

            return response([
                'status' => 'success',
                'code' => 1,
                'data' => $car_features
            ], 200);
        } catch (\Exception $exception) {
            return response([
                'status' => 'error',
                'code' => 0,
                'message' => "Failed to store car_features, please try again. {$exception->getMessage()}"
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
            $requestData = ['id','car_id','color','model_seats','model_doors','model_engine_fuel','gas_grade','model_lkm_city','model_lkm_hwy','hybrid','bike_rack','all_drive','child_seat','gps','ski_rack','bluetooth','usb','ventilated_seat','audio_input','convertible','toll_pass','sunroof','pet_friendly','heated_seat','car_title','car_description','car_guidelines','created_at','updated_at'];
            $car_features = CarFeatures::where(function ($q) use ($requestData, $searchQuery) {
                foreach ($requestData as $field)
                    $q->orWhere($field, 'like', "%{$searchQuery}%");
            })->paginate($request->paginator, ['*'], 'page', $request->page);
            if ($car_features) {
                return response([
                    'status' => 'success',
                    'code' => 1,
                    'data' => $car_features
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
                'message' => "Failed to get car_features, please try again. {$exception->getMessage()}"
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
            $car_features = CarFeatures::where('id', '=', $id)->first();
            if ($car_features) {
                return response([
                    'status' => 'success',
                    'code' => 1,
                    'data' => $car_features
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
                'message' => "Failed to get car_features data, please try again. {$exception->getMessage()}"
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

            $car_features = CarFeatures::find($id);

           $car_features->car_id = $input['car_id'];$car_features->color = $input['color'];$car_features->model_seats = $input['model_seats'];$car_features->model_doors = $input['model_doors'];$car_features->model_engine_fuel = $input['model_engine_fuel'];$car_features->gas_grade = $input['gas_grade'];$car_features->model_lkm_city = $input['model_lkm_city'];$car_features->model_lkm_hwy = $input['model_lkm_hwy'];$car_features->hybrid = $input['hybrid'];$car_features->bike_rack = $input['bike_rack'];$car_features->all_drive = $input['all_drive'];$car_features->child_seat = $input['child_seat'];$car_features->gps = $input['gps'];$car_features->ski_rack = $input['ski_rack'];$car_features->bluetooth = $input['bluetooth'];$car_features->usb = $input['usb'];$car_features->ventilated_seat = $input['ventilated_seat'];$car_features->audio_input = $input['audio_input'];$car_features->convertible = $input['convertible'];$car_features->toll_pass = $input['toll_pass'];$car_features->sunroof = $input['sunroof'];$car_features->pet_friendly = $input['pet_friendly'];$car_features->heated_seat = $input['heated_seat'];$car_features->car_title = $input['car_title'];$car_features->car_description = $input['car_description'];$car_features->car_guidelines = $input['car_guidelines'];$car_features->created_at = $input['created_at'];$car_features->updated_at = $input['updated_at'];

            $res = $car_features->update();
            if ($res) {
                return response([
                    'status' => 'success',
                    'code' => 1,
                    'data' => $car_features
                ], 200);
            }
            return response([
                'status' => 'error',
                'code' => 0,
                'data' => "Failed to update car_features"
            ], 500);
        } catch (\Exception $exception) {
            return response([
                'status' => 'error',
                'code' => 0,
                'message' => "Failed to update car_features, please try again. {$exception->getMessage()}"
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
            $res = CarFeatures::find($id)->delete();
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
                    'data' => "Failed to delete car_features"
                ], 500);
            }
        } catch (\Exception $exception) {
            return response([
                'status' => 'error',
                'code' => 0,
                'message' => "Failed to delete car_features, please try again. {$exception->getMessage()}"
            ], 500);
        }
    }
}

