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
const GetI_D__CardsColumns = (totalCount) => [
  {title: "Id", field: "id",hidden:true},

  {title: "UserId", field: "user_id"},
{title: "FirstName", field: "first_name"},
{title: "LastName", field: "last_name"},
{title: "MiddleName", field: "middle_name"},
{title: "Dob", field: "dob"},
{title: "IdNumber", field: "id_number"},
{title: "IdCountry", field: "id_country"},
{title: "IdState", field: "id_state"},
{title: "IdCity", field: "id_city"},
{title: "DateOfIssue", field: "date_of_issue"},
{title: "ExpirationDate", field: "expiration_date"},
{title: "ExpiredId", field: "expired_id"},
{title: "IssuedBy", field: "issued_by"},
{title: "Expired", field: "expired"},
{title: "ImagePath",
field:"ImagePath",
editComponent: (props) => <Input value={props.value} onChange={(e)=>{props.onChange(e.target.value)}} />,
render: rowData => <Avatar maxInitials={1} size={40} round={true} name={rowData === undefined ? " " : rowData.image_path}/>,
},
{title: "ImagePathSmall",
field:"ImagePathSmall",
editComponent: (props) => <Input value={props.value} onChange={(e)=>{props.onChange(e.target.value)}} />,
render: rowData => <Avatar maxInitials={1} size={40} round={true} name={rowData === undefined ? " " : rowData.image_path_small}/>,
},
{title: "CreatedAt", field: "created_at",type:"datetime"},
{title: "UpdatedAt", field: "updated_at",type:"datetime"},
{title: "UserIdValue", field: "user_id_Value"},

]
export default GetI_D__CardsColumns;
