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
import {addRental_Calculators, getRental_Calculators,getOneRental_Calculators, updateRental_Calculators} from "../../repo/rental_calculatorsRepo";





function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
function validateEmail(email){
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
const Rental_CalculatorsAddUpdatePage = (props)=>{
    const [alertState, setAlertstate] = useState({
        open: false,
        vertical: 'bottom',
        horizontal: 'center',
        severity: "success",
        message:"",
      });
    const { vertical, horizontal, open, severity, message } = alertState;
    const [errorMessages, setErrorMessages] = useState({});
    const [rental_calculators,setRental_Calculators] = useState(undefined);
    const [loading, setLoading] = useState(false);
    

    const checkErrors = () => {
        let errorList = {}
        if(rental_calculators.email === "" || validateEmail(rental_calculators.email) === false)
{
   errorList = { ...errorList,email: "Enter a valid email!"}
}
if(rental_calculators.phone === "" || rental_calculators.phone === undefined)
{
   errorList = { ...errorList,phone: "Required field!"}
}
if(rental_calculators.car_manufacturer === "" || rental_calculators.car_manufacturer === undefined)
{
   errorList = { ...errorList,car_manufacturer: "Required field!"}
}
if(rental_calculators.car_manufacturer_arabic === "" || rental_calculators.car_manufacturer_arabic === undefined)
{
   errorList = { ...errorList,car_manufacturer_arabic: "Required field!"}
}
if(rental_calculators.car_model === "" || rental_calculators.car_model === undefined)
{
   errorList = { ...errorList,car_model: "Required field!"}
}
if(rental_calculators.production_year === "" || rental_calculators.production_year === undefined)
{
   errorList = { ...errorList,production_year: "Required field!"}
}
if(rental_calculators.model_class === "" || rental_calculators.model_class === undefined)
{
   errorList = { ...errorList,model_class: "Required field!"}
}
if(rental_calculators.car_transmission === "" || rental_calculators.car_transmission === undefined)
{
   errorList = { ...errorList,car_transmission: "Required field!"}
}
if(rental_calculators.car_value === "" || rental_calculators.car_value === undefined)
{
   errorList = { ...errorList,car_value: "Required field!"}
}
if(rental_calculators.vehicle_type === "" || rental_calculators.vehicle_type === undefined)
{
   errorList = { ...errorList,vehicle_type: "Required field!"}
}
if(rental_calculators.vehicle_type_arabic === "" || rental_calculators.vehicle_type_arabic === undefined)
{
   errorList = { ...errorList,vehicle_type_arabic: "Required field!"}
}
if(rental_calculators.daily_price === "" || rental_calculators.daily_price === undefined)
{
   errorList = { ...errorList,daily_price: "Required field!"}
}
if(rental_calculators.yearly_price === "" || rental_calculators.yearly_price === undefined)
{
   errorList = { ...errorList,yearly_price: "Required field!"}
}


        setErrorMessages(errorList)
        return errorList
    }

    useEffect(()=>{
     setLoading(true);
    
      
        if(props.match.params.id) {
            setLoading(true);
            getOneRental_Calculators(props.match.params.id).then((res) => {
                setRental_Calculators(res.data.data);
                setLoading(false);
            })
        }else{
            setRental_Calculators({})
        }
    },[props.match.params.id])
   

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
        const errors = checkErrors()
        //if no errors then send data
        if(Object.keys(errors).length<1) {
            if (rental_calculators.id) {
            setLoading(true);
               var updateResponse =  await updateRental_Calculators(rental_calculators.id,rental_calculators);
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
                var addResponse = await addRental_Calculators(rental_calculators);
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
        <PageTemplate title="Add/Update Rental_Calculators">
            <Card>
            <CardContent>
                <form onSubmit={handleSubmit} noValidate autoComplete="off">
               
                    {(rental_calculators!==undefined )?
                        <Grid spacing={3} container>
                           <Grid xs={12} md={6} key={"0"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.email}
type ={"email"}
onChange={(e)=>{setRental_Calculators({...rental_calculators,email:e.target.value});checkErrors()}}
defaultValue ={rental_calculators.email}
error ={(errorMessages.email)?true:false}
label ={"email"}/>
</ Grid >
<Grid xs={12} md={6} key={"1"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.phone}
type ={"text"}
onChange={(e)=>{setRental_Calculators({...rental_calculators,phone:e.target.value});checkErrors()}}
defaultValue ={rental_calculators.phone}
error ={(errorMessages.phone)?true:false}
label ={"phone"}/>
</ Grid >
<Grid xs={12} md={6} key={"2"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.car_manufacturer}
type ={"text"}
onChange={(e)=>{setRental_Calculators({...rental_calculators,car_manufacturer:e.target.value});checkErrors()}}
defaultValue ={rental_calculators.car_manufacturer}
error ={(errorMessages.car_manufacturer)?true:false}
label ={"car_manufacturer"}/>
</ Grid >
<Grid xs={12} md={6} key={"3"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.car_manufacturer_arabic}
type ={"text"}
onChange={(e)=>{setRental_Calculators({...rental_calculators,car_manufacturer_arabic:e.target.value});checkErrors()}}
defaultValue ={rental_calculators.car_manufacturer_arabic}
error ={(errorMessages.car_manufacturer_arabic)?true:false}
label ={"car_manufacturer_arabic"}/>
</ Grid >
<Grid xs={12} md={6} key={"4"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.car_model}
type ={"text"}
onChange={(e)=>{setRental_Calculators({...rental_calculators,car_model:e.target.value});checkErrors()}}
defaultValue ={rental_calculators.car_model}
error ={(errorMessages.car_model)?true:false}
label ={"car_model"}/>
</ Grid >
<Grid xs={12} md={6} key={"5"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.production_year}
type ={"text"}
onChange={(e)=>{setRental_Calculators({...rental_calculators,production_year:e.target.value});checkErrors()}}
defaultValue ={rental_calculators.production_year}
error ={(errorMessages.production_year)?true:false}
label ={"production_year"}/>
</ Grid >
<Grid xs={12} md={6} key={"6"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.model_class}
type ={"text"}
onChange={(e)=>{setRental_Calculators({...rental_calculators,model_class:e.target.value});checkErrors()}}
defaultValue ={rental_calculators.model_class}
error ={(errorMessages.model_class)?true:false}
label ={"model_class"}/>
</ Grid >
<Grid xs={12} md={6} key={"7"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.trim}
type ={"text"}
onChange={(e)=>{setRental_Calculators({...rental_calculators,trim:e.target.value});checkErrors()}}
defaultValue ={rental_calculators.trim}
error ={(errorMessages.trim)?true:false}
label ={"trim"}/>
</ Grid >
<Grid xs={12} md={6} key={"8"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.style}
type ={"text"}
onChange={(e)=>{setRental_Calculators({...rental_calculators,style:e.target.value});checkErrors()}}
defaultValue ={rental_calculators.style}
error ={(errorMessages.style)?true:false}
label ={"style"}/>
</ Grid >
<Grid xs={12} md={6} key={"9"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.car_transmission}
type ={"text"}
onChange={(e)=>{setRental_Calculators({...rental_calculators,car_transmission:e.target.value});checkErrors()}}
defaultValue ={rental_calculators.car_transmission}
error ={(errorMessages.car_transmission)?true:false}
label ={"car_transmission"}/>
</ Grid >
<Grid xs={12} md={6} key={"10"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.car_transmission_arabic}
type ={"text"}
onChange={(e)=>{setRental_Calculators({...rental_calculators,car_transmission_arabic:e.target.value});checkErrors()}}
defaultValue ={rental_calculators.car_transmission_arabic}
error ={(errorMessages.car_transmission_arabic)?true:false}
label ={"car_transmission_arabic"}/>
</ Grid >
<Grid xs={12} md={6} key={"11"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.car_value}
type ={"text"}
onChange={(e)=>{setRental_Calculators({...rental_calculators,car_value:e.target.value});checkErrors()}}
defaultValue ={rental_calculators.car_value}
error ={(errorMessages.car_value)?true:false}
label ={"car_value"}/>
</ Grid >
<Grid xs={12} md={6} key={"12"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.vehicle_type}
type ={"text"}
onChange={(e)=>{setRental_Calculators({...rental_calculators,vehicle_type:e.target.value});checkErrors()}}
defaultValue ={rental_calculators.vehicle_type}
error ={(errorMessages.vehicle_type)?true:false}
label ={"vehicle_type"}/>
</ Grid >
<Grid xs={12} md={6} key={"13"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.vehicle_type_arabic}
type ={"text"}
onChange={(e)=>{setRental_Calculators({...rental_calculators,vehicle_type_arabic:e.target.value});checkErrors()}}
defaultValue ={rental_calculators.vehicle_type_arabic}
error ={(errorMessages.vehicle_type_arabic)?true:false}
label ={"vehicle_type_arabic"}/>
</ Grid >
<Grid xs={12} md={6} key={"14"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.car_odometer}
type ={"text"}
onChange={(e)=>{setRental_Calculators({...rental_calculators,car_odometer:e.target.value});checkErrors()}}
defaultValue ={rental_calculators.car_odometer}
error ={(errorMessages.car_odometer)?true:false}
label ={"car_odometer"}/>
</ Grid >
<Grid xs={12} md={6} key={"15"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.real_odometer}
type ={"text"}
onChange={(e)=>{setRental_Calculators({...rental_calculators,real_odometer:e.target.value});checkErrors()}}
defaultValue ={rental_calculators.real_odometer}
error ={(errorMessages.real_odometer)?true:false}
label ={"real_odometer"}/>
</ Grid >
<Grid xs={12} md={6} key={"16"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.daily_price}
type ={"text"}
onChange={(e)=>{setRental_Calculators({...rental_calculators,daily_price:e.target.value});checkErrors()}}
defaultValue ={rental_calculators.daily_price}
error ={(errorMessages.daily_price)?true:false}
label ={"daily_price"}/>
</ Grid >
<Grid xs={12} md={6} key={"17"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.yearly_price}
type ={"text"}
onChange={(e)=>{setRental_Calculators({...rental_calculators,yearly_price:e.target.value});checkErrors()}}
defaultValue ={rental_calculators.yearly_price}
error ={(errorMessages.yearly_price)?true:false}
label ={"yearly_price"}/>
</ Grid >
<Grid xs={12} md={6} key={"18"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.created_at}
type ={"datetime-local"}
InputLabelProps ={{ shrink: true, }}
onChange={(e)=>{setRental_Calculators({...rental_calculators,created_at:e.target.value});checkErrors()}}
defaultValue ={rental_calculators.created_at}
error ={(errorMessages.created_at)?true:false}
label ={"created_at"}/>
</ Grid >
<Grid xs={12} md={6} key={"19"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.updated_at}
type ={"datetime-local"}
InputLabelProps ={{ shrink: true, }}
onChange={(e)=>{setRental_Calculators({...rental_calculators,updated_at:e.target.value});checkErrors()}}
defaultValue ={rental_calculators.updated_at}
error ={(errorMessages.updated_at)?true:false}
label ={"updated_at"}/>
</ Grid >
<Grid xs={12}  md={6} item key={"20"}>
<Grid container justify={"flex-end"} alignContent={"flex-end"}>
<Button onClick={() => history.push('/rental_calculators')} variant={"contained"} type={"Button"} color="secondary">Cancel</Button>
</Grid>
</Grid>
<Grid xs={12}  md={6} item key={"21"}>
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

export default withRouter(Rental_CalculatorsAddUpdatePage)
