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
import {addTrip_Cars, getTrip_Cars,getOneTrip_Cars, updateTrip_Cars} from "../../repo/trip_carsRepo";





function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
function validateEmail(email){
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
const Trip_CarsAddUpdatePage = (props)=>{
    const [alertState, setAlertstate] = useState({
        open: false,
        vertical: 'bottom',
        horizontal: 'center',
        severity: "success",
        message:"",
      });
    const { vertical, horizontal, open, severity, message } = alertState;
    const [errorMessages, setErrorMessages] = useState({});
    const [trip_cars,setTrip_Cars] = useState(undefined);
    const [loading, setLoading] = useState(false);
    

    const checkErrors = () => {
        let errorList = {}
        if(trip_cars.trip_id === "" || trip_cars.trip_id === undefined)
{
   errorList = { ...errorList,trip_id: "Required field!"}
}
if(trip_cars.car_id === "" || trip_cars.car_id === undefined)
{
   errorList = { ...errorList,car_id: "Required field!"}
}
if(trip_cars.car_manufacturer === "" || trip_cars.car_manufacturer === undefined)
{
   errorList = { ...errorList,car_manufacturer: "Required field!"}
}
if(trip_cars.car_manufacturer_arabic === "" || trip_cars.car_manufacturer_arabic === undefined)
{
   errorList = { ...errorList,car_manufacturer_arabic: "Required field!"}
}
if(trip_cars.car_model === "" || trip_cars.car_model === undefined)
{
   errorList = { ...errorList,car_model: "Required field!"}
}


        setErrorMessages(errorList)
        return errorList
    }

    useEffect(()=>{
     setLoading(true);
    
      
        if(props.match.params.id) {
            setLoading(true);
            getOneTrip_Cars(props.match.params.id).then((res) => {
                setTrip_Cars(res.data.data);
                setLoading(false);
            })
        }else{
            setTrip_Cars({})
        }
    },[props.match.params.id])
   

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
        const errors = checkErrors()
        //if no errors then send data
        if(Object.keys(errors).length<1) {
            if (trip_cars.id) {
            setLoading(true);
               var updateResponse =  await updateTrip_Cars(trip_cars.id,trip_cars);
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
                var addResponse = await addTrip_Cars(trip_cars);
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
        <PageTemplate title="Add/Update Trip_Cars">
            <Card>
            <CardContent>
                <form onSubmit={handleSubmit} noValidate autoComplete="off">
               
                    {(trip_cars!==undefined )?
                        <Grid spacing={3} container>
                           <Grid xs={12} md={6} key={"0"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.trip_id}
type ={"text"}
onChange={(e)=>{setTrip_Cars({...trip_cars,trip_id:e.target.value});checkErrors()}}
defaultValue ={trip_cars.trip_id}
error ={(errorMessages.trip_id)?true:false}
label ={"trip_id"}/>
</ Grid >
<Grid xs={12} md={6} key={"1"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.car_id}
type ={"number"}
onChange={(e)=>{setTrip_Cars({...trip_cars,car_id:e.target.value});checkErrors()}}
defaultValue ={trip_cars.car_id}
error ={(errorMessages.car_id)?true:false}
label ={"car_id"}/>
</ Grid >
<Grid xs={12} md={6} key={"2"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.car_manufacturer}
type ={"text"}
onChange={(e)=>{setTrip_Cars({...trip_cars,car_manufacturer:e.target.value});checkErrors()}}
defaultValue ={trip_cars.car_manufacturer}
error ={(errorMessages.car_manufacturer)?true:false}
label ={"car_manufacturer"}/>
</ Grid >
<Grid xs={12} md={6} key={"3"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.car_manufacturer_arabic}
type ={"text"}
onChange={(e)=>{setTrip_Cars({...trip_cars,car_manufacturer_arabic:e.target.value});checkErrors()}}
defaultValue ={trip_cars.car_manufacturer_arabic}
error ={(errorMessages.car_manufacturer_arabic)?true:false}
label ={"car_manufacturer_arabic"}/>
</ Grid >
<Grid xs={12} md={6} key={"4"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.car_model}
type ={"text"}
onChange={(e)=>{setTrip_Cars({...trip_cars,car_model:e.target.value});checkErrors()}}
defaultValue ={trip_cars.car_model}
error ={(errorMessages.car_model)?true:false}
label ={"car_model"}/>
</ Grid >
<Grid xs={12} md={6} key={"5"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.color}
type ={"text"}
onChange={(e)=>{setTrip_Cars({...trip_cars,color:e.target.value});checkErrors()}}
defaultValue ={trip_cars.color}
error ={(errorMessages.color)?true:false}
label ={"color"}/>
</ Grid >
<Grid xs={12} md={6} key={"6"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.model_seats}
type ={"text"}
onChange={(e)=>{setTrip_Cars({...trip_cars,model_seats:e.target.value});checkErrors()}}
defaultValue ={trip_cars.model_seats}
error ={(errorMessages.model_seats)?true:false}
label ={"model_seats"}/>
</ Grid >
<Grid xs={12} md={6} key={"7"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.model_doors}
type ={"text"}
onChange={(e)=>{setTrip_Cars({...trip_cars,model_doors:e.target.value});checkErrors()}}
defaultValue ={trip_cars.model_doors}
error ={(errorMessages.model_doors)?true:false}
label ={"model_doors"}/>
</ Grid >
<Grid xs={12} md={6} key={"8"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.model_engine_fuel}
type ={"text"}
onChange={(e)=>{setTrip_Cars({...trip_cars,model_engine_fuel:e.target.value});checkErrors()}}
defaultValue ={trip_cars.model_engine_fuel}
error ={(errorMessages.model_engine_fuel)?true:false}
label ={"model_engine_fuel"}/>
</ Grid >
<Grid xs={12} md={6} key={"9"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.gas_grade}
type ={"text"}
onChange={(e)=>{setTrip_Cars({...trip_cars,gas_grade:e.target.value});checkErrors()}}
defaultValue ={trip_cars.gas_grade}
error ={(errorMessages.gas_grade)?true:false}
label ={"gas_grade"}/>
</ Grid >
<Grid xs={12} md={6} key={"10"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.model_lkm_city}
type ={"text"}
onChange={(e)=>{setTrip_Cars({...trip_cars,model_lkm_city:e.target.value});checkErrors()}}
defaultValue ={trip_cars.model_lkm_city}
error ={(errorMessages.model_lkm_city)?true:false}
label ={"model_lkm_city"}/>
</ Grid >
<Grid xs={12} md={6} key={"11"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.model_lkm_hwy}
type ={"text"}
onChange={(e)=>{setTrip_Cars({...trip_cars,model_lkm_hwy:e.target.value});checkErrors()}}
defaultValue ={trip_cars.model_lkm_hwy}
error ={(errorMessages.model_lkm_hwy)?true:false}
label ={"model_lkm_hwy"}/>
</ Grid >
<Grid xs={12} md={6} key={"12"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.hybrid}
type ={"number"}
onChange={(e)=>{setTrip_Cars({...trip_cars,hybrid:e.target.value});checkErrors()}}
defaultValue ={trip_cars.hybrid}
error ={(errorMessages.hybrid)?true:false}
label ={"hybrid"}/>
</ Grid >
<Grid xs={12} md={6} key={"13"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.bike_rack}
type ={"number"}
onChange={(e)=>{setTrip_Cars({...trip_cars,bike_rack:e.target.value});checkErrors()}}
defaultValue ={trip_cars.bike_rack}
error ={(errorMessages.bike_rack)?true:false}
label ={"bike_rack"}/>
</ Grid >
<Grid xs={12} md={6} key={"14"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.all_drive}
type ={"number"}
onChange={(e)=>{setTrip_Cars({...trip_cars,all_drive:e.target.value});checkErrors()}}
defaultValue ={trip_cars.all_drive}
error ={(errorMessages.all_drive)?true:false}
label ={"all_drive"}/>
</ Grid >
<Grid xs={12} md={6} key={"15"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.child_seat}
type ={"number"}
onChange={(e)=>{setTrip_Cars({...trip_cars,child_seat:e.target.value});checkErrors()}}
defaultValue ={trip_cars.child_seat}
error ={(errorMessages.child_seat)?true:false}
label ={"child_seat"}/>
</ Grid >
<Grid xs={12} md={6} key={"16"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.gps}
type ={"number"}
onChange={(e)=>{setTrip_Cars({...trip_cars,gps:e.target.value});checkErrors()}}
defaultValue ={trip_cars.gps}
error ={(errorMessages.gps)?true:false}
label ={"gps"}/>
</ Grid >
<Grid xs={12} md={6} key={"17"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.ski_rack}
type ={"number"}
onChange={(e)=>{setTrip_Cars({...trip_cars,ski_rack:e.target.value});checkErrors()}}
defaultValue ={trip_cars.ski_rack}
error ={(errorMessages.ski_rack)?true:false}
label ={"ski_rack"}/>
</ Grid >
<Grid xs={12} md={6} key={"18"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.bluetooth}
type ={"number"}
onChange={(e)=>{setTrip_Cars({...trip_cars,bluetooth:e.target.value});checkErrors()}}
defaultValue ={trip_cars.bluetooth}
error ={(errorMessages.bluetooth)?true:false}
label ={"bluetooth"}/>
</ Grid >
<Grid xs={12} md={6} key={"19"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.usb}
type ={"number"}
onChange={(e)=>{setTrip_Cars({...trip_cars,usb:e.target.value});checkErrors()}}
defaultValue ={trip_cars.usb}
error ={(errorMessages.usb)?true:false}
label ={"usb"}/>
</ Grid >
<Grid xs={12} md={6} key={"20"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.ventilated_seat}
type ={"number"}
onChange={(e)=>{setTrip_Cars({...trip_cars,ventilated_seat:e.target.value});checkErrors()}}
defaultValue ={trip_cars.ventilated_seat}
error ={(errorMessages.ventilated_seat)?true:false}
label ={"ventilated_seat"}/>
</ Grid >
<Grid xs={12} md={6} key={"21"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.audio_input}
type ={"number"}
onChange={(e)=>{setTrip_Cars({...trip_cars,audio_input:e.target.value});checkErrors()}}
defaultValue ={trip_cars.audio_input}
error ={(errorMessages.audio_input)?true:false}
label ={"audio_input"}/>
</ Grid >
<Grid xs={12} md={6} key={"22"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.convertible}
type ={"number"}
onChange={(e)=>{setTrip_Cars({...trip_cars,convertible:e.target.value});checkErrors()}}
defaultValue ={trip_cars.convertible}
error ={(errorMessages.convertible)?true:false}
label ={"convertible"}/>
</ Grid >
<Grid xs={12} md={6} key={"23"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.toll_pass}
type ={"number"}
onChange={(e)=>{setTrip_Cars({...trip_cars,toll_pass:e.target.value});checkErrors()}}
defaultValue ={trip_cars.toll_pass}
error ={(errorMessages.toll_pass)?true:false}
label ={"toll_pass"}/>
</ Grid >
<Grid xs={12} md={6} key={"24"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.sunroof}
type ={"number"}
onChange={(e)=>{setTrip_Cars({...trip_cars,sunroof:e.target.value});checkErrors()}}
defaultValue ={trip_cars.sunroof}
error ={(errorMessages.sunroof)?true:false}
label ={"sunroof"}/>
</ Grid >
<Grid xs={12} md={6} key={"25"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.car_title}
type ={"text"}
onChange={(e)=>{setTrip_Cars({...trip_cars,car_title:e.target.value});checkErrors()}}
defaultValue ={trip_cars.car_title}
error ={(errorMessages.car_title)?true:false}
label ={"car_title"}/>
</ Grid >
<Grid xs={12} md={6} key={"26"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.car_description}
type ={"text"}
onChange={(e)=>{setTrip_Cars({...trip_cars,car_description:e.target.value});checkErrors()}}
defaultValue ={trip_cars.car_description}
error ={(errorMessages.car_description)?true:false}
label ={"car_description"}/>
</ Grid >
<Grid xs={12} md={6} key={"27"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.car_guidelines}
type ={"text"}
onChange={(e)=>{setTrip_Cars({...trip_cars,car_guidelines:e.target.value});checkErrors()}}
defaultValue ={trip_cars.car_guidelines}
error ={(errorMessages.car_guidelines)?true:false}
label ={"car_guidelines"}/>
</ Grid >
<Grid xs={12} md={6} key={"28"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.original_image_path}
type ={"text"}
onChange={(e)=>{setTrip_Cars({...trip_cars,original_image_path:e.target.value});checkErrors()}}
defaultValue ={trip_cars.original_image_path}
error ={(errorMessages.original_image_path)?true:false}
label ={"original_image_path"}/>
</ Grid >
<Grid xs={12} md={6} key={"29"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.small_image_path}
type ={"text"}
onChange={(e)=>{setTrip_Cars({...trip_cars,small_image_path:e.target.value});checkErrors()}}
defaultValue ={trip_cars.small_image_path}
error ={(errorMessages.small_image_path)?true:false}
label ={"small_image_path"}/>
</ Grid >
<Grid xs={12} md={6} key={"30"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.created_at}
type ={"datetime-local"}
InputLabelProps ={{ shrink: true, }}
onChange={(e)=>{setTrip_Cars({...trip_cars,created_at:e.target.value});checkErrors()}}
defaultValue ={trip_cars.created_at}
error ={(errorMessages.created_at)?true:false}
label ={"created_at"}/>
</ Grid >
<Grid xs={12} md={6} key={"31"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.updated_at}
type ={"datetime-local"}
InputLabelProps ={{ shrink: true, }}
onChange={(e)=>{setTrip_Cars({...trip_cars,updated_at:e.target.value});checkErrors()}}
defaultValue ={trip_cars.updated_at}
error ={(errorMessages.updated_at)?true:false}
label ={"updated_at"}/>
</ Grid >
<Grid xs={12}  md={6} item key={"32"}>
<Grid container justify={"flex-end"} alignContent={"flex-end"}>
<Button onClick={() => history.push('/trip_cars')} variant={"contained"} type={"Button"} color="secondary">Cancel</Button>
</Grid>
</Grid>
<Grid xs={12}  md={6} item key={"33"}>
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

export default withRouter(Trip_CarsAddUpdatePage)
