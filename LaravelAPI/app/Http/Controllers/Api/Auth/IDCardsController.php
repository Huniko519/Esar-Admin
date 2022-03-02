<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use App\Models\IDCards;
use Facade\Ignition\Tabs\Tab;
use Illuminate\Http\Request;

class IDCardsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        try {

            $i_d__cards = IDCards::paginate($request->paginator, ['*'], 'page', $request->page);
            if ($i_d__cards) {
                return response([
                    'status' => 'success',
                    'code' => 1,
                    'data' => $i_d__cards
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
                'message' => "Failed to get i_d__cards, please try again. {$exception->getMessage()}"
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
            $i_d__cards = IDCards::create($request->all());
            $i_d__cards->save();

            return response([
                'status' => 'success',
                'code' => 1,
                'data' => $i_d__cards
            ], 200);
        } catch (\Exception $exception) {
            return response([
                'status' => 'error',
                'code' => 0,
                'message' => "Failed to store i_d__cards, please try again. {$exception->getMessage()}"
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
            $requestData = ['id','user_id','first_name','last_name','middle_name','dob','id_number','id_country','id_state','id_city','date_of_issue','expiration_date','expired_id','issued_by','expired','image_path','image_path_small','created_at','updated_at'];
            $i_d__cards = IDCards::where(function ($q) use ($requestData, $searchQuery) {
                foreach ($requestData as $field)
                    $q->orWhere($field, 'like', "%{$searchQuery}%");
            })->paginate($request->paginator, ['*'], 'page', $request->page);
            if ($i_d__cards) {
                return response([
                    'status' => 'success',
                    'code' => 1,
                    'data' => $i_d__cards
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
                'message' => "Failed to get i_d__cards, please try again. {$exception->getMessage()}"
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
            $i_d__cards = IDCards::where('id', '=', $id)->first();
            if ($i_d__cards) {
                return response([
                    'status' => 'success',
                    'code' => 1,
                    'data' => $i_d__cards
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
                'message' => "Failed to get i_d__cards data, please try again. {$exception->getMessage()}"
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

            $i_d__cards = IDCards::find($id);

           $i_d__cards->user_id = $input['user_id'];$i_d__cards->first_name = $input['first_name'];$i_d__cards->last_name = $input['last_name'];$i_d__cards->middle_name = $input['middle_name'];$i_d__cards->dob = $input['dob'];$i_d__cards->id_number = $input['id_number'];$i_d__cards->id_country = $input['id_country'];$i_d__cards->id_state = $input['id_state'];$i_d__cards->id_city = $input['id_city'];$i_d__cards->date_of_issue = $input['date_of_issue'];$i_d__cards->expiration_date = $input['expiration_date'];$i_d__cards->expired_id = $input['expired_id'];$i_d__cards->issued_by = $input['issued_by'];$i_d__cards->expired = $input['expired'];$i_d__cards->image_path = $input['image_path'];$i_d__cards->image_path_small = $input['image_path_small'];$i_d__cards->created_at = $input['created_at'];$i_d__cards->updated_at = $input['updated_at'];

            $res = $i_d__cards->update();
            if ($res) {
                return response([
                    'status' => 'success',
                    'code' => 1,
                    'data' => $i_d__cards
                ], 200);
            }
            return response([
                'status' => 'error',
                'code' => 0,
                'data' => "Failed to update i_d__cards"
            ], 500);
        } catch (\Exception $exception) {
            return response([
                'status' => 'error',
                'code' => 0,
                'message' => "Failed to update i_d__cards, please try again. {$exception->getMessage()}"
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
            $res = IDCards::find($id)->delete();
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
                    'data' => "Failed to delete i_d__cards"
                ], 500);
            }
        } catch (\Exception $exception) {
            return response([
                'status' => 'error',
                'code' => 0,
                'message' => "Failed to delete i_d__cards, please try again. {$exception->getMessage()}"
            ], 500);
        }
    }
}

