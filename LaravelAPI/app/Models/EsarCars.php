<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EsarCars extends Model
{ 
    protected $table = "esar_cars";
    public $timestamps = false;
    protected $primaryKey = 'id';
    public $boolean = 1;
  /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'id','model_make_id','manufacturer_arabic','model_name','model_trim','model_year','model_class','model_body','model_engine_fuel','model_transmission_type','model_transmission_type_arabic','model_seats','model_doors','model_lkm_hwy','model_lkm_city'
    ];

     /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        
    ];

    use HasFactory;
}

