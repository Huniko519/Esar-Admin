import {withRouter} from "react-router";
import TextField from "@material-ui/core/TextField";
import React, {useEffect, useState} from 'react';
import Grid from "@material-ui/core/Grid";
import Snackbar from '@material-ui/core/Snackbar';
import { Switch } from "@material-ui/core";
import MuiAlert from '@material-ui/lab/Alert';
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import PageTemplate from "../templates/Template";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import InputLabel from '@material-ui/core/InputLabel';
import history from '../../history';
import { Loading } from "../templates/Loading";
import {addUsers, getUsers,getOneUsers, updateUsers} from "../../repo/usersRepo";





function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
function validateEmail(email){
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
const UsersAddUpdatePage = (props)=>{
    const [alertState, setAlertstate] = useState({
        open: false,
        vertical: 'bottom',
        horizontal: 'center',
        severity: "success",
        message:"",
      });
    const { vertical, horizontal, open, severity, message } = alertState;
    const [errorMessages, setErrorMessages] = useState({});
    const [users,setUsers] = useState(undefined);
    const [loading, setLoading] = useState(false);
    

    const checkErrors = () => {
        let errorList = {}
        if(users.password === "" || users.password === undefined)
{
   errorList = { ...errorList,password: "Required field!"}
}
if(users.currency_type === "" || users.currency_type === undefined)
{
   errorList = { ...errorList,currency_type: "Required field!"}
}
if(users.email_verified === "" || validateEmail(users.email_verified) === false)
{
   errorList = { ...errorList,email_verified: "Enter a valid email!"}
}
if(users.phone_verified === "" || users.phone_verified === undefined)
{
   errorList = { ...errorList,phone_verified: "Required field!"}
}
if(users.approved_to_drive === "" || users.approved_to_drive === undefined)
{
   errorList = { ...errorList,approved_to_drive: "Required field!"}
}
if(users.id_verified === "" || users.id_verified === undefined)
{
   errorList = { ...errorList,id_verified: "Required field!"}
}
if(users.listed === "" || users.listed === undefined)
{
   errorList = { ...errorList,listed: "Required field!"}
}
if(users.reviewed === "" || users.reviewed === undefined)
{
   errorList = { ...errorList,reviewed: "Required field!"}
}
if(users.count_stars === "" || users.count_stars === undefined)
{
   errorList = { ...errorList,count_stars: "Required field!"}
}
if(users.reviewed_as_owner === "" || users.reviewed_as_owner === undefined)
{
   errorList = { ...errorList,reviewed_as_owner: "Required field!"}
}
if(users.count_stars_as_owner === "" || users.count_stars_as_owner === undefined)
{
   errorList = { ...errorList,count_stars_as_owner: "Required field!"}
}
if(users.trips === "" || users.trips === undefined)
{
   errorList = { ...errorList,trips: "Required field!"}
}
if(users.car_trips === "" || users.car_trips === undefined)
{
   errorList = { ...errorList,car_trips: "Required field!"}
}
if(users.count_penalty_renter === "" || users.count_penalty_renter === undefined)
{
   errorList = { ...errorList,count_penalty_renter: "Required field!"}
}
if(users.count_penalty_owner === "" || users.count_penalty_owner === undefined)
{
   errorList = { ...errorList,count_penalty_owner: "Required field!"}
}
if(users.count_penalty_in_period === "" || users.count_penalty_in_period === undefined)
{
   errorList = { ...errorList,count_penalty_in_period: "Required field!"}
}
if(users.sms_notifications === "" || users.sms_notifications === undefined)
{
   errorList = { ...errorList,sms_notifications: "Required field!"}
}
if(users.email_promotions === "" || validateEmail(users.email_promotions) === false)
{
   errorList = { ...errorList,email_promotions: "Enter a valid email!"}
}
if(users.is_working_time === "" || users.is_working_time === undefined)
{
   errorList = { ...errorList,is_working_time: "Required field!"}
}
if(users.is_bank_account === "" || users.is_bank_account === undefined)
{
   errorList = { ...errorList,is_bank_account: "Required field!"}
}
if(users.user_active_status === "" || users.user_active_status === undefined)
{
   errorList = { ...errorList,user_active_status: "Required field!"}
}
if(users.admin_delete === "" || users.admin_delete === undefined)
{
   errorList = { ...errorList,admin_delete: "Required field!"}
}


        setErrorMessages(errorList)
        return errorList
    }

    useEffect(()=>{
     setLoading(true);
    
      
        if(props.match.params.id) {
            setLoading(true);
            getOneUsers(props.match.params.id).then((res) => {
                setUsers(res.data.data);
                setLoading(false);
            })
        }else{
            setUsers({})
        }
    },[props.match.params.id])
   

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
        const errors = checkErrors()
        //if no errors then send data
        if(Object.keys(errors).length<1) {
            if (users.id) {
            setLoading(true);
               var updateResponse =  await updateUsers(users.id,users);
               setLoading(false);
               if(updateResponse && updateResponse.data){
                   if(updateResponse.data.code===1){
                    setAlertstate({ open: true, vertical: 'bottom', horizontal: 'center', message:"Record Updated Successfully.",severity:"success"});
                     }else{
                    setAlertstate({ open: true, vertical: 'bottom', horizontal: 'center', message:"Updated failed. Please try again.", severity:"error"});
                }
               }else{
                setAlertstate({ open: true, vertical: 'bottom', horizontal: 'center', message:"Updated failed. Please try again.", severity:"error"});
            }
                //props.history.push("/");
            } else {
            setLoading(true);
                var addResponse = await addUsers(users);
                setLoading(false);
                if(addResponse && addResponse.data){
                    if(addResponse.data.code===1){
                        setAlertstate({ open: true, vertical: 'bottom', horizontal: 'center', message:"Record Added Successfully.",severity:"success"});
                          }else{
                        setAlertstate({ open: true, vertical: 'bottom', horizontal: 'center', message:"Add Record Failed. Please try again.",severity:"error"});
                    }
                }else{
                    setAlertstate({ open: true, vertical: 'bottom', horizontal: 'center', message:"Add Record Failed. Please try again.",severity:"error"});
                    
                }
                //props.history.push("/");
            }
        }else{
            setAlertstate({ open: true, vertical: 'bottom', horizontal: 'center', message:"Invalid Data. Please try again.",severity:"error"});
                   
        } 
    }catch (e) {
        setAlertstate({ open: true, vertical: 'bottom', horizontal: 'center', message:"Invalid Data. Please try again.",severity:"error"});
            
    }

    }
   
    const hideAlert = () => {
        setAlertstate({ ...alertState, open: false });
      };
    return(
        <PageTemplate title="Add/Update Users">
            <Card>
            <CardContent>
                <form onSubmit={handleSubmit} noValidate autoComplete="off">
               
                    {(users!==undefined )?
                        <Grid spacing={3} container>
                           <Grid xs={12} md={6} key={"0"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.first_name}
type ={"text"}
onChange={(e)=>{setUsers({...users,first_name:e.target.value});checkErrors()}}
defaultValue ={users.first_name}
error ={(errorMessages.first_name)?true:false}
label ={"first_name"}/>
</ Grid >
<Grid xs={12} md={6} key={"1"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.last_name}
type ={"text"}
onChange={(e)=>{setUsers({...users,last_name:e.target.value});checkErrors()}}
defaultValue ={users.last_name}
error ={(errorMessages.last_name)?true:false}
label ={"last_name"}/>
</ Grid >
<Grid xs={12} md={6} key={"2"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.email}
type ={"email"}
onChange={(e)=>{setUsers({...users,email:e.target.value});checkErrors()}}
defaultValue ={users.email}
error ={(errorMessages.email)?true:false}
label ={"email"}/>
</ Grid >
<Grid xs={12} md={6} key={"3"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.password}
type ={"password"}
onChange={(e)=>{setUsers({...users,password:e.target.value});checkErrors()}}
defaultValue ={users.password}
error ={(errorMessages.password)?true:false}
label ={"password"}/>
</ Grid >
<Grid xs={12} md={6} key={"4"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.currency_type}
type ={"number"}
onChange={(e)=>{setUsers({...users,currency_type:e.target.value});checkErrors()}}
defaultValue ={users.currency_type}
error ={(errorMessages.currency_type)?true:false}
label ={"currency_type"}/>
</ Grid >
<Grid xs={12} md={6} key={"5"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.country_code}
type ={"text"}
onChange={(e)=>{setUsers({...users,country_code:e.target.value});checkErrors()}}
defaultValue ={users.country_code}
error ={(errorMessages.country_code)?true:false}
label ={"country_code"}/>
</ Grid >
<Grid xs={12} md={6} key={"6"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.phone_number}
type ={"text"}
onChange={(e)=>{setUsers({...users,phone_number:e.target.value});checkErrors()}}
defaultValue ={users.phone_number}
error ={(errorMessages.phone_number)?true:false}
label ={"phone_number"}/>
</ Grid >
<Grid xs={12} md={6} key={"7"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.email_verified}
type ={"number"}
onChange={(e)=>{setUsers({...users,email_verified:e.target.value});checkErrors()}}
defaultValue ={users.email_verified}
error ={(errorMessages.email_verified)?true:false}
label ={"email_verified"}/>
</ Grid >
<Grid xs={12} md={6} key={"8"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.phone_verified}
type ={"number"}
onChange={(e)=>{setUsers({...users,phone_verified:e.target.value});checkErrors()}}
defaultValue ={users.phone_verified}
error ={(errorMessages.phone_verified)?true:false}
label ={"phone_verified"}/>
</ Grid >
<Grid xs={12} md={6} key={"9"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.approved_to_drive}
type ={"number"}
onChange={(e)=>{setUsers({...users,approved_to_drive:e.target.value});checkErrors()}}
defaultValue ={users.approved_to_drive}
error ={(errorMessages.approved_to_drive)?true:false}
label ={"approved_to_drive"}/>
</ Grid >
<Grid xs={12} md={6} key={"10"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.id_verified}
type ={"number"}
onChange={(e)=>{setUsers({...users,id_verified:e.target.value});checkErrors()}}
defaultValue ={users.id_verified}
error ={(errorMessages.id_verified)?true:false}
label ={"id_verified"}/>
</ Grid >
<Grid xs={12} md={6} key={"11"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.sms_code}
type ={"text"}
onChange={(e)=>{setUsers({...users,sms_code:e.target.value});checkErrors()}}
defaultValue ={users.sms_code}
error ={(errorMessages.sms_code)?true:false}
label ={"sms_code"}/>
</ Grid >
<Grid xs={12} md={6} key={"12"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.verify_email_token}
type ={"email"}
onChange={(e)=>{setUsers({...users,verify_email_token:e.target.value});checkErrors()}}
defaultValue ={users.verify_email_token}
error ={(errorMessages.verify_email_token)?true:false}
label ={"verify_email_token"}/>
</ Grid >
<Grid xs={12} md={6} key={"13"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.is_facebook}
type ={"number"}
onChange={(e)=>{setUsers({...users,is_facebook:e.target.value});checkErrors()}}
defaultValue ={users.is_facebook}
error ={(errorMessages.is_facebook)?true:false}
label ={"is_facebook"}/>
</ Grid >
<Grid xs={12} md={6} key={"14"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.friends_count}
type ={"number"}
onChange={(e)=>{setUsers({...users,friends_count:e.target.value});checkErrors()}}
defaultValue ={users.friends_count}
error ={(errorMessages.friends_count)?true:false}
label ={"friends_count"}/>
</ Grid >
<Grid xs={12} md={6} key={"15"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.is_google}
type ={"number"}
onChange={(e)=>{setUsers({...users,is_google:e.target.value});checkErrors()}}
defaultValue ={users.is_google}
error ={(errorMessages.is_google)?true:false}
label ={"is_google"}/>
</ Grid >
<Grid xs={12} md={6} key={"16"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.listed}
type ={"number"}
onChange={(e)=>{setUsers({...users,listed:e.target.value});checkErrors()}}
defaultValue ={users.listed}
error ={(errorMessages.listed)?true:false}
label ={"listed"}/>
</ Grid >
<Grid xs={12} md={6} key={"17"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.reviewed}
type ={"number"}
onChange={(e)=>{setUsers({...users,reviewed:e.target.value});checkErrors()}}
defaultValue ={users.reviewed}
error ={(errorMessages.reviewed)?true:false}
label ={"reviewed"}/>
</ Grid >
<Grid xs={12} md={6} key={"18"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.count_stars}
type ={"number"}
onChange={(e)=>{setUsers({...users,count_stars:e.target.value});checkErrors()}}
defaultValue ={users.count_stars}
error ={(errorMessages.count_stars)?true:false}
label ={"count_stars"}/>
</ Grid >
<Grid xs={12} md={6} key={"19"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.stars_as_renter}
type ={"number"}
onChange={(e)=>{setUsers({...users,stars_as_renter:e.target.value});checkErrors()}}
defaultValue ={users.stars_as_renter}
error ={(errorMessages.stars_as_renter)?true:false}
label ={"stars_as_renter"}/>
</ Grid >
<Grid xs={12} md={6} key={"20"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.reviewed_as_owner}
type ={"number"}
onChange={(e)=>{setUsers({...users,reviewed_as_owner:e.target.value});checkErrors()}}
defaultValue ={users.reviewed_as_owner}
error ={(errorMessages.reviewed_as_owner)?true:false}
label ={"reviewed_as_owner"}/>
</ Grid >
<Grid xs={12} md={6} key={"21"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.count_stars_as_owner}
type ={"number"}
onChange={(e)=>{setUsers({...users,count_stars_as_owner:e.target.value});checkErrors()}}
defaultValue ={users.count_stars_as_owner}
error ={(errorMessages.count_stars_as_owner)?true:false}
label ={"count_stars_as_owner"}/>
</ Grid >
<Grid xs={12} md={6} key={"22"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.stars_as_owner}
type ={"number"}
onChange={(e)=>{setUsers({...users,stars_as_owner:e.target.value});checkErrors()}}
defaultValue ={users.stars_as_owner}
error ={(errorMessages.stars_as_owner)?true:false}
label ={"stars_as_owner"}/>
</ Grid >
<Grid xs={12} md={6} key={"23"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.user_stars}
type ={"number"}
onChange={(e)=>{setUsers({...users,user_stars:e.target.value});checkErrors()}}
defaultValue ={users.user_stars}
error ={(errorMessages.user_stars)?true:false}
label ={"user_stars"}/>
</ Grid >
<Grid xs={12} md={6} key={"24"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.trips}
type ={"number"}
onChange={(e)=>{setUsers({...users,trips:e.target.value});checkErrors()}}
defaultValue ={users.trips}
error ={(errorMessages.trips)?true:false}
label ={"trips"}/>
</ Grid >
<Grid xs={12} md={6} key={"25"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.car_trips}
type ={"number"}
onChange={(e)=>{setUsers({...users,car_trips:e.target.value});checkErrors()}}
defaultValue ={users.car_trips}
error ={(errorMessages.car_trips)?true:false}
label ={"car_trips"}/>
</ Grid >
<Grid xs={12} md={6} key={"26"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.count_penalty_renter}
type ={"number"}
onChange={(e)=>{setUsers({...users,count_penalty_renter:e.target.value});checkErrors()}}
defaultValue ={users.count_penalty_renter}
error ={(errorMessages.count_penalty_renter)?true:false}
label ={"count_penalty_renter"}/>
</ Grid >
<Grid xs={12} md={6} key={"27"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.count_penalty_owner}
type ={"number"}
onChange={(e)=>{setUsers({...users,count_penalty_owner:e.target.value});checkErrors()}}
defaultValue ={users.count_penalty_owner}
error ={(errorMessages.count_penalty_owner)?true:false}
label ={"count_penalty_owner"}/>
</ Grid >
<Grid xs={12} md={6} key={"28"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.count_penalty_in_period}
type ={"number"}
onChange={(e)=>{setUsers({...users,count_penalty_in_period:e.target.value});checkErrors()}}
defaultValue ={users.count_penalty_in_period}
error ={(errorMessages.count_penalty_in_period)?true:false}
label ={"count_penalty_in_period"}/>
</ Grid >
<Grid xs={12} md={6} key={"29"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.penalty_amount}
type ={"number"}
onChange={(e)=>{setUsers({...users,penalty_amount:e.target.value});checkErrors()}}
defaultValue ={users.penalty_amount}
error ={(errorMessages.penalty_amount)?true:false}
label ={"penalty_amount"}/>
</ Grid >
<Grid xs={12} md={6} key={"30"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.penalty_period}
type ={"text"}
onChange={(e)=>{setUsers({...users,penalty_period:e.target.value});checkErrors()}}
defaultValue ={users.penalty_period}
error ={(errorMessages.penalty_period)?true:false}
label ={"penalty_period"}/>
</ Grid >
<Grid xs={12} md={6} key={"31"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.sms_notifications}
type ={"number"}
onChange={(e)=>{setUsers({...users,sms_notifications:e.target.value});checkErrors()}}
defaultValue ={users.sms_notifications}
error ={(errorMessages.sms_notifications)?true:false}
label ={"sms_notifications"}/>
</ Grid >
<Grid xs={12} md={6} key={"32"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.email_promotions}
type ={"number"}
onChange={(e)=>{setUsers({...users,email_promotions:e.target.value});checkErrors()}}
defaultValue ={users.email_promotions}
error ={(errorMessages.email_promotions)?true:false}
label ={"email_promotions"}/>
</ Grid >
<Grid xs={12} md={6} key={"33"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.transmission_expert}
type ={"number"}
onChange={(e)=>{setUsers({...users,transmission_expert:e.target.value});checkErrors()}}
defaultValue ={users.transmission_expert}
error ={(errorMessages.transmission_expert)?true:false}
label ={"transmission_expert"}/>
</ Grid >
<Grid xs={12} md={6} key={"34"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.work_from_time}
type ={"text"}
onChange={(e)=>{setUsers({...users,work_from_time:e.target.value});checkErrors()}}
defaultValue ={users.work_from_time}
error ={(errorMessages.work_from_time)?true:false}
label ={"work_from_time"}/>
</ Grid >
<Grid xs={12} md={6} key={"35"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.work_until_time}
type ={"text"}
onChange={(e)=>{setUsers({...users,work_until_time:e.target.value});checkErrors()}}
defaultValue ={users.work_until_time}
error ={(errorMessages.work_until_time)?true:false}
label ={"work_until_time"}/>
</ Grid >
<Grid xs={12} md={6} key={"36"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.is_working_time}
type ={"number"}
onChange={(e)=>{setUsers({...users,is_working_time:e.target.value});checkErrors()}}
defaultValue ={users.is_working_time}
error ={(errorMessages.is_working_time)?true:false}
label ={"is_working_time"}/>
</ Grid >
<Grid xs={12} md={6} key={"37"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.payment}
type ={"number"}
onChange={(e)=>{setUsers({...users,payment:e.target.value});checkErrors()}}
defaultValue ={users.payment}
error ={(errorMessages.payment)?true:false}
label ={"payment"}/>
</ Grid >
<Grid xs={12} md={6} key={"38"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.bank_name}
type ={"text"}
onChange={(e)=>{setUsers({...users,bank_name:e.target.value});checkErrors()}}
defaultValue ={users.bank_name}
error ={(errorMessages.bank_name)?true:false}
label ={"bank_name"}/>
</ Grid >
<Grid xs={12} md={6} key={"39"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.holder_name}
type ={"text"}
onChange={(e)=>{setUsers({...users,holder_name:e.target.value});checkErrors()}}
defaultValue ={users.holder_name}
error ={(errorMessages.holder_name)?true:false}
label ={"holder_name"}/>
</ Grid >
<Grid xs={12} md={6} key={"40"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.iban}
type ={"text"}
onChange={(e)=>{setUsers({...users,iban:e.target.value});checkErrors()}}
defaultValue ={users.iban}
error ={(errorMessages.iban)?true:false}
label ={"iban"}/>
</ Grid >
<Grid xs={12} md={6} key={"41"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.account_number}
type ={"text"}
onChange={(e)=>{setUsers({...users,account_number:e.target.value});checkErrors()}}
defaultValue ={users.account_number}
error ={(errorMessages.account_number)?true:false}
label ={"account_number"}/>
</ Grid >
<Grid xs={12} md={6} key={"42"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.is_bank_account}
type ={"number"}
onChange={(e)=>{setUsers({...users,is_bank_account:e.target.value});checkErrors()}}
defaultValue ={users.is_bank_account}
error ={(errorMessages.is_bank_account)?true:false}
label ={"is_bank_account"}/>
</ Grid >
<Grid xs={12} md={6} key={"43"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.promo_code}
type ={"text"}
onChange={(e)=>{setUsers({...users,promo_code:e.target.value});checkErrors()}}
defaultValue ={users.promo_code}
error ={(errorMessages.promo_code)?true:false}
label ={"promo_code"}/>
</ Grid >
<Grid xs={12} md={6} key={"44"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.promo_code_used}
type ={"number"}
onChange={(e)=>{setUsers({...users,promo_code_used:e.target.value});checkErrors()}}
defaultValue ={users.promo_code_used}
error ={(errorMessages.promo_code_used)?true:false}
label ={"promo_code_used"}/>
</ Grid >
<Grid xs={12} md={6} key={"45"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.user_active_status}
type ={"number"}
onChange={(e)=>{setUsers({...users,user_active_status:e.target.value});checkErrors()}}
defaultValue ={users.user_active_status}
error ={(errorMessages.user_active_status)?true:false}
label ={"user_active_status"}/>
</ Grid >
<Grid xs={12} md={6} key={"46"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.admin_delete}
type ={"number"}
onChange={(e)=>{setUsers({...users,admin_delete:e.target.value});checkErrors()}}
defaultValue ={users.admin_delete}
error ={(errorMessages.admin_delete)?true:false}
label ={"admin_delete"}/>
</ Grid >
<Grid xs={12} md={6} key={"47"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.deleting_time}
type ={"datetime-local"}
InputLabelProps ={{ shrink: true, }}
onChange={(e)=>{setUsers({...users,deleting_time:e.target.value});checkErrors()}}
defaultValue ={users.deleting_time}
error ={(errorMessages.deleting_time)?true:false}
label ={"deleting_time"}/>
</ Grid >
<Grid xs={12} md={6} key={"48"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.created_at}
type ={"datetime-local"}
InputLabelProps ={{ shrink: true, }}
onChange={(e)=>{setUsers({...users,created_at:e.target.value});checkErrors()}}
defaultValue ={users.created_at}
error ={(errorMessages.created_at)?true:false}
label ={"created_at"}/>
</ Grid >
<Grid xs={12} md={6} key={"49"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.updated_at}
type ={"datetime-local"}
InputLabelProps ={{ shrink: true, }}
onChange={(e)=>{setUsers({...users,updated_at:e.target.value});checkErrors()}}
defaultValue ={users.updated_at}
error ={(errorMessages.updated_at)?true:false}
label ={"updated_at"}/>
</ Grid >
<Grid xs={12} md={6} key={"50"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.is_apple}
type ={"number"}
onChange={(e)=>{setUsers({...users,is_apple:e.target.value});checkErrors()}}
defaultValue ={users.is_apple}
error ={(errorMessages.is_apple)?true:false}
label ={"is_apple"}/>
</ Grid >
<Grid xs={12}  md={6} item key={"51"}>
<Grid container justify={"flex-end"} alignContent={"flex-end"}>
<Button onClick={() => history.push('/users')} variant={"contained"} type={"Button"} color="secondary">Cancel</Button>
</Grid>
</Grid>
<Grid xs={12}  md={6} item key={"52"}>
<Grid container justify={"flex-end"} alignContent={"flex-end"}>
<Button variant={"contained"} color="primary"  type={"Sumbit"}>Save</Button>
</Grid>
</Grid>

                        </Grid>
                        :null}
                </form>
                
               
                </CardContent>
                </Card>
                <Snackbar autoHideDuration={6000}
                    anchorOrigin={{ vertical, horizontal }}
                    open={open}
                    onClose={hideAlert}
                    key={vertical + horizontal}>
                       <Alert onClose={hideAlert}  severity={severity}>
                       {message}
                    </Alert>
                </Snackbar>
        </PageTemplate>
    )
}

export default withRouter(UsersAddUpdatePage)
