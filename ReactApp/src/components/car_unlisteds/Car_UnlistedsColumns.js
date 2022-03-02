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
const GetCar_UnlistedsColumns = (totalCount) => [
  {title: "Id", field: "id",hidden:true},

  {title: "CarId", field: "car_id"},
{title: "CarStatus", field: "car_status"},
{title: "UserAutoDelete", field: "user_auto_delete"},
{title: "AdminDelete", field: "admin_delete"},
{title: "HaveNoCar", field: "have_no_car"},
{title: "SafetyConcerns", field: "safety_concerns"},
{title: "NotEarningEnough", field: "not_earning_enough"},
{title: "TooMuchWork", field: "too_much_work"},
{title: "NegativeExperience", field: "negative_experience"},
{title: "OtherReason", field: "other_reason"},
{title: "StartDate", field: "start_date",type:"datetime"},
{title: "EndDate", field: "end_date",type:"datetime"},
{title: "Feedback", field: "feedback"},
{title: "CreatedAt", field: "created_at",type:"datetime"},
{title: "UpdatedAt", field: "updated_at",type:"datetime"},
{title: "CarIdValue", field: "car_id_Value"},

]
export default GetCar_UnlistedsColumns;
