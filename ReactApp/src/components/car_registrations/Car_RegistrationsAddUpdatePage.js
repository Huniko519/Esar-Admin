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
import {addCar_Registrations, getCar_Registrations,getOneCar_Registrations, updateCar_Registrations} from "../../repo/car_registrationsRepo";


import {getCars} from "../../repo/carsRepo";



function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
function validateEmail(email){
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
const Car_RegistrationsAddUpdatePage = (props)=>{
    const [alertState, setAlertstate] = useState({
        open: false,
        vertical: 'bottom',
        horizontal: 'center',
        severity: "success",
        message:"",
      });
    const { vertical, horizontal, open, severity, message } = alertState;
    const [errorMessages, setErrorMessages] = useState({});
    const [car_registrations,setCar_Registrations] = useState(undefined);
    const [loading, setLoading] = useState(false);
    const [cars,setCars] = useState(undefined)


    const checkErrors = () => {
        let errorList = {}
        if(car_registrations.car_id === "" || car_registrations.car_id === undefined)
{
   errorList = { ...errorList,car_id: "Required field!"}
}
if(car_registrations.country === "" || car_registrations.country === undefined)
{
   errorList = { ...errorList,country: "Required field!"}
}
if(car_registrations.state === "" || car_registrations.state === undefined)
{
   errorList = { ...errorList,state: "Required field!"}
}
if(car_registrations.city === "" || car_registrations.city === undefined)
{
   errorList = { ...errorList,city: "Required field!"}
}
if(car_registrations.licence_plate === "" || car_registrations.licence_plate === undefined)
{
   errorList = { ...errorList,licence_plate: "Required field!"}
}
if(car_registrations.expiration_date === "" || car_registrations.expiration_date === undefined)
{
   errorList = { ...errorList,expiration_date: "Required field!"}
}
if(car_registrations.date_of_issue === "" || car_registrations.date_of_issue === undefined)
{
   errorList = { ...errorList,date_of_issue: "Required field!"}
}
if(car_registrations.small_car_registration_image === "" || car_registrations.small_car_registration_image === undefined)
{
   errorList = { ...errorList,small_car_registration_image: "Required field!"}
}
if(car_registrations.original_car_registration_image === "" || car_registrations.original_car_registration_image === undefined)
{
   errorList = { ...errorList,original_car_registration_image: "Required field!"}
}


        setErrorMessages(errorList)
        return errorList
    }

    useEffect(()=>{
     setLoading(true);
    getCars(0,200,"").then((res)=>{ setCars(res.data); setLoading(false); })

      
        if(props.match.params.id) {
            setLoading(true);
            getOneCar_Registrations(props.match.params.id).then((res) => {
                setCar_Registrations(res.data.data);
                setLoading(false);
            })
        }else{
            setCar_Registrations({})
        }
    },[props.match.params.id])
   

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
        const errors = checkErrors()
        //if no errors then send data
        if(Object.keys(errors).length<1) {
            if (car_registrations.id) {
            setLoading(true);
               var updateResponse =  await updateCar_Registrations(car_registrations.id,car_registrations);
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
                var addResponse = await addCar_Registrations(car_registrations);
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
        <PageTemplate title="Add/Update Car_Registrations">
            <Card>
            <CardContent>
                <form onSubmit={handleSubmit} noValidate autoComplete="off">
               
                    {(car_registrations!==undefined  && cars!==undefined)?
                        <Grid spacing={3} container>
                           <Grid xs={12} md={6} key={"1"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.country}
type ={"text"}
onChange={(e)=>{setCar_Registrations({...car_registrations,country:e.target.value});checkErrors()}}
defaultValue ={car_registrations.country}
error ={(errorMessages.country)?true:false}
label ={"country"}/>
</ Grid >
<Grid xs={12} md={6} key={"2"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.state}
type ={"text"}
onChange={(e)=>{setCar_Registrations({...car_registrations,state:e.target.value});checkErrors()}}
defaultValue ={car_registrations.state}
error ={(errorMessages.state)?true:false}
label ={"state"}/>
</ Grid >
<Grid xs={12} md={6} key={"3"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.city}
type ={"text"}
onChange={(e)=>{setCar_Registrations({...car_registrations,city:e.target.value});checkErrors()}}
defaultValue ={car_registrations.city}
error ={(errorMessages.city)?true:false}
label ={"city"}/>
</ Grid >
<Grid xs={12} md={6} key={"4"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.licence_plate}
type ={"text"}
onChange={(e)=>{setCar_Registrations({...car_registrations,licence_plate:e.target.value});checkErrors()}}
defaultValue ={car_registrations.licence_plate}
error ={(errorMessages.licence_plate)?true:false}
label ={"licence_plate"}/>
</ Grid >
<Grid xs={12} md={6} key={"5"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.expiration_date}
type ={"text"}
onChange={(e)=>{setCar_Registrations({...car_registrations,expiration_date:e.target.value});checkErrors()}}
defaultValue ={car_registrations.expiration_date}
error ={(errorMessages.expiration_date)?true:false}
label ={"expiration_date"}/>
</ Grid >
<Grid xs={12} md={6} key={"6"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.date_of_issue}
type ={"text"}
onChange={(e)=>{setCar_Registrations({...car_registrations,date_of_issue:e.target.value});checkErrors()}}
defaultValue ={car_registrations.date_of_issue}
error ={(errorMessages.date_of_issue)?true:false}
label ={"date_of_issue"}/>
</ Grid >
<Grid xs={12} md={6} key={"7"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.small_car_registration_image}
type ={"text"}
onChange={(e)=>{setCar_Registrations({...car_registrations,small_car_registration_image:e.target.value});checkErrors()}}
defaultValue ={car_registrations.small_car_registration_image}
error ={(errorMessages.small_car_registration_image)?true:false}
label ={"small_car_registration_image"}/>
</ Grid >
<Grid xs={12} md={6} key={"8"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.original_car_registration_image}
type ={"text"}
onChange={(e)=>{setCar_Registrations({...car_registrations,original_car_registration_image:e.target.value});checkErrors()}}
defaultValue ={car_registrations.original_car_registration_image}
error ={(errorMessages.original_car_registration_image)?true:false}
label ={"original_car_registration_image"}/>
</ Grid >
<Grid xs={12} md={6} key={"9"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.expired}
type ={"number"}
onChange={(e)=>{setCar_Registrations({...car_registrations,expired:e.target.value});checkErrors()}}
defaultValue ={car_registrations.expired}
error ={(errorMessages.expired)?true:false}
label ={"expired"}/>
</ Grid >
<Grid xs={12} md={6} key={"10"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.created_at}
type ={"datetime-local"}
InputLabelProps ={{ shrink: true, }}
onChange={(e)=>{setCar_Registrations({...car_registrations,created_at:e.target.value});checkErrors()}}
defaultValue ={car_registrations.created_at}
error ={(errorMessages.created_at)?true:false}
label ={"created_at"}/>
</ Grid >
<Grid xs={12} md={6} key={"11"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.updated_at}
type ={"datetime-local"}
InputLabelProps ={{ shrink: true, }}
onChange={(e)=>{setCar_Registrations({...car_registrations,updated_at:e.target.value});checkErrors()}}
defaultValue ={car_registrations.updated_at}
error ={(errorMessages.updated_at)?true:false}
label ={"updated_at"}/>
</ Grid >
<Grid xs={12} md={6} key={"12"} item >
<InputLabel style={{textAlign: 'left'}}>car_id</InputLabel>
        <Select style={{width: '100%',textAlign: 'left'}}
                              labelId ="car_id"
                              id="car_id"
                              value={car_registrations.car_id}
                              onChange ={(e)=>{setCar_Registrations({...car_registrations,car_id:e.target.value});checkErrors()}}>
                              {cars.map((key)=><MenuItem key={key.id} value={key.id}>{key.long_location}</MenuItem>)}
                          </Select>
    </Grid>
<Grid xs={12}  md={6} item key={"13"}>
<Grid container justify={"flex-end"} alignContent={"flex-end"}>
<Button onClick={() => history.push('/car_registrations')} variant={"contained"} type={"Button"} color="secondary">Cancel</Button>
</Grid>
</Grid>
<Grid xs={12}  md={6} item key={"14"}>
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

export default withRouter(Car_RegistrationsAddUpdatePage)
