<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RentalCalculators extends Model
{ 
    protected $table = "rental_calculators";
    public $timestamps = false;
    protected $primaryKey = 'id';
    public $boolean = 1;
  /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'email','phone','car_manufacturer','car_manufacturer_arabic','car_model','production_year','model_class','trim','style','car_transmission','car_transmission_arabic','car_value','vehicle_type','vehicle_type_arabic','car_odometer','real_odometer','daily_price','yearly_price','created_at','updated_at'
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

