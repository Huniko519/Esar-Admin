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
const GetBook_InstantliesColumns = (totalCount) => [
  {title: "Id", field: "id",hidden:true},

  {title: "CarId", field: "car_id"},
{title: "OnCarLocation", field: "on_car_location"},
{title: "OnAirport", field: "on_airport"},
{title: "OnGuestLocation", field: "on_guest_location"},
{title: "WorkOnGuestLocation", field: "work_on_guest_location"},
{title: "DeliveryFeeGuestLocation", field: "delivery_fee_guest_location"},
{title: "MaxDistance", field: "max_distance"},
{title: "MinTripForFreeDelivery", field: "min_trip_for_free_delivery"},
{title: "GuestLocationDeliveryDetails", field: "guest_location_delivery_details"},
{title: "CreatedAt", field: "created_at",type:"datetime"},
{title: "UpdatedAt", field: "updated_at",type:"datetime"},
{title: "CarIdValue", field: "car_id_Value"},

]
export default GetBook_InstantliesColumns;
