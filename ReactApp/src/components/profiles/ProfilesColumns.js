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
const GetProfilesColumns = (totalCount) => [
  {title: "Id", field: "id",hidden:true},

  {title: "UserId", field: "user_id"},
{title: "Works", field: "works"},
{title: "Address", field: "address"},
{title: "School", field: "school"},
{title: "Language", field: "language"},
{title: "AboutMe", field: "about_me"},
{title: "OriginalImagePath",
field:"OriginalImagePath",
editComponent: (props) => <Input value={props.value} onChange={(e)=>{props.onChange(e.target.value)}} />,
render: rowData => <Avatar maxInitials={1} size={40} round={true} name={rowData === undefined ? " " : rowData.original_image_path}/>,
},
{title: "ProfilePhoto",
field:"ProfilePhoto",
editComponent: (props) => <Input value={props.value} onChange={(e)=>{props.onChange(e.target.value)}} />,
render: rowData => <Avatar maxInitials={1} size={40} round={true} name={rowData === undefined ? " " : rowData.profile_photo}/>,
},
{title: "ProfilePhotoHeader",
field:"ProfilePhotoHeader",
editComponent: (props) => <Input value={props.value} onChange={(e)=>{props.onChange(e.target.value)}} />,
render: rowData => <Avatar maxInitials={1} size={40} round={true} name={rowData === undefined ? " " : rowData.profile_photo_header}/>,
},
{title: "CreatedAt", field: "created_at",type:"datetime"},
{title: "UpdatedAt", field: "updated_at",type:"datetime"},
{title: "UserIdValue", field: "user_id_Value"},

]
export default GetProfilesColumns;
