<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cars extends Model
{ 
    protected $table = "cars";
    public $timestamps = false;
    protected $primaryKey = 'id';
    public $boolean = 1;
  /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'user_id','long_location','lat_location','car_city','car_manufacturer','car_manufacturer_arabic','car_model','production_year','model_class','trim','style','car_transmission','brended','car_value','vehicle_type','vehicle_type_arabic','car_odometer','real_odometer','deposit','count_stars','count_reviews','count_rates','count_trips','key_hand_off','parking_details','notice','car_location_notice','airport_notice','guest_location_notice','short_trip','long_trip','weekend_trip','long_term_trip','is_registration_car_verified','is_insurance_verified','car_is_active','is_deleted','paid_advertising','phase','created_at','updated_at'
    ];

     /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        
'created_at' => 'datetime',
'updated_at' => 'datetime',
    ];

    use HasFactory;
}

