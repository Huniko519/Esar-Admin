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
const GetActivity_RequestsColumns = (totalCount) => [
  {title: "Id", field: "id",hidden:true},

  {title: "OwnerId", field: "owner_id"},
{title: "RenterId", field: "renter_id"},
{title: "CarId", field: "car_id"},
{title: "TripId", field: "trip_id"},
{title: "ActivityRequestType", field: "activity_request_type"},
{title: "Status", field: "status"},
{title: "Visibility", field: "visibility"},
{title: "CreatedAt", field: "created_at",type:"datetime"},
{title: "UpdatedAt", field: "updated_at",type:"datetime"},
{title: "OwnerIdValue", field: "owner_id_Value"},
{title: "RenterIdValue", field: "renter_id_Value"},
{title: "CarIdValue", field: "car_id_Value"},

]
export default GetActivity_RequestsColumns;
