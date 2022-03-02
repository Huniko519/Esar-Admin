<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use App\Models\BookInstantlies;
use Facade\Ignition\Tabs\Tab;
use Illuminate\Http\Request;

class BookInstantliesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        try {

            $book_instantlies = BookInstantlies::paginate($request->paginator, ['*'], 'page', $request->page);
            if ($book_instantlies) {
                return response([
                    'status' => 'success',
                    'code' => 1,
                    'data' => $book_instantlies
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
                'message' => "Failed to get book_instantlies, please try again. {$exception->getMessage()}"
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
            $book_instantlies = BookInstantlies::create($request->all());
            $book_instantlies->save();

            return response([
                'status' => 'success',
                'code' => 1,
                'data' => $book_instantlies
            ], 200);
        } catch (\Exception $exception) {
            return response([
                'status' => 'error',
                'code' => 0,
                'message' => "Failed to store book_instantlies, please try again. {$exception->getMessage()}"
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
            $requestData = ['id','car_id','on_car_location','on_airport','on_guest_location','work_on_guest_location','delivery_fee_guest_location','max_distance','min_trip_for_free_delivery','guest_location_delivery_details','created_at','updated_at'];
            $book_instantlies = BookInstantlies::where(function ($q) use ($requestData, $searchQuery) {
                foreach ($requestData as $field)
                    $q->orWhere($field, 'like', "%{$searchQuery}%");
            })->paginate($request->paginator, ['*'], 'page', $request->page);
            if ($book_instantlies) {
                return response([
                    'status' => 'success',
                    'code' => 1,
                    'data' => $book_instantlies
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
                'message' => "Failed to get book_instantlies, please try again. {$exception->getMessage()}"
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
            $book_instantlies = BookInstantlies::where('id', '=', $id)->first();
            if ($book_instantlies) {
                return response([
                    'status' => 'success',
                    'code' => 1,
                    'data' => $book_instantlies
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
                'message' => "Failed to get book_instantlies data, please try again. {$exception->getMessage()}"
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

            $book_instantlies = BookInstantlies::find($id);

           $book_instantlies->car_id = $input['car_id'];$book_instantlies->on_car_location = $input['on_car_location'];$book_instantlies->on_airport = $input['on_airport'];$book_instantlies->on_guest_location = $input['on_guest_location'];$book_instantlies->work_on_guest_location = $input['work_on_guest_location'];$book_instantlies->delivery_fee_guest_location = $input['delivery_fee_guest_location'];$book_instantlies->max_distance = $input['max_distance'];$book_instantlies->min_trip_for_free_delivery = $input['min_trip_for_free_delivery'];$book_instantlies->guest_location_delivery_details = $input['guest_location_delivery_details'];$book_instantlies->created_at = $input['created_at'];$book_instantlies->updated_at = $input['updated_at'];

            $res = $book_instantlies->update();
            if ($res) {
                return response([
                    'status' => 'success',
                    'code' => 1,
                    'data' => $book_instantlies
                ], 200);
            }
            return response([
                'status' => 'error',
                'code' => 0,
                'data' => "Failed to update book_instantlies"
            ], 500);
        } catch (\Exception $exception) {
            return response([
                'status' => 'error',
                'code' => 0,
                'message' => "Failed to update book_instantlies, please try again. {$exception->getMessage()}"
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
            $res = BookInstantlies::find($id)->delete();
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
                    'data' => "Failed to delete book_instantlies"
                ], 500);
            }
        } catch (\Exception $exception) {
            return response([
                'status' => 'error',
                'code' => 0,
                'message' => "Failed to delete book_instantlies, please try again. {$exception->getMessage()}"
            ], 500);
        }
    }
}

