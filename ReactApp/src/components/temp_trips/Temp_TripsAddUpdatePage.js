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
import {addTemp_Trips, getTemp_Trips,getOneTemp_Trips, updateTemp_Trips} from "../../repo/temp_tripsRepo";





function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
function validateEmail(email){
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
const Temp_TripsAddUpdatePage = (props)=>{
    const [alertState, setAlertstate] = useState({
        open: false,
        vertical: 'bottom',
        horizontal: 'center',
        severity: "success",
        message:"",
      });
    const { vertical, horizontal, open, severity, message } = alertState;
    const [errorMessages, setErrorMessages] = useState({});
    const [temp_trips,setTemp_Trips] = useState(undefined);
    const [loading, setLoading] = useState(false);
    

    const checkErrors = () => {
        let errorList = {}
        if(temp_trips.owner_id === "" || temp_trips.owner_id === undefined)
{
   errorList = { ...errorList,owner_id: "Required field!"}
}
if(temp_trips.car_id === "" || temp_trips.car_id === undefined)
{
   errorList = { ...errorList,car_id: "Required field!"}
}
if(temp_trips.renter_id === "" || temp_trips.renter_id === undefined)
{
   errorList = { ...errorList,renter_id: "Required field!"}
}
if(temp_trips.delivery_on_airport === "" || temp_trips.delivery_on_airport === undefined)
{
   errorList = { ...errorList,delivery_on_airport: "Required field!"}
}
if(temp_trips.delivery_on_car_location === "" || temp_trips.delivery_on_car_location === undefined)
{
   errorList = { ...errorList,delivery_on_car_location: "Required field!"}
}
if(temp_trips.delivery_on_renter_location === "" || temp_trips.delivery_on_renter_location === undefined)
{
   errorList = { ...errorList,delivery_on_renter_location: "Required field!"}
}
if(temp_trips.renter_confirm_trip === "" || temp_trips.renter_confirm_trip === undefined)
{
   errorList = { ...errorList,renter_confirm_trip: "Required field!"}
}
if(temp_trips.owner_confirm_trip === "" || temp_trips.owner_confirm_trip === undefined)
{
   errorList = { ...errorList,owner_confirm_trip: "Required field!"}
}
if(temp_trips.status === "" || temp_trips.status === undefined)
{
   errorList = { ...errorList,status: "Required field!"}
}
if(temp_trips.trip_modified === "" || temp_trips.trip_modified === undefined)
{
   errorList = { ...errorList,trip_modified: "Required field!"}
}
if(temp_trips.is_trip_modified === "" || temp_trips.is_trip_modified === undefined)
{
   errorList = { ...errorList,is_trip_modified: "Required field!"}
}
if(temp_trips.i_agree === "" || temp_trips.i_agree === undefined)
{
   errorList = { ...errorList,i_agree: "Required field!"}
}


        setErrorMessages(errorList)
        return errorList
    }

    useEffect(()=>{
     setLoading(true);
    
      
        if(props.match.params.id) {
            setLoading(true);
            getOneTemp_Trips(props.match.params.id).then((res) => {
                setTemp_Trips(res.data.data);
                setLoading(false);
            })
        }else{
            setTemp_Trips({})
        }
    },[props.match.params.id])
   

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
        const errors = checkErrors()
        //if no errors then send data
        if(Object.keys(errors).length<1) {
            if (temp_trips.id) {
            setLoading(true);
               var updateResponse =  await updateTemp_Trips(temp_trips.id,temp_trips);
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
                var addResponse = await addTemp_Trips(temp_trips);
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
        <PageTemplate title="Add/Update Temp_Trips">
            <Card>
            <CardContent>
                <form onSubmit={handleSubmit} noValidate autoComplete="off">
               
                    {(temp_trips!==undefined )?
                        <Grid spacing={3} container>
                           <Grid xs={12} md={6} key={"0"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.chat_id}
type ={"text"}
onChange={(e)=>{setTemp_Trips({...temp_trips,chat_id:e.target.value});checkErrors()}}
defaultValue ={temp_trips.chat_id}
error ={(errorMessages.chat_id)?true:false}
label ={"chat_id"}/>
</ Grid >
<Grid xs={12} md={6} key={"1"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.owner_id}
type ={"text"}
onChange={(e)=>{setTemp_Trips({...temp_trips,owner_id:e.target.value});checkErrors()}}
defaultValue ={temp_trips.owner_id}
error ={(errorMessages.owner_id)?true:false}
label ={"owner_id"}/>
</ Grid >
<Grid xs={12} md={6} key={"2"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.car_id}
type ={"text"}
onChange={(e)=>{setTemp_Trips({...temp_trips,car_id:e.target.value});checkErrors()}}
defaultValue ={temp_trips.car_id}
error ={(errorMessages.car_id)?true:false}
label ={"car_id"}/>
</ Grid >
<Grid xs={12} md={6} key={"3"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.renter_id}
type ={"text"}
onChange={(e)=>{setTemp_Trips({...temp_trips,renter_id:e.target.value});checkErrors()}}
defaultValue ={temp_trips.renter_id}
error ={(errorMessages.renter_id)?true:false}
label ={"renter_id"}/>
</ Grid >
<Grid xs={12} md={6} key={"4"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.delivery_on_airport}
type ={"number"}
onChange={(e)=>{setTemp_Trips({...temp_trips,delivery_on_airport:e.target.value});checkErrors()}}
defaultValue ={temp_trips.delivery_on_airport}
error ={(errorMessages.delivery_on_airport)?true:false}
label ={"delivery_on_airport"}/>
</ Grid >
<Grid xs={12} md={6} key={"5"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.airport_id}
type ={"text"}
onChange={(e)=>{setTemp_Trips({...temp_trips,airport_id:e.target.value});checkErrors()}}
defaultValue ={temp_trips.airport_id}
error ={(errorMessages.airport_id)?true:false}
label ={"airport_id"}/>
</ Grid >
<Grid xs={12} md={6} key={"6"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.delivery_on_car_location}
type ={"number"}
onChange={(e)=>{setTemp_Trips({...temp_trips,delivery_on_car_location:e.target.value});checkErrors()}}
defaultValue ={temp_trips.delivery_on_car_location}
error ={(errorMessages.delivery_on_car_location)?true:false}
label ={"delivery_on_car_location"}/>
</ Grid >
<Grid xs={12} md={6} key={"7"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.delivery_on_renter_location}
type ={"number"}
onChange={(e)=>{setTemp_Trips({...temp_trips,delivery_on_renter_location:e.target.value});checkErrors()}}
defaultValue ={temp_trips.delivery_on_renter_location}
error ={(errorMessages.delivery_on_renter_location)?true:false}
label ={"delivery_on_renter_location"}/>
</ Grid >
<Grid xs={12} md={6} key={"8"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.long_location}
type ={"text"}
onChange={(e)=>{setTemp_Trips({...temp_trips,long_location:e.target.value});checkErrors()}}
defaultValue ={temp_trips.long_location}
error ={(errorMessages.long_location)?true:false}
label ={"long_location"}/>
</ Grid >
<Grid xs={12} md={6} key={"9"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.lat_location}
type ={"text"}
onChange={(e)=>{setTemp_Trips({...temp_trips,lat_location:e.target.value});checkErrors()}}
defaultValue ={temp_trips.lat_location}
error ={(errorMessages.lat_location)?true:false}
label ={"lat_location"}/>
</ Grid >
<Grid xs={12} md={6} key={"10"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.pickup_location}
type ={"text"}
onChange={(e)=>{setTemp_Trips({...temp_trips,pickup_location:e.target.value});checkErrors()}}
defaultValue ={temp_trips.pickup_location}
error ={(errorMessages.pickup_location)?true:false}
label ={"pickup_location"}/>
</ Grid >
<Grid xs={12} md={6} key={"11"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.notice_time}
type ={"text"}
onChange={(e)=>{setTemp_Trips({...temp_trips,notice_time:e.target.value});checkErrors()}}
defaultValue ={temp_trips.notice_time}
error ={(errorMessages.notice_time)?true:false}
label ={"notice_time"}/>
</ Grid >
<Grid xs={12} md={6} key={"12"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.booked_instantly}
type ={"number"}
onChange={(e)=>{setTemp_Trips({...temp_trips,booked_instantly:e.target.value});checkErrors()}}
defaultValue ={temp_trips.booked_instantly}
error ={(errorMessages.booked_instantly)?true:false}
label ={"booked_instantly"}/>
</ Grid >
<Grid xs={12} md={6} key={"13"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.renter_confirm_trip}
type ={"text"}
onChange={(e)=>{setTemp_Trips({...temp_trips,renter_confirm_trip:e.target.value});checkErrors()}}
defaultValue ={temp_trips.renter_confirm_trip}
error ={(errorMessages.renter_confirm_trip)?true:false}
label ={"renter_confirm_trip"}/>
</ Grid >
<Grid xs={12} md={6} key={"14"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.owner_confirm_trip}
type ={"text"}
onChange={(e)=>{setTemp_Trips({...temp_trips,owner_confirm_trip:e.target.value});checkErrors()}}
defaultValue ={temp_trips.owner_confirm_trip}
error ={(errorMessages.owner_confirm_trip)?true:false}
label ={"owner_confirm_trip"}/>
</ Grid >
<Grid xs={12} md={6} key={"15"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.status}
type ={"text"}
onChange={(e)=>{setTemp_Trips({...temp_trips,status:e.target.value});checkErrors()}}
defaultValue ={temp_trips.status}
error ={(errorMessages.status)?true:false}
label ={"status"}/>
</ Grid >
<Grid xs={12} md={6} key={"16"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.telr_cancel}
type ={"number"}
onChange={(e)=>{setTemp_Trips({...temp_trips,telr_cancel:e.target.value});checkErrors()}}
defaultValue ={temp_trips.telr_cancel}
error ={(errorMessages.telr_cancel)?true:false}
label ={"telr_cancel"}/>
</ Grid >
<Grid xs={12} md={6} key={"17"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.renter_confirm_trip_update}
type ={"number"}
onChange={(e)=>{setTemp_Trips({...temp_trips,renter_confirm_trip_update:e.target.value});checkErrors()}}
defaultValue ={temp_trips.renter_confirm_trip_update}
error ={(errorMessages.renter_confirm_trip_update)?true:false}
label ={"renter_confirm_trip_update"}/>
</ Grid >
<Grid xs={12} md={6} key={"18"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.owner_confirm_trip_update}
type ={"number"}
onChange={(e)=>{setTemp_Trips({...temp_trips,owner_confirm_trip_update:e.target.value});checkErrors()}}
defaultValue ={temp_trips.owner_confirm_trip_update}
error ={(errorMessages.owner_confirm_trip_update)?true:false}
label ={"owner_confirm_trip_update"}/>
</ Grid >
<Grid xs={12} md={6} key={"19"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.telr_cancel_modification}
type ={"number"}
onChange={(e)=>{setTemp_Trips({...temp_trips,telr_cancel_modification:e.target.value});checkErrors()}}
defaultValue ={temp_trips.telr_cancel_modification}
error ={(errorMessages.telr_cancel_modification)?true:false}
label ={"telr_cancel_modification"}/>
</ Grid >
<Grid xs={12} md={6} key={"20"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.trip_modified}
type ={"number"}
onChange={(e)=>{setTemp_Trips({...temp_trips,trip_modified:e.target.value});checkErrors()}}
defaultValue ={temp_trips.trip_modified}
error ={(errorMessages.trip_modified)?true:false}
label ={"trip_modified"}/>
</ Grid >
<Grid xs={12} md={6} key={"21"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.is_trip_modified}
type ={"number"}
onChange={(e)=>{setTemp_Trips({...temp_trips,is_trip_modified:e.target.value});checkErrors()}}
defaultValue ={temp_trips.is_trip_modified}
error ={(errorMessages.is_trip_modified)?true:false}
label ={"is_trip_modified"}/>
</ Grid >
<Grid xs={12} md={6} key={"22"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.i_agree}
type ={"number"}
onChange={(e)=>{setTemp_Trips({...temp_trips,i_agree:e.target.value});checkErrors()}}
defaultValue ={temp_trips.i_agree}
error ={(errorMessages.i_agree)?true:false}
label ={"i_agree"}/>
</ Grid >
<Grid xs={12} md={6} key={"23"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.start_date}
type ={"datetime-local"}
InputLabelProps ={{ shrink: true, }}
onChange={(e)=>{setTemp_Trips({...temp_trips,start_date:e.target.value});checkErrors()}}
defaultValue ={temp_trips.start_date}
error ={(errorMessages.start_date)?true:false}
label ={"start_date"}/>
</ Grid >
<Grid xs={12} md={6} key={"24"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.end_date}
type ={"datetime-local"}
InputLabelProps ={{ shrink: true, }}
onChange={(e)=>{setTemp_Trips({...temp_trips,end_date:e.target.value});checkErrors()}}
defaultValue ={temp_trips.end_date}
error ={(errorMessages.end_date)?true:false}
label ={"end_date"}/>
</ Grid >
<Grid xs={12} md={6} key={"25"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.created_at}
type ={"datetime-local"}
InputLabelProps ={{ shrink: true, }}
onChange={(e)=>{setTemp_Trips({...temp_trips,created_at:e.target.value});checkErrors()}}
defaultValue ={temp_trips.created_at}
error ={(errorMessages.created_at)?true:false}
label ={"created_at"}/>
</ Grid >
<Grid xs={12} md={6} key={"26"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.updated_at}
type ={"datetime-local"}
InputLabelProps ={{ shrink: true, }}
onChange={(e)=>{setTemp_Trips({...temp_trips,updated_at:e.target.value});checkErrors()}}
defaultValue ={temp_trips.updated_at}
error ={(errorMessages.updated_at)?true:false}
label ={"updated_at"}/>
</ Grid >
<Grid xs={12}  md={6} item key={"27"}>
<Grid container justify={"flex-end"} alignContent={"flex-end"}>
<Button onClick={() => history.push('/temp_trips')} variant={"contained"} type={"Button"} color="secondary">Cancel</Button>
</Grid>
</Grid>
<Grid xs={12}  md={6} item key={"28"}>
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

export default withRouter(Temp_TripsAddUpdatePage)
