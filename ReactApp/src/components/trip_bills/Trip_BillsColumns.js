import { Switch } from '@material-ui/core';
import React from 'react';
import Avatar from 'react-avatar';
import Input from "@material-ui/core/Input";

/*
In order to validate errors on the input field you can
override the editComponent of the Material Table to add a new material-ui Input fields
and use props for validation.
Information on material-ui Input element https://material-ui.com/api/input/
Information on material-table Props https://material-table.com/#/docs/all-props
You can also find an example of an overridden element bellow. Overriding the render method is not a must.
 */
const GetTrip_BillsColumns = (totalCount) => [
  {title: "Id", field: "id",hidden:true},

  {title: "TripId", field: "trip_id"},
{title: "TripDays", field: "trip_days"},
{title: "TripStartDate", field: "trip_start_date"},
{title: "TripEndDate", field: "trip_end_date"},
{title: "Deposit", field: "deposit"},
{title: "DiscountWeek", field: "discount_week"},
{title: "DiscountMonth", field: "discount_month"},
{title: "DiscountAmount", field: "discount_amount"},
{title: "PromoCode", field: "promo_code"},
{title: "PromoCodeDiscount", field: "promo_code_discount"},
{title: "IsPromoFixed", field: "is_promo_fixed"},
{title: "PromoDiscount", field: "promo_discount"},
{title: "AveragePrice", field: "average_price"},
{title: "ServiceFee", field: "service_fee"},
{title: "DeliveryFee", field: "delivery_fee"},
{title: "TripPrice", field: "trip_price"},
{title: "PriceWithDiscount", field: "price_with_discount"},
{title: "HasBeenRefund", field: "has_been_refund"},
{title: "RefundAmount", field: "refund_amount"},
{title: "OwnerEarning", field: "owner_earning"},
{title: "EsarEarning", field: "esar_earning"},
{title: "TripTotal", field: "trip_total"},
{title: "EsarPaid", field: "esar_paid"},
{title: "EsarPaidDate", field: "esar_paid_date"},
{title: "BookedInstantly", field: "booked_instantly"},
{title: "TripPaid", field: "trip_paid"},
{title: "OrderRef", field: "order_ref"},
{title: "TranRef", field: "tran_ref"},
{title: "TripBillStatus", field: "trip_bill_status"},
{title: "CreatedAt", field: "created_at",type:"datetime"},
{title: "UpdatedAt", field: "updated_at",type:"datetime"},

]
export default GetTrip_BillsColumns;
