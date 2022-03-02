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
const GetError_LogsColumns = (totalCount) => [
  {title: "Id", field: "id",hidden:true},

  {title: "RequestUri", field: "request_uri"},
{title: "RedirectUri", field: "redirect_uri"},
{title: "Referer", field: "referer"},
{title: "UserAgent", field: "user_agent"},
{title: "StatusCode", field: "status_code"},
{title: "Message", field: "message"},
{title: "File",
field:"File",
editComponent: (props) => <Input value={props.value} onChange={(e)=>{props.onChange(e.target.value)}} />,
render: rowData => <Avatar maxInitials={1} size={40} round={true} name={rowData === undefined ? " " : rowData.file}/>,
},
{title: "Line", field: "line"},
{title: "Code", field: "code"},
{title: "SqlError", field: "sql_error"},
{title: "ErrorInfo", field: "error_info"},
{title: "Model", field: "model"},
{title: "ExceptionTrace", field: "exception_trace"},
{title: "Headers", field: "headers"},
{title: "Ids", field: "ids"},
{title: "ExceptionPrevious", field: "exception_previous"},
{title: "Severity", field: "severity"},
{title: "UserId", field: "user_id"},
{title: "CarId", field: "car_id"},
{title: "TripId", field: "trip_id"},
{title: "TripBillId", field: "trip_bill_id"},
{title: "ChatId", field: "chat_id"},
{title: "CreatedAt", field: "created_at",type:"datetime"},
{title: "UpdatedAt", field: "updated_at",type:"datetime"},

]
export default GetError_LogsColumns;
