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
import {addEsar_Airports, getEsar_Airports,getOneEsar_Airports, updateEsar_Airports} from "../../repo/esar_airportsRepo";





function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
function validateEmail(email){
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
const Esar_AirportsAddUpdatePage = (props)=>{
    const [alertState, setAlertstate] = useState({
        open: false,
        vertical: 'bottom',
        horizontal: 'center',
        severity: "success",
        message:"",
      });
    const { vertical, horizontal, open, severity, message } = alertState;
    const [errorMessages, setErrorMessages] = useState({});
    const [esar_airports,setEsar_Airports] = useState(undefined);
    const [loading, setLoading] = useState(false);
    

    const checkErrors = () => {
        let errorList = {}
        

        setErrorMessages(errorList)
        return errorList
    }

    useEffect(()=>{
     setLoading(true);
    
      
        if(props.match.params.id) {
            setLoading(true);
            getOneEsar_Airports(props.match.params.id).then((res) => {
                setEsar_Airports(res.data.data);
                setLoading(false);
            })
        }else{
            setEsar_Airports({})
        }
    },[props.match.params.id])
   

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
        const errors = checkErrors()
        //if no errors then send data
        if(Object.keys(errors).length<1) {
            if (esar_airports.id) {
            setLoading(true);
               var updateResponse =  await updateEsar_Airports(esar_airports.id,esar_airports);
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
                var addResponse = await addEsar_Airports(esar_airports);
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
        <PageTemplate title="Add/Update Esar_Airports">
            <Card>
            <CardContent>
                <form onSubmit={handleSubmit} noValidate autoComplete="off">
               
                    {(esar_airports!==undefined )?
                        <Grid spacing={3} container>
                           <Grid xs={12} md={6} key={"0"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.iata}
type ={"text"}
onChange={(e)=>{setEsar_Airports({...esar_airports,iata:e.target.value});checkErrors()}}
defaultValue ={esar_airports.iata}
error ={(errorMessages.iata)?true:false}
label ={"iata"}/>
</ Grid >
<Grid xs={12} md={6} key={"1"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.icao}
type ={"text"}
onChange={(e)=>{setEsar_Airports({...esar_airports,icao:e.target.value});checkErrors()}}
defaultValue ={esar_airports.icao}
error ={(errorMessages.icao)?true:false}
label ={"icao"}/>
</ Grid >
<Grid xs={12} md={6} key={"2"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.airport_name}
type ={"text"}
onChange={(e)=>{setEsar_Airports({...esar_airports,airport_name:e.target.value});checkErrors()}}
defaultValue ={esar_airports.airport_name}
error ={(errorMessages.airport_name)?true:false}
label ={"airport_name"}/>
</ Grid >
<Grid xs={12} md={6} key={"3"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.arabic_airport_name}
type ={"text"}
onChange={(e)=>{setEsar_Airports({...esar_airports,arabic_airport_name:e.target.value});checkErrors()}}
defaultValue ={esar_airports.arabic_airport_name}
error ={(errorMessages.arabic_airport_name)?true:false}
label ={"arabic_airport_name"}/>
</ Grid >
<Grid xs={12} md={6} key={"4"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.alternative_name}
type ={"text"}
onChange={(e)=>{setEsar_Airports({...esar_airports,alternative_name:e.target.value});checkErrors()}}
defaultValue ={esar_airports.alternative_name}
error ={(errorMessages.alternative_name)?true:false}
label ={"alternative_name"}/>
</ Grid >
<Grid xs={12} md={6} key={"5"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.arabic_alternative_name}
type ={"text"}
onChange={(e)=>{setEsar_Airports({...esar_airports,arabic_alternative_name:e.target.value});checkErrors()}}
defaultValue ={esar_airports.arabic_alternative_name}
error ={(errorMessages.arabic_alternative_name)?true:false}
label ={"arabic_alternative_name"}/>
</ Grid >
<Grid xs={12} md={6} key={"6"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.airport_city}
type ={"text"}
onChange={(e)=>{setEsar_Airports({...esar_airports,airport_city:e.target.value});checkErrors()}}
defaultValue ={esar_airports.airport_city}
error ={(errorMessages.airport_city)?true:false}
label ={"airport_city"}/>
</ Grid >
<Grid xs={12} md={6} key={"7"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.arabic_airport_city}
type ={"text"}
onChange={(e)=>{setEsar_Airports({...esar_airports,arabic_airport_city:e.target.value});checkErrors()}}
defaultValue ={esar_airports.arabic_airport_city}
error ={(errorMessages.arabic_airport_city)?true:false}
label ={"arabic_airport_city"}/>
</ Grid >
<Grid xs={12} md={6} key={"8"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.airport_state}
type ={"text"}
onChange={(e)=>{setEsar_Airports({...esar_airports,airport_state:e.target.value});checkErrors()}}
defaultValue ={esar_airports.airport_state}
error ={(errorMessages.airport_state)?true:false}
label ={"airport_state"}/>
</ Grid >
<Grid xs={12} md={6} key={"9"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.arabic_airport_state}
type ={"text"}
onChange={(e)=>{setEsar_Airports({...esar_airports,arabic_airport_state:e.target.value});checkErrors()}}
defaultValue ={esar_airports.arabic_airport_state}
error ={(errorMessages.arabic_airport_state)?true:false}
label ={"arabic_airport_state"}/>
</ Grid >
<Grid xs={12} md={6} key={"10"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.latitude}
type ={"text"}
onChange={(e)=>{setEsar_Airports({...esar_airports,latitude:e.target.value});checkErrors()}}
defaultValue ={esar_airports.latitude}
error ={(errorMessages.latitude)?true:false}
label ={"latitude"}/>
</ Grid >
<Grid xs={12} md={6} key={"11"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.longitude}
type ={"text"}
onChange={(e)=>{setEsar_Airports({...esar_airports,longitude:e.target.value});checkErrors()}}
defaultValue ={esar_airports.longitude}
error ={(errorMessages.longitude)?true:false}
label ={"longitude"}/>
</ Grid >
<Grid xs={12} md={6} key={"12"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.region}
type ={"text"}
onChange={(e)=>{setEsar_Airports({...esar_airports,region:e.target.value});checkErrors()}}
defaultValue ={esar_airports.region}
error ={(errorMessages.region)?true:false}
label ={"region"}/>
</ Grid >
<Grid xs={12}  md={6} item key={"13"}>
<Grid container justify={"flex-end"} alignContent={"flex-end"}>
<Button onClick={() => history.push('/esar_airports')} variant={"contained"} type={"Button"} color="secondary">Cancel</Button>
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

export default withRouter(Esar_AirportsAddUpdatePage)
