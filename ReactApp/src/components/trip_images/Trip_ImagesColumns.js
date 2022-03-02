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
const GetTrip_ImagesColumns = (totalCount) => [
  {title: "Id", field: "id",hidden:true},

  {title: "TripId", field: "trip_id"},
{title: "UserId", field: "user_id"},
{title: "ImagePath",
field:"ImagePath",
editComponent: (props) => <Input value={props.value} onChange={(e)=>{props.onChange(e.target.value)}} />,
render: rowData => <Avatar maxInitials={1} size={40} round={true} name={rowData === undefined ? " " : rowData.image_path}/>,
},
{title: "SmallImagePath",
field:"SmallImagePath",
editComponent: (props) => <Input value={props.value} onChange={(e)=>{props.onChange(e.target.value)}} />,
render: rowData => <Avatar maxInitials={1} size={40} round={true} name={rowData === undefined ? " " : rowData.small_image_path}/>,
},
{title: "BeforeTrip", field: "before_trip"},
{title: "CreatedAt", field: "created_at",type:"datetime"},
{title: "UpdatedAt", field: "updated_at",type:"datetime"},
{title: "UserIdValue", field: "user_id_Value"},

]
export default GetTrip_ImagesColumns;
