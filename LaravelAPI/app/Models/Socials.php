<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Socials extends Model
{ 
    protected $table = "socials";
    public $timestamps = false;
    protected $primaryKey = 'id';
    public $boolean = 1;
  /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'user_id','social_id','password','first_name','last_name','email','picture_url','friends_count','last_time_login','last_time_sync','created_at','updated_at'
    ];

     /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        
'last_time_login' => 'datetime',
'last_time_sync' => 'datetime',
'created_at' => 'datetime',
'updated_at' => 'datetime',
    ];

    use HasFactory;
}

