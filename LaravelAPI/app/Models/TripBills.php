<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TripBills extends Model
{ 
    protected $table = "trip_bills";
    public $timestamps = false;
    protected $primaryKey = 'id';
    public $boolean = 1;
  /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'trip_id','trip_days','trip_start_date','trip_end_date','deposit','discount_week','discount_month','discount_amount','promo_code','promo_code_discount','is_promo_fixed','promo_discount','average_price','service_fee','delivery_fee','trip_price','price_with_discount','has_been_refund','refund_amount','owner_earning','esar_earning','trip_total','esar_paid','esar_paid_date','booked_instantly','trip_paid','order_ref','tran_ref','trip_bill_status','created_at','updated_at'
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

