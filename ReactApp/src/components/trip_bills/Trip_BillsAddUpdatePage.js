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
import {addTrip_Bills, getTrip_Bills,getOneTrip_Bills, updateTrip_Bills} from "../../repo/trip_billsRepo";





function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
function validateEmail(email){
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
const Trip_BillsAddUpdatePage = (props)=>{
    const [alertState, setAlertstate] = useState({
        open: false,
        vertical: 'bottom',
        horizontal: 'center',
        severity: "success",
        message:"",
      });
    const { vertical, horizontal, open, severity, message } = alertState;
    const [errorMessages, setErrorMessages] = useState({});
    const [trip_bills,setTrip_Bills] = useState(undefined);
    const [loading, setLoading] = useState(false);
    

    const checkErrors = () => {
        let errorList = {}
        if(trip_bills.trip_id === "" || trip_bills.trip_id === undefined)
{
   errorList = { ...errorList,trip_id: "Required field!"}
}
if(trip_bills.trip_days === "" || trip_bills.trip_days === undefined)
{
   errorList = { ...errorList,trip_days: "Required field!"}
}
if(trip_bills.trip_start_date === "" || trip_bills.trip_start_date === undefined)
{
   errorList = { ...errorList,trip_start_date: "Required field!"}
}
if(trip_bills.trip_end_date === "" || trip_bills.trip_end_date === undefined)
{
   errorList = { ...errorList,trip_end_date: "Required field!"}
}
if(trip_bills.average_price === "" || trip_bills.average_price === undefined)
{
   errorList = { ...errorList,average_price: "Required field!"}
}
if(trip_bills.trip_price === "" || trip_bills.trip_price === undefined)
{
   errorList = { ...errorList,trip_price: "Required field!"}
}
if(trip_bills.owner_earning === "" || trip_bills.owner_earning === undefined)
{
   errorList = { ...errorList,owner_earning: "Required field!"}
}
if(trip_bills.esar_earning === "" || trip_bills.esar_earning === undefined)
{
   errorList = { ...errorList,esar_earning: "Required field!"}
}
if(trip_bills.trip_total === "" || trip_bills.trip_total === undefined)
{
   errorList = { ...errorList,trip_total: "Required field!"}
}
if(trip_bills.esar_paid === "" || trip_bills.esar_paid === undefined)
{
   errorList = { ...errorList,esar_paid: "Required field!"}
}
if(trip_bills.trip_paid === "" || trip_bills.trip_paid === undefined)
{
   errorList = { ...errorList,trip_paid: "Required field!"}
}


        setErrorMessages(errorList)
        return errorList
    }

    useEffect(()=>{
     setLoading(true);
    
      
        if(props.match.params.id) {
            setLoading(true);
            getOneTrip_Bills(props.match.params.id).then((res) => {
                setTrip_Bills(res.data.data);
                setLoading(false);
            })
        }else{
            setTrip_Bills({})
        }
    },[props.match.params.id])
   

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
        const errors = checkErrors()
        //if no errors then send data
        if(Object.keys(errors).length<1) {
            if (trip_bills.id) {
            setLoading(true);
               var updateResponse =  await updateTrip_Bills(trip_bills.id,trip_bills);
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
                var addResponse = await addTrip_Bills(trip_bills);
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
        <PageTemplate title="Add/Update Trip_Bills">
            <Card>
            <CardContent>
                <form onSubmit={handleSubmit} noValidate autoComplete="off">
               
                    {(trip_bills!==undefined )?
                        <Grid spacing={3} container>
                           <Grid xs={12} md={6} key={"0"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.trip_id}
type ={"text"}
onChange={(e)=>{setTrip_Bills({...trip_bills,trip_id:e.target.value});checkErrors()}}
defaultValue ={trip_bills.trip_id}
error ={(errorMessages.trip_id)?true:false}
label ={"trip_id"}/>
</ Grid >
<Grid xs={12} md={6} key={"1"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.trip_days}
type ={"number"}
onChange={(e)=>{setTrip_Bills({...trip_bills,trip_days:e.target.value});checkErrors()}}
defaultValue ={trip_bills.trip_days}
error ={(errorMessages.trip_days)?true:false}
label ={"trip_days"}/>
</ Grid >
<Grid xs={12} md={6} key={"2"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.trip_start_date}
type ={"text"}
onChange={(e)=>{setTrip_Bills({...trip_bills,trip_start_date:e.target.value});checkErrors()}}
defaultValue ={trip_bills.trip_start_date}
error ={(errorMessages.trip_start_date)?true:false}
label ={"trip_start_date"}/>
</ Grid >
<Grid xs={12} md={6} key={"3"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.trip_end_date}
type ={"text"}
onChange={(e)=>{setTrip_Bills({...trip_bills,trip_end_date:e.target.value});checkErrors()}}
defaultValue ={trip_bills.trip_end_date}
error ={(errorMessages.trip_end_date)?true:false}
label ={"trip_end_date"}/>
</ Grid >
<Grid xs={12} md={6} key={"4"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.deposit}
type ={"number"}
onChange={(e)=>{setTrip_Bills({...trip_bills,deposit:e.target.value});checkErrors()}}
defaultValue ={trip_bills.deposit}
error ={(errorMessages.deposit)?true:false}
label ={"deposit"}/>
</ Grid >
<Grid xs={12} md={6} key={"5"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.discount_week}
type ={"number"}
onChange={(e)=>{setTrip_Bills({...trip_bills,discount_week:e.target.value});checkErrors()}}
defaultValue ={trip_bills.discount_week}
error ={(errorMessages.discount_week)?true:false}
label ={"discount_week"}/>
</ Grid >
<Grid xs={12} md={6} key={"6"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.discount_month}
type ={"number"}
onChange={(e)=>{setTrip_Bills({...trip_bills,discount_month:e.target.value});checkErrors()}}
defaultValue ={trip_bills.discount_month}
error ={(errorMessages.discount_month)?true:false}
label ={"discount_month"}/>
</ Grid >
<Grid xs={12} md={6} key={"7"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.discount_amount}
type ={"number"}
onChange={(e)=>{setTrip_Bills({...trip_bills,discount_amount:e.target.value});checkErrors()}}
defaultValue ={trip_bills.discount_amount}
error ={(errorMessages.discount_amount)?true:false}
label ={"discount_amount"}/>
</ Grid >
<Grid xs={12} md={6} key={"8"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.promo_code}
type ={"text"}
onChange={(e)=>{setTrip_Bills({...trip_bills,promo_code:e.target.value});checkErrors()}}
defaultValue ={trip_bills.promo_code}
error ={(errorMessages.promo_code)?true:false}
label ={"promo_code"}/>
</ Grid >
<Grid xs={12} md={6} key={"9"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.promo_code_discount}
type ={"number"}
onChange={(e)=>{setTrip_Bills({...trip_bills,promo_code_discount:e.target.value});checkErrors()}}
defaultValue ={trip_bills.promo_code_discount}
error ={(errorMessages.promo_code_discount)?true:false}
label ={"promo_code_discount"}/>
</ Grid >
<Grid xs={12} md={6} key={"10"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.is_promo_fixed}
type ={"number"}
onChange={(e)=>{setTrip_Bills({...trip_bills,is_promo_fixed:e.target.value});checkErrors()}}
defaultValue ={trip_bills.is_promo_fixed}
error ={(errorMessages.is_promo_fixed)?true:false}
label ={"is_promo_fixed"}/>
</ Grid >
<Grid xs={12} md={6} key={"11"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.promo_discount}
type ={"number"}
onChange={(e)=>{setTrip_Bills({...trip_bills,promo_discount:e.target.value});checkErrors()}}
defaultValue ={trip_bills.promo_discount}
error ={(errorMessages.promo_discount)?true:false}
label ={"promo_discount"}/>
</ Grid >
<Grid xs={12} md={6} key={"12"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.average_price}
type ={"number"}
onChange={(e)=>{setTrip_Bills({...trip_bills,average_price:e.target.value});checkErrors()}}
defaultValue ={trip_bills.average_price}
error ={(errorMessages.average_price)?true:false}
label ={"average_price"}/>
</ Grid >
<Grid xs={12} md={6} key={"13"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.service_fee}
type ={"number"}
onChange={(e)=>{setTrip_Bills({...trip_bills,service_fee:e.target.value});checkErrors()}}
defaultValue ={trip_bills.service_fee}
error ={(errorMessages.service_fee)?true:false}
label ={"service_fee"}/>
</ Grid >
<Grid xs={12} md={6} key={"14"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.delivery_fee}
type ={"number"}
onChange={(e)=>{setTrip_Bills({...trip_bills,delivery_fee:e.target.value});checkErrors()}}
defaultValue ={trip_bills.delivery_fee}
error ={(errorMessages.delivery_fee)?true:false}
label ={"delivery_fee"}/>
</ Grid >
<Grid xs={12} md={6} key={"15"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.trip_price}
type ={"number"}
onChange={(e)=>{setTrip_Bills({...trip_bills,trip_price:e.target.value});checkErrors()}}
defaultValue ={trip_bills.trip_price}
error ={(errorMessages.trip_price)?true:false}
label ={"trip_price"}/>
</ Grid >
<Grid xs={12} md={6} key={"16"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.price_with_discount}
type ={"number"}
onChange={(e)=>{setTrip_Bills({...trip_bills,price_with_discount:e.target.value});checkErrors()}}
defaultValue ={trip_bills.price_with_discount}
error ={(errorMessages.price_with_discount)?true:false}
label ={"price_with_discount"}/>
</ Grid >
<Grid xs={12} md={6} key={"17"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.has_been_refund}
type ={"number"}
onChange={(e)=>{setTrip_Bills({...trip_bills,has_been_refund:e.target.value});checkErrors()}}
defaultValue ={trip_bills.has_been_refund}
error ={(errorMessages.has_been_refund)?true:false}
label ={"has_been_refund"}/>
</ Grid >
<Grid xs={12} md={6} key={"18"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.refund_amount}
type ={"number"}
onChange={(e)=>{setTrip_Bills({...trip_bills,refund_amount:e.target.value});checkErrors()}}
defaultValue ={trip_bills.refund_amount}
error ={(errorMessages.refund_amount)?true:false}
label ={"refund_amount"}/>
</ Grid >
<Grid xs={12} md={6} key={"19"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.owner_earning}
type ={"number"}
onChange={(e)=>{setTrip_Bills({...trip_bills,owner_earning:e.target.value});checkErrors()}}
defaultValue ={trip_bills.owner_earning}
error ={(errorMessages.owner_earning)?true:false}
label ={"owner_earning"}/>
</ Grid >
<Grid xs={12} md={6} key={"20"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.esar_earning}
type ={"number"}
onChange={(e)=>{setTrip_Bills({...trip_bills,esar_earning:e.target.value});checkErrors()}}
defaultValue ={trip_bills.esar_earning}
error ={(errorMessages.esar_earning)?true:false}
label ={"esar_earning"}/>
</ Grid >
<Grid xs={12} md={6} key={"21"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.trip_total}
type ={"number"}
onChange={(e)=>{setTrip_Bills({...trip_bills,trip_total:e.target.value});checkErrors()}}
defaultValue ={trip_bills.trip_total}
error ={(errorMessages.trip_total)?true:false}
label ={"trip_total"}/>
</ Grid >
<Grid xs={12} md={6} key={"22"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.esar_paid}
type ={"number"}
onChange={(e)=>{setTrip_Bills({...trip_bills,esar_paid:e.target.value});checkErrors()}}
defaultValue ={trip_bills.esar_paid}
error ={(errorMessages.esar_paid)?true:false}
label ={"esar_paid"}/>
</ Grid >
<Grid xs={12} md={6} key={"23"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.esar_paid_date}
type ={"text"}
onChange={(e)=>{setTrip_Bills({...trip_bills,esar_paid_date:e.target.value});checkErrors()}}
defaultValue ={trip_bills.esar_paid_date}
error ={(errorMessages.esar_paid_date)?true:false}
label ={"esar_paid_date"}/>
</ Grid >
<Grid xs={12} md={6} key={"24"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.booked_instantly}
type ={"number"}
onChange={(e)=>{setTrip_Bills({...trip_bills,booked_instantly:e.target.value});checkErrors()}}
defaultValue ={trip_bills.booked_instantly}
error ={(errorMessages.booked_instantly)?true:false}
label ={"booked_instantly"}/>
</ Grid >
<Grid xs={12} md={6} key={"25"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.trip_paid}
type ={"number"}
onChange={(e)=>{setTrip_Bills({...trip_bills,trip_paid:e.target.value});checkErrors()}}
defaultValue ={trip_bills.trip_paid}
error ={(errorMessages.trip_paid)?true:false}
label ={"trip_paid"}/>
</ Grid >
<Grid xs={12} md={6} key={"26"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.order_ref}
type ={"text"}
onChange={(e)=>{setTrip_Bills({...trip_bills,order_ref:e.target.value});checkErrors()}}
defaultValue ={trip_bills.order_ref}
error ={(errorMessages.order_ref)?true:false}
label ={"order_ref"}/>
</ Grid >
<Grid xs={12} md={6} key={"27"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.tran_ref}
type ={"text"}
onChange={(e)=>{setTrip_Bills({...trip_bills,tran_ref:e.target.value});checkErrors()}}
defaultValue ={trip_bills.tran_ref}
error ={(errorMessages.tran_ref)?true:false}
label ={"tran_ref"}/>
</ Grid >
<Grid xs={12} md={6} key={"28"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.trip_bill_status}
type ={"text"}
onChange={(e)=>{setTrip_Bills({...trip_bills,trip_bill_status:e.target.value});checkErrors()}}
defaultValue ={trip_bills.trip_bill_status}
error ={(errorMessages.trip_bill_status)?true:false}
label ={"trip_bill_status"}/>
</ Grid >
<Grid xs={12} md={6} key={"29"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.created_at}
type ={"datetime-local"}
InputLabelProps ={{ shrink: true, }}
onChange={(e)=>{setTrip_Bills({...trip_bills,created_at:e.target.value});checkErrors()}}
defaultValue ={trip_bills.created_at}
error ={(errorMessages.created_at)?true:false}
label ={"created_at"}/>
</ Grid >
<Grid xs={12} md={6} key={"30"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.updated_at}
type ={"datetime-local"}
InputLabelProps ={{ shrink: true, }}
onChange={(e)=>{setTrip_Bills({...trip_bills,updated_at:e.target.value});checkErrors()}}
defaultValue ={trip_bills.updated_at}
error ={(errorMessages.updated_at)?true:false}
label ={"updated_at"}/>
</ Grid >
<Grid xs={12}  md={6} item key={"31"}>
<Grid container justify={"flex-end"} alignContent={"flex-end"}>
<Button onClick={() => history.push('/trip_bills')} variant={"contained"} type={"Button"} color="secondary">Cancel</Button>
</Grid>
</Grid>
<Grid xs={12}  md={6} item key={"32"}>
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

export default withRouter(Trip_BillsAddUpdatePage)
