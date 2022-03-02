<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserAvailables extends Model
{ 
    protected $table = "user_availables";
    public $timestamps = false;
    protected $primaryKey = 'id';
    public $boolean = 1;
  /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'user_id','trip_id','unavailable_from','unavailable_to','repeat','repeat_method','repeat_until','created_at','updated_at'
    ];

     /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        
'unavailable_from' => 'datetime',
'unavailable_to' => 'datetime',
'repeat_until' => 'datetime',
'created_at' => 'datetime',
'updated_at' => 'datetime',
    ];

    use HasFactory;
}

