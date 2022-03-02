<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EsarAirports extends Model
{ 
    protected $table = "esar_airports";
    public $timestamps = false;
    protected $primaryKey = 'id';
    public $boolean = 1;
  /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'iata','icao','airport_name','arabic_airport_name','alternative_name','arabic_alternative_name','airport_city','arabic_airport_city','airport_state','arabic_airport_state','latitude','longitude','region'
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

