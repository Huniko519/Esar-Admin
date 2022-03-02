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
const GetCar_RegistrationsColumns = (totalCount) => [
  {title: "Id", field: "id",hidden:true},

  {title: "CarId", field: "car_id"},
{title: "Country", field: "country"},
{title: "State", field: "state"},
{title: "City", field: "city"},
{title: "LicencePlate", field: "licence_plate"},
{title: "ExpirationDate", field: "expiration_date"},
{title: "DateOfIssue", field: "date_of_issue"},
{title: "SmallCarRegistrationImage",
field:"SmallCarRegistrationImage",
editComponent: (props) => <Input value={props.value} onChange={(e)=>{props.onChange(e.target.value)}} />,
render: rowData => <Avatar maxInitials={1} size={40} round={true} name={rowData === undefined ? " " : rowData.small_car_registration_image}/>,
},
{title: "OriginalCarRegistrationImage",
field:"OriginalCarRegistrationImage",
editComponent: (props) => <Input value={props.value} onChange={(e)=>{props.onChange(e.target.value)}} />,
render: rowData => <Avatar maxInitials={1} size={40} round={true} name={rowData === undefined ? " " : rowData.original_car_registration_image}/>,
},
{title: "Expired", field: "expired"},
{title: "CreatedAt", field: "created_at",type:"datetime"},
{title: "UpdatedAt", field: "updated_at",type:"datetime"},
{title: "CarIdValue", field: "car_id_Value"},

]
export default GetCar_RegistrationsColumns;
