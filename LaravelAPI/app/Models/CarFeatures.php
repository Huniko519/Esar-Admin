<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CarFeatures extends Model
{ 
    protected $table = "car_features";
    public $timestamps = false;
    protected $primaryKey = 'id';
    public $boolean = 1;
  /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'car_id','color','model_seats','model_doors','model_engine_fuel','gas_grade','model_lkm_city','model_lkm_hwy','hybrid','bike_rack','all_drive','child_seat','gps','ski_rack','bluetooth','usb','ventilated_seat','audio_input','convertible','toll_pass','sunroof','pet_friendly','heated_seat','car_title','car_description','car_guidelines','created_at','updated_at'
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

