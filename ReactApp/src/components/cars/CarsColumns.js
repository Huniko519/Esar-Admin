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
const GetCarsColumns = (totalCount) => [
  {title: "Id", field: "id",hidden:true},

  {title: "UserId", field: "user_id"},
{title: "LongLocation", field: "long_location"},
{title: "LatLocation", field: "lat_location"},
{title: "CarCity", field: "car_city"},
{title: "CarManufacturer", field: "car_manufacturer"},
{title: "CarManufacturerArabic", field: "car_manufacturer_arabic"},
{title: "CarModel", field: "car_model"},
{title: "ProductionYear", field: "production_year"},
{title: "ModelClass", field: "model_class"},
{title: "Trim", field: "trim"},
{title: "Style", field: "style"},
{title: "CarTransmission", field: "car_transmission"},
{title: "Brended", field: "brended"},
{title: "CarValue", field: "car_value"},
{title: "VehicleType", field: "vehicle_type"},
{title: "VehicleTypeArabic", field: "vehicle_type_arabic"},
{title: "CarOdometer", field: "car_odometer"},
{title: "RealOdometer", field: "real_odometer"},
{title: "Deposit", field: "deposit"},
{title: "CountStars", field: "count_stars"},
{title: "CountReviews", field: "count_reviews"},
{title: "CountRates", field: "count_rates"},
{title: "CountTrips", field: "count_trips"},
{title: "KeyHandOff", field: "key_hand_off"},
{title: "ParkingDetails", field: "parking_details"},
{title: "Notice", field: "notice"},
{title: "CarLocationNotice", field: "car_location_notice"},
{title: "AirportNotice", field: "airport_notice"},
{title: "GuestLocationNotice", field: "guest_location_notice"},
{title: "ShortTrip", field: "short_trip"},
{title: "LongTrip", field: "long_trip"},
{title: "WeekendTrip", field: "weekend_trip"},
{title: "LongTermTrip", field: "long_term_trip"},
{title: "IsRegistrationCarVerified", field: "is_registration_car_verified"},
{title: "IsInsuranceVerified", field: "is_insurance_verified"},
{title: "CarIsActive", field: "car_is_active"},
{title: "IsDeleted", field: "is_deleted"},
{title: "PaidAdvertising", field: "paid_advertising"},
{title: "Phase", field: "phase"},
{title: "CreatedAt", field: "created_at",type:"datetime"},
{title: "UpdatedAt", field: "updated_at",type:"datetime"},
{title: "UserIdValue", field: "user_id_Value"},

]
export default GetCarsColumns;
