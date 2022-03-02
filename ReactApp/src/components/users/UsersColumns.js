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
const GetUsersColumns = (totalCount) => [
  {title: "Id", field: "id",hidden:true},

  {title: "FirstName", field: "first_name"},
{title: "LastName", field: "last_name"},
{title: "Email", field: "email"},
{title: "Password", field: "password"},
{title: "CurrencyType", field: "currency_type"},
{title: "CountryCode", field: "country_code"},
{title: "PhoneNumber", field: "phone_number"},
{title: "EmailVerified", field: "email_verified"},
{title: "PhoneVerified", field: "phone_verified"},
{title: "ApprovedToDrive", field: "approved_to_drive"},
{title: "IdVerified", field: "id_verified"},
{title: "SmsCode", field: "sms_code"},
{title: "VerifyEmailToken", field: "verify_email_token"},
{title: "IsFacebook", field: "is_facebook"},
{title: "FriendsCount", field: "friends_count"},
{title: "IsGoogle", field: "is_google"},
{title: "Listed", field: "listed"},
{title: "Reviewed", field: "reviewed"},
{title: "CountStars", field: "count_stars"},
{title: "StarsAsRenter", field: "stars_as_renter"},
{title: "ReviewedAsOwner", field: "reviewed_as_owner"},
{title: "CountStarsAsOwner", field: "count_stars_as_owner"},
{title: "StarsAsOwner", field: "stars_as_owner"},
{title: "UserStars", field: "user_stars"},
{title: "Trips", field: "trips"},
{title: "CarTrips", field: "car_trips"},
{title: "CountPenaltyRenter", field: "count_penalty_renter"},
{title: "CountPenaltyOwner", field: "count_penalty_owner"},
{title: "CountPenaltyInPeriod", field: "count_penalty_in_period"},
{title: "PenaltyAmount", field: "penalty_amount"},
{title: "PenaltyPeriod", field: "penalty_period"},
{title: "SmsNotifications", field: "sms_notifications"},
{title: "EmailPromotions", field: "email_promotions"},
{title: "TransmissionExpert", field: "transmission_expert"},
{title: "WorkFromTime", field: "work_from_time"},
{title: "WorkUntilTime", field: "work_until_time"},
{title: "IsWorkingTime", field: "is_working_time"},
{title: "Payment", field: "payment"},
{title: "BankName", field: "bank_name"},
{title: "HolderName", field: "holder_name"},
{title: "Iban", field: "iban"},
{title: "AccountNumber", field: "account_number"},
{title: "IsBankAccount", field: "is_bank_account"},
{title: "PromoCode", field: "promo_code"},
{title: "PromoCodeUsed", field: "promo_code_used"},
{title: "UserActiveStatus", field: "user_active_status"},
{title: "AdminDelete", field: "admin_delete"},
{title: "DeletingTime", field: "deleting_time",type:"datetime"},
{title: "CreatedAt", field: "created_at",type:"datetime"},
{title: "UpdatedAt", field: "updated_at",type:"datetime"},
{title: "IsApple", field: "is_apple"},

]
export default GetUsersColumns;
