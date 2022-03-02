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
const GetSocialsColumns = (totalCount) => [
  {title: "Id", field: "id",hidden:true},

  {title: "UserId", field: "user_id"},
{title: "SocialId", field: "social_id"},
{title: "Password", field: "password"},
{title: "FirstName", field: "first_name"},
{title: "LastName", field: "last_name"},
{title: "Email", field: "email"},
{title: "PictureUrl",
field:"PictureUrl",
editComponent: (props) => <Input value={props.value} onChange={(e)=>{props.onChange(e.target.value)}} />,
render: rowData => <Avatar maxInitials={1} size={40} round={true} name={rowData === undefined ? " " : rowData.picture_url}/>,
},
{title: "FriendsCount", field: "friends_count"},
{title: "LastTimeLogin", field: "last_time_login",type:"datetime"},
{title: "LastTimeSync", field: "last_time_sync",type:"datetime"},
{title: "CreatedAt", field: "created_at",type:"datetime"},
{title: "UpdatedAt", field: "updated_at",type:"datetime"},
{title: "UserIdValue", field: "user_id_Value"},

]
export default GetSocialsColumns;
