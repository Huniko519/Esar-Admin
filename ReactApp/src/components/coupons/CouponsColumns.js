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
const GetCouponsColumns = (totalCount) => [
  {title: "Id", field: "id",hidden:true},

  {title: "Code", field: "code"},
{title: "Name", field: "name"},
{title: "Description", field: "description"},
{title: "UsesNumber", field: "uses_number"},
{title: "MaxUses", field: "max_uses"},
{title: "MaxUsesUser", field: "max_uses_user"},
{title: "Type", field: "type"},
{title: "DiscountAmount", field: "discount_amount"},
{title: "IsFixed", field: "is_fixed"},
{title: "StartsAt", field: "starts_at",type:"datetime"},
{title: "ExpiresAt", field: "expires_at",type:"datetime"},
{title: "CreatedAt", field: "created_at",type:"datetime"},
{title: "UpdatedAt", field: "updated_at",type:"datetime"},
{title: "DeletedAt", field: "deleted_at",type:"datetime"},

]
export default GetCouponsColumns;
