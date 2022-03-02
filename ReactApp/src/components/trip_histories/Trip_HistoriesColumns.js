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
const GetTrip_HistoriesColumns = (totalCount) => [
  {title: "Id", field: "id",hidden:true},

  {title: "ChatId", field: "chat_id"},
{title: "OwnerId", field: "owner_id"},
{title: "CarId", field: "car_id"},
{title: "RenterId", field: "renter_id"},
{title: "DeliveryOnAirport", field: "delivery_on_airport"},
{title: "AirportId", field: "airport_id"},
{title: "DeliveryOnCarLocation", field: "delivery_on_car_location"},
{title: "DeliveryOnRenterLocation", field: "delivery_on_renter_location"},
{title: "LongLocation", field: "long_location"},
{title: "LatLocation", field: "lat_location"},
{title: "PickupLocation",
field:"PickupLocation",
editComponent: (props) => <Input value={props.value} onChange={(e)=>{props.onChange(e.target.value)}} />,
render: rowData => <Avatar maxInitials={1} size={40} round={true} name={rowData === undefined ? " " : rowData.pickup_location}/>,
},
{title: "NoticeTime", field: "notice_time"},
{title: "BookedInstantly", field: "booked_instantly"},
{title: "RenterConfirmTrip", field: "renter_confirm_trip"},
{title: "OwnerConfirmTrip", field: "owner_confirm_trip"},
{title: "Status", field: "status"},
{title: "TelrCancel", field: "telr_cancel"},
{title: "RenterConfirmTripUpdate", field: "renter_confirm_trip_update"},
{title: "OwnerConfirmTripUpdate", field: "owner_confirm_trip_update"},
{title: "TelrCancelModification", field: "telr_cancel_modification"},
{title: "TripModified", field: "trip_modified"},
{title: "IsTripModified", field: "is_trip_modified"},
{title: "IAgree", field: "i_agree"},
{title: "StartDate", field: "start_date",type:"datetime"},
{title: "EndDate", field: "end_date",type:"datetime"},
{title: "CreatedAt", field: "created_at",type:"datetime"},
{title: "UpdatedAt", field: "updated_at",type:"datetime"},

]
export default GetTrip_HistoriesColumns;
