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
const GetCar_FeaturesColumns = (totalCount) => [
  {title: "Id", field: "id",hidden:true},

  {title: "CarId", field: "car_id"},
{title: "Color", field: "color"},
{title: "ModelSeats", field: "model_seats"},
{title: "ModelDoors", field: "model_doors"},
{title: "ModelEngineFuel", field: "model_engine_fuel"},
{title: "GasGrade", field: "gas_grade"},
{title: "ModelLkmCity", field: "model_lkm_city"},
{title: "ModelLkmHwy", field: "model_lkm_hwy"},
{title: "Hybrid", field: "hybrid"},
{title: "BikeRack", field: "bike_rack"},
{title: "AllDrive", field: "all_drive"},
{title: "ChildSeat", field: "child_seat"},
{title: "Gps", field: "gps"},
{title: "SkiRack", field: "ski_rack"},
{title: "Bluetooth", field: "bluetooth"},
{title: "Usb", field: "usb"},
{title: "VentilatedSeat", field: "ventilated_seat"},
{title: "AudioInput", field: "audio_input"},
{title: "Convertible", field: "convertible"},
{title: "TollPass", field: "toll_pass"},
{title: "Sunroof", field: "sunroof"},
{title: "PetFriendly", field: "pet_friendly"},
{title: "HeatedSeat", field: "heated_seat"},
{title: "CarTitle", field: "car_title"},
{title: "CarDescription", field: "car_description"},
{title: "CarGuidelines", field: "car_guidelines"},
{title: "CreatedAt", field: "created_at",type:"datetime"},
{title: "UpdatedAt", field: "updated_at",type:"datetime"},
{title: "CarIdValue", field: "car_id_Value"},

]
export default GetCar_FeaturesColumns;
