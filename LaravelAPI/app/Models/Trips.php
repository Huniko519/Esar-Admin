<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Trips extends Model
{ 
    protected $table = "trips";
    public $timestamps = false;
    protected $primaryKey = 'id';
    public $boolean = 1;
  /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'chat_id','owner_id','car_id','renter_id','delivery_on_airport','airport_id','delivery_on_car_location','delivery_on_renter_location','long_location','lat_location','pickup_location','notice_time','booked_instantly','renter_confirm_trip','owner_confirm_trip','status','telr_cancel','renter_confirm_trip_update','owner_confirm_trip_update','telr_cancel_modification','trip_modified','is_trip_modified','i_agree','start_date','end_date','created_at','updated_at'
    ];

     /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        
'start_date' => 'datetime',
'end_date' => 'datetime',
'created_at' => 'datetime',
'updated_at' => 'datetime',
    ];

    use HasFactory;
}

