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
const GetRental_CalculatorsColumns = (totalCount) => [
  {title: "Id", field: "id",hidden:true},

  {title: "Email", field: "email"},
{title: "Phone", field: "phone"},
{title: "CarManufacturer", field: "car_manufacturer"},
{title: "CarManufacturerArabic", field: "car_manufacturer_arabic"},
{title: "CarModel", field: "car_model"},
{title: "ProductionYear", field: "production_year"},
{title: "ModelClass", field: "model_class"},
{title: "Trim", field: "trim"},
{title: "Style", field: "style"},
{title: "CarTransmission", field: "car_transmission"},
{title: "CarTransmissionArabic", field: "car_transmission_arabic"},
{title: "CarValue", field: "car_value"},
{title: "VehicleType", field: "vehicle_type"},
{title: "VehicleTypeArabic", field: "vehicle_type_arabic"},
{title: "CarOdometer", field: "car_odometer"},
{title: "RealOdometer", field: "real_odometer"},
{title: "DailyPrice", field: "daily_price"},
{title: "YearlyPrice", field: "yearly_price"},
{title: "CreatedAt", field: "created_at",type:"datetime"},
{title: "UpdatedAt", field: "updated_at",type:"datetime"},

]
export default GetRental_CalculatorsColumns;
