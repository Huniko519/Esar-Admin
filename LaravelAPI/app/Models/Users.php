<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Users extends Model
{ 
    protected $table = "users";
    public $timestamps = false;
    protected $primaryKey = 'id';
    public $boolean = 1;
  /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'first_name','last_name','email','password','currency_type','country_code','phone_number','email_verified','phone_verified','approved_to_drive','id_verified','sms_code','verify_email_token','is_facebook','friends_count','is_google','listed','reviewed','count_stars','stars_as_renter','reviewed_as_owner','count_stars_as_owner','stars_as_owner','user_stars','trips','car_trips','count_penalty_renter','count_penalty_owner','count_penalty_in_period','penalty_amount','penalty_period','sms_notifications','email_promotions','transmission_expert','work_from_time','work_until_time','is_working_time','payment','bank_name','holder_name','iban','account_number','is_bank_account','promo_code','promo_code_used','user_active_status','admin_delete','deleting_time','created_at','updated_at','is_apple'
    ];

     /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        
'deleting_time' => 'datetime',
'created_at' => 'datetime',
'updated_at' => 'datetime',
    ];

    use HasFactory;
}

