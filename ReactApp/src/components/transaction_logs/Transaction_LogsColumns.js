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
const GetTransaction_LogsColumns = (totalCount) => [
  {title: "Id", field: "id",hidden:true},

  {title: "TripId", field: "trip_id"},
{title: "TripBillId", field: "trip_bill_id"},
{title: "UserId", field: "user_id"},
{title: "DeviceOsVersion", field: "device_os_version"},
{title: "AppVersion", field: "app_version"},
{title: "PaymentSdkVersion", field: "payment_sdk_version"},
{title: "ErrorMessage", field: "error_message"},
{title: "ErrorCode", field: "error_code"},
{title: "ErrorId", field: "error_id"},
{title: "StackTrace", field: "stack_trace"},
{title: "Amount", field: "amount"},
{title: "Currency", field: "currency"},
{title: "CartId", field: "cart_id"},
{title: "TransactionClass", field: "transaction_class"},
{title: "TransactionType", field: "transaction_type"},
{title: "TransactionFirstReference", field: "transaction_first_reference"},
{title: "TestMode", field: "test_mode"},
{title: "TransactionTime", field: "transaction_time"},
{title: "City", field: "city"},
{title: "Country", field: "country"},
{title: "Region", field: "region"},
{title: "StreetAddress", field: "street_address"},
{title: "FirstName", field: "first_name"},
{title: "LastName", field: "last_name"},
{title: "Title", field: "title"},
{title: "Email", field: "email"},
{title: "DeviceManufacturer", field: "device_manufacturer"},
{title: "DeviceModel", field: "device_model"},
{title: "DeviceLongitude", field: "device_longitude"},
{title: "DeviceLatitude", field: "device_latitude"},
{title: "AppId", field: "app_id"},
{title: "AppName", field: "app_name"},
{title: "StoreId", field: "store_id"},
{title: "AuthKey", field: "auth_key"},
{title: "CreatedAt", field: "created_at",type:"datetime"},
{title: "UpdatedAt", field: "updated_at",type:"datetime"},

]
export default GetTransaction_LogsColumns;
