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
const GetEsar_CarsColumns = (totalCount) => [
  {title: "Id", field: "id",hidden:true},

  {title: "ModelMakeId", field: "model_make_id"},
{title: "ManufacturerArabic", field: "manufacturer_arabic"},
{title: "ModelName", field: "model_name"},
{title: "ModelTrim", field: "model_trim"},
{title: "ModelYear", field: "model_year"},
{title: "ModelClass", field: "model_class"},
{title: "ModelBody", field: "model_body"},
{title: "ModelEngineFuel", field: "model_engine_fuel"},
{title: "ModelTransmissionType", field: "model_transmission_type"},
{title: "ModelTransmissionTypeArabic", field: "model_transmission_type_arabic"},
{title: "ModelSeats", field: "model_seats"},
{title: "ModelDoors", field: "model_doors"},
{title: "ModelLkmHwy", field: "model_lkm_hwy"},
{title: "ModelLkmCity", field: "model_lkm_city"},

]
export default GetEsar_CarsColumns;
