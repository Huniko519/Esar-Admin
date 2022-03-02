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
const GetCountry_CurrenciesColumns = (totalCount) => [
  {title: "Id", field: "id",hidden:true},

  {title: "Country", field: "country"},
{title: "ArabicCountry", field: "arabic_country"},
{title: "Currency", field: "currency"},
{title: "ArabicCurrency", field: "arabic_currency"},
{title: "Code", field: "code"},
{title: "ArabicCode", field: "arabic_code"},
{title: "Symbol", field: "symbol"},
{title: "ArabicSymbol", field: "arabic_symbol"},
{title: "CreatedAt", field: "created_at",type:"datetime"},
{title: "UpdatedAt", field: "updated_at",type:"datetime"},

]
export default GetCountry_CurrenciesColumns;
