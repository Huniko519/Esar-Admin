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
import {addCars, getCars,getOneCars, updateCars} from "../../repo/carsRepo";


import {getUsers} from "../../repo/usersRepo";



function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
function validateEmail(email){
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
const CarsAddUpdatePage = (props)=>{
    const [alertState, setAlertstate] = useState({
        open: false,
        vertical: 'bottom',
        horizontal: 'center',
        severity: "success",
        message:"",
      });
    const { vertical, horizontal, open, severity, message } = alertState;
    const [errorMessages, setErrorMessages] = useState({});
    const [cars,setCars] = useState(undefined);
    const [loading, setLoading] = useState(false);
    const [users,setUsers] = useState(undefined)


    const checkErrors = () => {
        let errorList = {}
        if(cars.user_id === "" || cars.user_id === undefined)
{
   errorList = { ...errorList,user_id: "Required field!"}
}
if(cars.long_location === "" || cars.long_location === undefined)
{
   errorList = { ...errorList,long_location: "Required field!"}
}
if(cars.lat_location === "" || cars.lat_location === undefined)
{
   errorList = { ...errorList,lat_location: "Required field!"}
}
if(cars.car_city === "" || cars.car_city === undefined)
{
   errorList = { ...errorList,car_city: "Required field!"}
}
if(cars.car_manufacturer === "" || cars.car_manufacturer === undefined)
{
   errorList = { ...errorList,car_manufacturer: "Required field!"}
}
if(cars.car_manufacturer_arabic === "" || cars.car_manufacturer_arabic === undefined)
{
   errorList = { ...errorList,car_manufacturer_arabic: "Required field!"}
}
if(cars.car_model === "" || cars.car_model === undefined)
{
   errorList = { ...errorList,car_model: "Required field!"}
}
if(cars.production_year === "" || cars.production_year === undefined)
{
   errorList = { ...errorList,production_year: "Required field!"}
}
if(cars.model_class === "" || cars.model_class === undefined)
{
   errorList = { ...errorList,model_class: "Required field!"}
}
if(cars.car_transmission === "" || cars.car_transmission === undefined)
{
   errorList = { ...errorList,car_transmission: "Required field!"}
}
if(cars.brended === "" || cars.brended === undefined)
{
   errorList = { ...errorList,brended: "Required field!"}
}
if(cars.car_value === "" || cars.car_value === undefined)
{
   errorList = { ...errorList,car_value: "Required field!"}
}
if(cars.vehicle_type === "" || cars.vehicle_type === undefined)
{
   errorList = { ...errorList,vehicle_type: "Required field!"}
}
if(cars.vehicle_type_arabic === "" || cars.vehicle_type_arabic === undefined)
{
   errorList = { ...errorList,vehicle_type_arabic: "Required field!"}
}
if(cars.weekend_trip === "" || cars.weekend_trip === undefined)
{
   errorList = { ...errorList,weekend_trip: "Required field!"}
}
if(cars.long_term_trip === "" || cars.long_term_trip === undefined)
{
   errorList = { ...errorList,long_term_trip: "Required field!"}
}
if(cars.is_registration_car_verified === "" || cars.is_registration_car_verified === undefined)
{
   errorList = { ...errorList,is_registration_car_verified: "Required field!"}
}
if(cars.is_insurance_verified === "" || cars.is_insurance_verified === undefined)
{
   errorList = { ...errorList,is_insurance_verified: "Required field!"}
}
if(cars.car_is_active === "" || cars.car_is_active === undefined)
{
   errorList = { ...errorList,car_is_active: "Required field!"}
}
if(cars.is_deleted === "" || cars.is_deleted === undefined)
{
   errorList = { ...errorList,is_deleted: "Required field!"}
}
if(cars.paid_advertising === "" || cars.paid_advertising === undefined)
{
   errorList = { ...errorList,paid_advertising: "Required field!"}
}


        setErrorMessages(errorList)
        return errorList
    }

    useEffect(()=>{
     setLoading(true);
    getUsers(0,200,"").then((res)=>{ setUsers(res.data); setLoading(false); })

      
        if(props.match.params.id) {
            setLoading(true);
            getOneCars(props.match.params.id).then((res) => {
                setCars(res.data.data);
                setLoading(false);
            })
        }else{
            setCars({})
        }
    },[props.match.params.id])
   

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
        const errors = checkErrors()
        //if no errors then send data
        if(Object.keys(errors).length<1) {
            if (cars.id) {
            setLoading(true);
               var updateResponse =  await updateCars(cars.id,cars);
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
                var addResponse = await addCars(cars);
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
        <PageTemplate title="Add/Update Cars">
            <Card>
            <CardContent>
                <form onSubmit={handleSubmit} noValidate autoComplete="off">
               
                    {(cars!==undefined  && users!==undefined)?
                        <Grid spacing={3} container>
                           <Grid xs={12} md={6} key={"1"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.long_location}
type ={"text"}
onChange={(e)=>{setCars({...cars,long_location:e.target.value});checkErrors()}}
defaultValue ={cars.long_location}
error ={(errorMessages.long_location)?true:false}
label ={"long_location"}/>
</ Grid >
<Grid xs={12} md={6} key={"2"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.lat_location}
type ={"text"}
onChange={(e)=>{setCars({...cars,lat_location:e.target.value});checkErrors()}}
defaultValue ={cars.lat_location}
error ={(errorMessages.lat_location)?true:false}
label ={"lat_location"}/>
</ Grid >
<Grid xs={12} md={6} key={"3"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.car_city}
type ={"text"}
onChange={(e)=>{setCars({...cars,car_city:e.target.value});checkErrors()}}
defaultValue ={cars.car_city}
error ={(errorMessages.car_city)?true:false}
label ={"car_city"}/>
</ Grid >
<Grid xs={12} md={6} key={"4"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.car_manufacturer}
type ={"text"}
onChange={(e)=>{setCars({...cars,car_manufacturer:e.target.value});checkErrors()}}
defaultValue ={cars.car_manufacturer}
error ={(errorMessages.car_manufacturer)?true:false}
label ={"car_manufacturer"}/>
</ Grid >
<Grid xs={12} md={6} key={"5"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.car_manufacturer_arabic}
type ={"text"}
onChange={(e)=>{setCars({...cars,car_manufacturer_arabic:e.target.value});checkErrors()}}
defaultValue ={cars.car_manufacturer_arabic}
error ={(errorMessages.car_manufacturer_arabic)?true:false}
label ={"car_manufacturer_arabic"}/>
</ Grid >
<Grid xs={12} md={6} key={"6"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.car_model}
type ={"text"}
onChange={(e)=>{setCars({...cars,car_model:e.target.value});checkErrors()}}
defaultValue ={cars.car_model}
error ={(errorMessages.car_model)?true:false}
label ={"car_model"}/>
</ Grid >
<Grid xs={12} md={6} key={"7"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.production_year}
type ={"text"}
onChange={(e)=>{setCars({...cars,production_year:e.target.value});checkErrors()}}
defaultValue ={cars.production_year}
error ={(errorMessages.production_year)?true:false}
label ={"production_year"}/>
</ Grid >
<Grid xs={12} md={6} key={"8"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.model_class}
type ={"text"}
onChange={(e)=>{setCars({...cars,model_class:e.target.value});checkErrors()}}
defaultValue ={cars.model_class}
error ={(errorMessages.model_class)?true:false}
label ={"model_class"}/>
</ Grid >
<Grid xs={12} md={6} key={"9"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.trim}
type ={"text"}
onChange={(e)=>{setCars({...cars,trim:e.target.value});checkErrors()}}
defaultValue ={cars.trim}
error ={(errorMessages.trim)?true:false}
label ={"trim"}/>
</ Grid >
<Grid xs={12} md={6} key={"10"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.style}
type ={"text"}
onChange={(e)=>{setCars({...cars,style:e.target.value});checkErrors()}}
defaultValue ={cars.style}
error ={(errorMessages.style)?true:false}
label ={"style"}/>
</ Grid >
<Grid xs={12} md={6} key={"11"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.car_transmission}
type ={"text"}
onChange={(e)=>{setCars({...cars,car_transmission:e.target.value});checkErrors()}}
defaultValue ={cars.car_transmission}
error ={(errorMessages.car_transmission)?true:false}
label ={"car_transmission"}/>
</ Grid >
<Grid xs={12} md={6} key={"12"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.brended}
type ={"number"}
onChange={(e)=>{setCars({...cars,brended:e.target.value});checkErrors()}}
defaultValue ={cars.brended}
error ={(errorMessages.brended)?true:false}
label ={"brended"}/>
</ Grid >
<Grid xs={12} md={6} key={"13"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.car_value}
type ={"text"}
onChange={(e)=>{setCars({...cars,car_value:e.target.value});checkErrors()}}
defaultValue ={cars.car_value}
error ={(errorMessages.car_value)?true:false}
label ={"car_value"}/>
</ Grid >
<Grid xs={12} md={6} key={"14"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.vehicle_type}
type ={"text"}
onChange={(e)=>{setCars({...cars,vehicle_type:e.target.value});checkErrors()}}
defaultValue ={cars.vehicle_type}
error ={(errorMessages.vehicle_type)?true:false}
label ={"vehicle_type"}/>
</ Grid >
<Grid xs={12} md={6} key={"15"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.vehicle_type_arabic}
type ={"text"}
onChange={(e)=>{setCars({...cars,vehicle_type_arabic:e.target.value});checkErrors()}}
defaultValue ={cars.vehicle_type_arabic}
error ={(errorMessages.vehicle_type_arabic)?true:false}
label ={"vehicle_type_arabic"}/>
</ Grid >
<Grid xs={12} md={6} key={"16"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.car_odometer}
type ={"text"}
onChange={(e)=>{setCars({...cars,car_odometer:e.target.value});checkErrors()}}
defaultValue ={cars.car_odometer}
error ={(errorMessages.car_odometer)?true:false}
label ={"car_odometer"}/>
</ Grid >
<Grid xs={12} md={6} key={"17"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.real_odometer}
type ={"text"}
onChange={(e)=>{setCars({...cars,real_odometer:e.target.value});checkErrors()}}
defaultValue ={cars.real_odometer}
error ={(errorMessages.real_odometer)?true:false}
label ={"real_odometer"}/>
</ Grid >
<Grid xs={12} md={6} key={"18"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.deposit}
type ={"number"}
onChange={(e)=>{setCars({...cars,deposit:e.target.value});checkErrors()}}
defaultValue ={cars.deposit}
error ={(errorMessages.deposit)?true:false}
label ={"deposit"}/>
</ Grid >
<Grid xs={12} md={6} key={"19"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.count_stars}
type ={"number"}
onChange={(e)=>{setCars({...cars,count_stars:e.target.value});checkErrors()}}
defaultValue ={cars.count_stars}
error ={(errorMessages.count_stars)?true:false}
label ={"count_stars"}/>
</ Grid >
<Grid xs={12} md={6} key={"20"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.count_reviews}
type ={"number"}
onChange={(e)=>{setCars({...cars,count_reviews:e.target.value});checkErrors()}}
defaultValue ={cars.count_reviews}
error ={(errorMessages.count_reviews)?true:false}
label ={"count_reviews"}/>
</ Grid >
<Grid xs={12} md={6} key={"21"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.count_rates}
type ={"number"}
onChange={(e)=>{setCars({...cars,count_rates:e.target.value});checkErrors()}}
defaultValue ={cars.count_rates}
error ={(errorMessages.count_rates)?true:false}
label ={"count_rates"}/>
</ Grid >
<Grid xs={12} md={6} key={"22"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.count_trips}
type ={"number"}
onChange={(e)=>{setCars({...cars,count_trips:e.target.value});checkErrors()}}
defaultValue ={cars.count_trips}
error ={(errorMessages.count_trips)?true:false}
label ={"count_trips"}/>
</ Grid >
<Grid xs={12} md={6} key={"23"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.key_hand_off}
type ={"text"}
onChange={(e)=>{setCars({...cars,key_hand_off:e.target.value});checkErrors()}}
defaultValue ={cars.key_hand_off}
error ={(errorMessages.key_hand_off)?true:false}
label ={"key_hand_off"}/>
</ Grid >
<Grid xs={12} md={6} key={"24"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.parking_details}
type ={"text"}
onChange={(e)=>{setCars({...cars,parking_details:e.target.value});checkErrors()}}
defaultValue ={cars.parking_details}
error ={(errorMessages.parking_details)?true:false}
label ={"parking_details"}/>
</ Grid >
<Grid xs={12} md={6} key={"25"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.notice}
type ={"text"}
onChange={(e)=>{setCars({...cars,notice:e.target.value});checkErrors()}}
defaultValue ={cars.notice}
error ={(errorMessages.notice)?true:false}
label ={"notice"}/>
</ Grid >
<Grid xs={12} md={6} key={"26"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.car_location_notice}
type ={"text"}
onChange={(e)=>{setCars({...cars,car_location_notice:e.target.value});checkErrors()}}
defaultValue ={cars.car_location_notice}
error ={(errorMessages.car_location_notice)?true:false}
label ={"car_location_notice"}/>
</ Grid >
<Grid xs={12} md={6} key={"27"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.airport_notice}
type ={"text"}
onChange={(e)=>{setCars({...cars,airport_notice:e.target.value});checkErrors()}}
defaultValue ={cars.airport_notice}
error ={(errorMessages.airport_notice)?true:false}
label ={"airport_notice"}/>
</ Grid >
<Grid xs={12} md={6} key={"28"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.guest_location_notice}
type ={"text"}
onChange={(e)=>{setCars({...cars,guest_location_notice:e.target.value});checkErrors()}}
defaultValue ={cars.guest_location_notice}
error ={(errorMessages.guest_location_notice)?true:false}
label ={"guest_location_notice"}/>
</ Grid >
<Grid xs={12} md={6} key={"29"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.short_trip}
type ={"text"}
onChange={(e)=>{setCars({...cars,short_trip:e.target.value});checkErrors()}}
defaultValue ={cars.short_trip}
error ={(errorMessages.short_trip)?true:false}
label ={"short_trip"}/>
</ Grid >
<Grid xs={12} md={6} key={"30"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.long_trip}
type ={"text"}
onChange={(e)=>{setCars({...cars,long_trip:e.target.value});checkErrors()}}
defaultValue ={cars.long_trip}
error ={(errorMessages.long_trip)?true:false}
label ={"long_trip"}/>
</ Grid >
<Grid xs={12} md={6} key={"31"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.weekend_trip}
type ={"number"}
onChange={(e)=>{setCars({...cars,weekend_trip:e.target.value});checkErrors()}}
defaultValue ={cars.weekend_trip}
error ={(errorMessages.weekend_trip)?true:false}
label ={"weekend_trip"}/>
</ Grid >
<Grid xs={12} md={6} key={"32"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.long_term_trip}
type ={"number"}
onChange={(e)=>{setCars({...cars,long_term_trip:e.target.value});checkErrors()}}
defaultValue ={cars.long_term_trip}
error ={(errorMessages.long_term_trip)?true:false}
label ={"long_term_trip"}/>
</ Grid >
<Grid xs={12} md={6} key={"33"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.is_registration_car_verified}
type ={"number"}
onChange={(e)=>{setCars({...cars,is_registration_car_verified:e.target.value});checkErrors()}}
defaultValue ={cars.is_registration_car_verified}
error ={(errorMessages.is_registration_car_verified)?true:false}
label ={"is_registration_car_verified"}/>
</ Grid >
<Grid xs={12} md={6} key={"34"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.is_insurance_verified}
type ={"number"}
onChange={(e)=>{setCars({...cars,is_insurance_verified:e.target.value});checkErrors()}}
defaultValue ={cars.is_insurance_verified}
error ={(errorMessages.is_insurance_verified)?true:false}
label ={"is_insurance_verified"}/>
</ Grid >
<Grid xs={12} md={6} key={"35"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.car_is_active}
type ={"number"}
onChange={(e)=>{setCars({...cars,car_is_active:e.target.value});checkErrors()}}
defaultValue ={cars.car_is_active}
error ={(errorMessages.car_is_active)?true:false}
label ={"car_is_active"}/>
</ Grid >
<Grid xs={12} md={6} key={"36"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.is_deleted}
type ={"number"}
onChange={(e)=>{setCars({...cars,is_deleted:e.target.value});checkErrors()}}
defaultValue ={cars.is_deleted}
error ={(errorMessages.is_deleted)?true:false}
label ={"is_deleted"}/>
</ Grid >
<Grid xs={12} md={6} key={"37"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.paid_advertising}
type ={"number"}
onChange={(e)=>{setCars({...cars,paid_advertising:e.target.value});checkErrors()}}
defaultValue ={cars.paid_advertising}
error ={(errorMessages.paid_advertising)?true:false}
label ={"paid_advertising"}/>
</ Grid >
<Grid xs={12} md={6} key={"38"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.phase}
type ={"text"}
onChange={(e)=>{setCars({...cars,phase:e.target.value});checkErrors()}}
defaultValue ={cars.phase}
error ={(errorMessages.phase)?true:false}
label ={"phase"}/>
</ Grid >
<Grid xs={12} md={6} key={"39"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.created_at}
type ={"datetime-local"}
InputLabelProps ={{ shrink: true, }}
onChange={(e)=>{setCars({...cars,created_at:e.target.value});checkErrors()}}
defaultValue ={cars.created_at}
error ={(errorMessages.created_at)?true:false}
label ={"created_at"}/>
</ Grid >
<Grid xs={12} md={6} key={"40"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.updated_at}
type ={"datetime-local"}
InputLabelProps ={{ shrink: true, }}
onChange={(e)=>{setCars({...cars,updated_at:e.target.value});checkErrors()}}
defaultValue ={cars.updated_at}
error ={(errorMessages.updated_at)?true:false}
label ={"updated_at"}/>
</ Grid >
<Grid xs={12} md={6} key={"41"} item >
<InputLabel style={{textAlign: 'left'}}>user_id</InputLabel>
        <Select style={{width: '100%',textAlign: 'left'}}
                              labelId ="user_id"
                              id="user_id"
                              value={cars.user_id}
                              onChange ={(e)=>{setCars({...cars,user_id:e.target.value});checkErrors()}}>
                              {users.map((key)=><MenuItem key={key.id} value={key.id}>{key.password}</MenuItem>)}
                          </Select>
    </Grid>
<Grid xs={12}  md={6} item key={"42"}>
<Grid container justify={"flex-end"} alignContent={"flex-end"}>
<Button onClick={() => history.push('/cars')} variant={"contained"} type={"Button"} color="secondary">Cancel</Button>
</Grid>
</Grid>
<Grid xs={12}  md={6} item key={"43"}>
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

export default withRouter(CarsAddUpdatePage)
