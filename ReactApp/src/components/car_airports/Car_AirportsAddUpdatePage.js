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
import {addCar_Airports, getCar_Airports,getOneCar_Airports, updateCar_Airports} from "../../repo/car_airportsRepo";


import {getCars} from "../../repo/carsRepo";



function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
function validateEmail(email){
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
const Car_AirportsAddUpdatePage = (props)=>{
    const [alertState, setAlertstate] = useState({
        open: false,
        vertical: 'bottom',
        horizontal: 'center',
        severity: "success",
        message:"",
      });
    const { vertical, horizontal, open, severity, message } = alertState;
    const [errorMessages, setErrorMessages] = useState({});
    const [car_airports,setCar_Airports] = useState(undefined);
    const [loading, setLoading] = useState(false);
    const [cars,setCars] = useState(undefined)


    const checkErrors = () => {
        let errorList = {}
        if(car_airports.car_id === "" || car_airports.car_id === undefined)
{
   errorList = { ...errorList,car_id: "Required field!"}
}
if(car_airports.airport_name === "" || car_airports.airport_name === undefined)
{
   errorList = { ...errorList,airport_name: "Required field!"}
}
if(car_airports.arabic_airport_name === "" || car_airports.arabic_airport_name === undefined)
{
   errorList = { ...errorList,arabic_airport_name: "Required field!"}
}
if(car_airports.airport_city === "" || car_airports.airport_city === undefined)
{
   errorList = { ...errorList,airport_city: "Required field!"}
}
if(car_airports.arabic_airport_city === "" || car_airports.arabic_airport_city === undefined)
{
   errorList = { ...errorList,arabic_airport_city: "Required field!"}
}
if(car_airports.airport_state === "" || car_airports.airport_state === undefined)
{
   errorList = { ...errorList,airport_state: "Required field!"}
}
if(car_airports.arabic_airport_state === "" || car_airports.arabic_airport_state === undefined)
{
   errorList = { ...errorList,arabic_airport_state: "Required field!"}
}
if(car_airports.latitude === "" || car_airports.latitude === undefined)
{
   errorList = { ...errorList,latitude: "Required field!"}
}
if(car_airports.longitude === "" || car_airports.longitude === undefined)
{
   errorList = { ...errorList,longitude: "Required field!"}
}
if(car_airports.region === "" || car_airports.region === undefined)
{
   errorList = { ...errorList,region: "Required field!"}
}
if(car_airports.work_on_airport === "" || car_airports.work_on_airport === undefined)
{
   errorList = { ...errorList,work_on_airport: "Required field!"}
}


        setErrorMessages(errorList)
        return errorList
    }

    useEffect(()=>{
     setLoading(true);
    getCars(0,200,"").then((res)=>{ setCars(res.data); setLoading(false); })

      
        if(props.match.params.id) {
            setLoading(true);
            getOneCar_Airports(props.match.params.id).then((res) => {
                setCar_Airports(res.data.data);
                setLoading(false);
            })
        }else{
            setCar_Airports({})
        }
    },[props.match.params.id])
   

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
        const errors = checkErrors()
        //if no errors then send data
        if(Object.keys(errors).length<1) {
            if (car_airports.id) {
            setLoading(true);
               var updateResponse =  await updateCar_Airports(car_airports.id,car_airports);
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
                var addResponse = await addCar_Airports(car_airports);
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
        <PageTemplate title="Add/Update Car_Airports">
            <Card>
            <CardContent>
                <form onSubmit={handleSubmit} noValidate autoComplete="off">
               
                    {(car_airports!==undefined  && cars!==undefined)?
                        <Grid spacing={3} container>
                           <Grid xs={12} md={6} key={"1"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.airport_name}
type ={"text"}
onChange={(e)=>{setCar_Airports({...car_airports,airport_name:e.target.value});checkErrors()}}
defaultValue ={car_airports.airport_name}
error ={(errorMessages.airport_name)?true:false}
label ={"airport_name"}/>
</ Grid >
<Grid xs={12} md={6} key={"2"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.arabic_airport_name}
type ={"text"}
onChange={(e)=>{setCar_Airports({...car_airports,arabic_airport_name:e.target.value});checkErrors()}}
defaultValue ={car_airports.arabic_airport_name}
error ={(errorMessages.arabic_airport_name)?true:false}
label ={"arabic_airport_name"}/>
</ Grid >
<Grid xs={12} md={6} key={"3"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.airport_city}
type ={"text"}
onChange={(e)=>{setCar_Airports({...car_airports,airport_city:e.target.value});checkErrors()}}
defaultValue ={car_airports.airport_city}
error ={(errorMessages.airport_city)?true:false}
label ={"airport_city"}/>
</ Grid >
<Grid xs={12} md={6} key={"4"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.arabic_airport_city}
type ={"text"}
onChange={(e)=>{setCar_Airports({...car_airports,arabic_airport_city:e.target.value});checkErrors()}}
defaultValue ={car_airports.arabic_airport_city}
error ={(errorMessages.arabic_airport_city)?true:false}
label ={"arabic_airport_city"}/>
</ Grid >
<Grid xs={12} md={6} key={"5"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.airport_state}
type ={"text"}
onChange={(e)=>{setCar_Airports({...car_airports,airport_state:e.target.value});checkErrors()}}
defaultValue ={car_airports.airport_state}
error ={(errorMessages.airport_state)?true:false}
label ={"airport_state"}/>
</ Grid >
<Grid xs={12} md={6} key={"6"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.arabic_airport_state}
type ={"text"}
onChange={(e)=>{setCar_Airports({...car_airports,arabic_airport_state:e.target.value});checkErrors()}}
defaultValue ={car_airports.arabic_airport_state}
error ={(errorMessages.arabic_airport_state)?true:false}
label ={"arabic_airport_state"}/>
</ Grid >
<Grid xs={12} md={6} key={"7"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.latitude}
type ={"text"}
onChange={(e)=>{setCar_Airports({...car_airports,latitude:e.target.value});checkErrors()}}
defaultValue ={car_airports.latitude}
error ={(errorMessages.latitude)?true:false}
label ={"latitude"}/>
</ Grid >
<Grid xs={12} md={6} key={"8"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.longitude}
type ={"text"}
onChange={(e)=>{setCar_Airports({...car_airports,longitude:e.target.value});checkErrors()}}
defaultValue ={car_airports.longitude}
error ={(errorMessages.longitude)?true:false}
label ={"longitude"}/>
</ Grid >
<Grid xs={12} md={6} key={"9"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.region}
type ={"text"}
onChange={(e)=>{setCar_Airports({...car_airports,region:e.target.value});checkErrors()}}
defaultValue ={car_airports.region}
error ={(errorMessages.region)?true:false}
label ={"region"}/>
</ Grid >
<Grid xs={12} md={6} key={"10"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.delivery_fee}
type ={"number"}
onChange={(e)=>{setCar_Airports({...car_airports,delivery_fee:e.target.value});checkErrors()}}
defaultValue ={car_airports.delivery_fee}
error ={(errorMessages.delivery_fee)?true:false}
label ={"delivery_fee"}/>
</ Grid >
<Grid xs={12} md={6} key={"11"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.work_on_airport}
type ={"number"}
onChange={(e)=>{setCar_Airports({...car_airports,work_on_airport:e.target.value});checkErrors()}}
defaultValue ={car_airports.work_on_airport}
error ={(errorMessages.work_on_airport)?true:false}
label ={"work_on_airport"}/>
</ Grid >
<Grid xs={12} md={6} key={"12"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.created_at}
type ={"datetime-local"}
InputLabelProps ={{ shrink: true, }}
onChange={(e)=>{setCar_Airports({...car_airports,created_at:e.target.value});checkErrors()}}
defaultValue ={car_airports.created_at}
error ={(errorMessages.created_at)?true:false}
label ={"created_at"}/>
</ Grid >
<Grid xs={12} md={6} key={"13"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.updated_at}
type ={"datetime-local"}
InputLabelProps ={{ shrink: true, }}
onChange={(e)=>{setCar_Airports({...car_airports,updated_at:e.target.value});checkErrors()}}
defaultValue ={car_airports.updated_at}
error ={(errorMessages.updated_at)?true:false}
label ={"updated_at"}/>
</ Grid >
<Grid xs={12} md={6} key={"14"} item >
<InputLabel style={{textAlign: 'left'}}>car_id</InputLabel>
        <Select style={{width: '100%',textAlign: 'left'}}
                              labelId ="car_id"
                              id="car_id"
                              value={car_airports.car_id}
                              onChange ={(e)=>{setCar_Airports({...car_airports,car_id:e.target.value});checkErrors()}}>
                              {cars.map((key)=><MenuItem key={key.id} value={key.id}>{key.long_location}</MenuItem>)}
                          </Select>
    </Grid>
<Grid xs={12}  md={6} item key={"15"}>
<Grid container justify={"flex-end"} alignContent={"flex-end"}>
<Button onClick={() => history.push('/car_airports')} variant={"contained"} type={"Button"} color="secondary">Cancel</Button>
</Grid>
</Grid>
<Grid xs={12}  md={6} item key={"16"}>
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

export default withRouter(Car_AirportsAddUpdatePage)
