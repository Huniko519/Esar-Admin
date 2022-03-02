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
const GetCar_AvailablesColumns = (totalCount) => [
  {title: "Id", field: "id",hidden:true},

  {title: "CarId", field: "car_id"},
{title: "TripId", field: "trip_id"},
{title: "UnavailableFrom", field: "unavailable_from",type:"datetime"},
{title: "UnavailableTo", field: "unavailable_to",type:"datetime"},
{title: "Status", field: "status"},
{title: "Repeat", field: "repeat"},
{title: "RepeatMethod", field: "repeat_method"},
{title: "RepeatUntil", field: "repeat_until",type:"datetime"},
{title: "CreatedAt", field: "created_at",type:"datetime"},
{title: "UpdatedAt", field: "updated_at",type:"datetime"},
{title: "CarIdValue", field: "car_id_Value"},

]
export default GetCar_AvailablesColumns;
