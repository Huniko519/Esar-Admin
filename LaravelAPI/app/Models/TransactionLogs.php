<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TransactionLogs extends Model
{ 
    protected $table = "transaction_logs";
    public $timestamps = false;
    protected $primaryKey = 'id';
    public $boolean = 1;
  /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'trip_id','trip_bill_id','user_id','device_os_version','app_version','payment_sdk_version','error_message','error_code','error_id','stack_trace','amount','currency','cart_id','transaction_class','transaction_type','transaction_first_reference','test_mode','transaction_time','city','country','region','street_address','first_name','last_name','title','email','device_manufacturer','device_model','device_longitude','device_latitude','app_id','app_name','store_id','auth_key','created_at','updated_at'
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

