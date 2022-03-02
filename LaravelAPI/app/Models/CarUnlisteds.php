<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CarUnlisteds extends Model
{ 
    protected $table = "car_unlisteds";
    public $timestamps = false;
    protected $primaryKey = 'id';
    public $boolean = 1;
  /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'car_id','car_status','user_auto_delete','admin_delete','have_no_car','safety_concerns','not_earning_enough','too_much_work','negative_experience','other_reason','start_date','end_date','feedback','created_at','updated_at'
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

