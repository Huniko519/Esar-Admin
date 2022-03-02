<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TripCars extends Model
{ 
    protected $table = "trip_cars";
    public $timestamps = false;
    protected $primaryKey = 'id';
    public $boolean = 1;
  /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'trip_id','car_id','car_manufacturer','car_manufacturer_arabic','car_model','color','model_seats','model_doors','model_engine_fuel','gas_grade','model_lkm_city','model_lkm_hwy','hybrid','bike_rack','all_drive','child_seat','gps','ski_rack','bluetooth','usb','ventilated_seat','audio_input','convertible','toll_pass','sunroof','car_title','car_description','car_guidelines','original_image_path','small_image_path','created_at','updated_at'
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

