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
const GetEsar_AirportsColumns = (totalCount) => [
  {title: "Id", field: "id",hidden:true},

  {title: "Iata", field: "iata"},
{title: "Icao", field: "icao"},
{title: "AirportName", field: "airport_name"},
{title: "ArabicAirportName", field: "arabic_airport_name"},
{title: "AlternativeName", field: "alternative_name"},
{title: "ArabicAlternativeName", field: "arabic_alternative_name"},
{title: "AirportCity", field: "airport_city"},
{title: "ArabicAirportCity", field: "arabic_airport_city"},
{title: "AirportState", field: "airport_state"},
{title: "ArabicAirportState", field: "arabic_airport_state"},
{title: "Latitude", field: "latitude"},
{title: "Longitude", field: "longitude"},
{title: "Region", field: "region"},

]
export default GetEsar_AirportsColumns;
