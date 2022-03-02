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
import {addTrip_Cancellations, getTrip_Cancellations,getOneTrip_Cancellations, updateTrip_Cancellations} from "../../repo/trip_cancellationsRepo";


import {getUsers} from "../../repo/usersRepo";



function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
function validateEmail(email){
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
const Trip_CancellationsAddUpdatePage = (props)=>{
    const [alertState, setAlertstate] = useState({
        open: false,
        vertical: 'bottom',
        horizontal: 'center',
        severity: "success",
        message:"",
      });
    const { vertical, horizontal, open, severity, message } = alertState;
    const [errorMessages, setErrorMessages] = useState({});
    const [trip_cancellations,setTrip_Cancellations] = useState(undefined);
    const [loading, setLoading] = useState(false);
    const [users,setUsers] = useState(undefined)


    const checkErrors = () => {
        let errorList = {}
        if(trip_cancellations.user_id === "" || trip_cancellations.user_id === undefined)
{
   errorList = { ...errorList,user_id: "Required field!"}
}
if(trip_cancellations.trip_id === "" || trip_cancellations.trip_id === undefined)
{
   errorList = { ...errorList,trip_id: "Required field!"}
}


        setErrorMessages(errorList)
        return errorList
    }

    useEffect(()=>{
     setLoading(true);
    getUsers(0,200,"").then((res)=>{ setUsers(res.data); setLoading(false); })

      
        if(props.match.params.id) {
            setLoading(true);
            getOneTrip_Cancellations(props.match.params.id).then((res) => {
                setTrip_Cancellations(res.data.data);
                setLoading(false);
            })
        }else{
            setTrip_Cancellations({})
        }
    },[props.match.params.id])
   

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
        const errors = checkErrors()
        //if no errors then send data
        if(Object.keys(errors).length<1) {
            if (trip_cancellations.id) {
            setLoading(true);
               var updateResponse =  await updateTrip_Cancellations(trip_cancellations.id,trip_cancellations);
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
                var addResponse = await addTrip_Cancellations(trip_cancellations);
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
        <PageTemplate title="Add/Update Trip_Cancellations">
            <Card>
            <CardContent>
                <form onSubmit={handleSubmit} noValidate autoComplete="off">
               
                    {(trip_cancellations!==undefined  && users!==undefined)?
                        <Grid spacing={3} container>
                           <Grid xs={12} md={6} key={"1"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.trip_id}
type ={"text"}
onChange={(e)=>{setTrip_Cancellations({...trip_cancellations,trip_id:e.target.value});checkErrors()}}
defaultValue ={trip_cancellations.trip_id}
error ={(errorMessages.trip_id)?true:false}
label ={"trip_id"}/>
</ Grid >
<Grid xs={12} md={6} key={"2"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.promotions}
type ={"number"}
onChange={(e)=>{setTrip_Cancellations({...trip_cancellations,promotions:e.target.value});checkErrors()}}
defaultValue ={trip_cancellations.promotions}
error ={(errorMessages.promotions)?true:false}
label ={"promotions"}/>
</ Grid >
<Grid xs={12} md={6} key={"3"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.unavailable}
type ={"number"}
onChange={(e)=>{setTrip_Cancellations({...trip_cancellations,unavailable:e.target.value});checkErrors()}}
defaultValue ={trip_cancellations.unavailable}
error ={(errorMessages.unavailable)?true:false}
label ={"unavailable"}/>
</ Grid >
<Grid xs={12} md={6} key={"4"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.repair}
type ={"number"}
onChange={(e)=>{setTrip_Cancellations({...trip_cancellations,repair:e.target.value});checkErrors()}}
defaultValue ={trip_cancellations.repair}
error ={(errorMessages.repair)?true:false}
label ={"repair"}/>
</ Grid >
<Grid xs={12} md={6} key={"5"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.guest_cancel}
type ={"number"}
onChange={(e)=>{setTrip_Cancellations({...trip_cancellations,guest_cancel:e.target.value});checkErrors()}}
defaultValue ={trip_cancellations.guest_cancel}
error ={(errorMessages.guest_cancel)?true:false}
label ={"guest_cancel"}/>
</ Grid >
<Grid xs={12} md={6} key={"6"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.uncomfortable}
type ={"number"}
onChange={(e)=>{setTrip_Cancellations({...trip_cancellations,uncomfortable:e.target.value});checkErrors()}}
defaultValue ={trip_cancellations.uncomfortable}
error ={(errorMessages.uncomfortable)?true:false}
label ={"uncomfortable"}/>
</ Grid >
<Grid xs={12} md={6} key={"7"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.auto_cancel}
type ={"number"}
onChange={(e)=>{setTrip_Cancellations({...trip_cancellations,auto_cancel:e.target.value});checkErrors()}}
defaultValue ={trip_cancellations.auto_cancel}
error ={(errorMessages.auto_cancel)?true:false}
label ={"auto_cancel"}/>
</ Grid >
<Grid xs={12} md={6} key={"8"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.telr_cancel}
type ={"number"}
onChange={(e)=>{setTrip_Cancellations({...trip_cancellations,telr_cancel:e.target.value});checkErrors()}}
defaultValue ={trip_cancellations.telr_cancel}
error ={(errorMessages.telr_cancel)?true:false}
label ={"telr_cancel"}/>
</ Grid >
<Grid xs={12} md={6} key={"9"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.other}
type ={"number"}
onChange={(e)=>{setTrip_Cancellations({...trip_cancellations,other:e.target.value});checkErrors()}}
defaultValue ={trip_cancellations.other}
error ={(errorMessages.other)?true:false}
label ={"other"}/>
</ Grid >
<Grid xs={12} md={6} key={"10"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.reason}
type ={"text"}
onChange={(e)=>{setTrip_Cancellations({...trip_cancellations,reason:e.target.value});checkErrors()}}
defaultValue ={trip_cancellations.reason}
error ={(errorMessages.reason)?true:false}
label ={"reason"}/>
</ Grid >
<Grid xs={12} md={6} key={"11"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.created_at}
type ={"datetime-local"}
InputLabelProps ={{ shrink: true, }}
onChange={(e)=>{setTrip_Cancellations({...trip_cancellations,created_at:e.target.value});checkErrors()}}
defaultValue ={trip_cancellations.created_at}
error ={(errorMessages.created_at)?true:false}
label ={"created_at"}/>
</ Grid >
<Grid xs={12} md={6} key={"12"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.updated_at}
type ={"datetime-local"}
InputLabelProps ={{ shrink: true, }}
onChange={(e)=>{setTrip_Cancellations({...trip_cancellations,updated_at:e.target.value});checkErrors()}}
defaultValue ={trip_cancellations.updated_at}
error ={(errorMessages.updated_at)?true:false}
label ={"updated_at"}/>
</ Grid >
<Grid xs={12} md={6} key={"13"} item >
<InputLabel style={{textAlign: 'left'}}>user_id</InputLabel>
        <Select style={{width: '100%',textAlign: 'left'}}
                              labelId ="user_id"
                              id="user_id"
                              value={trip_cancellations.user_id}
                              onChange ={(e)=>{setTrip_Cancellations({...trip_cancellations,user_id:e.target.value});checkErrors()}}>
                              {users.map((key)=><MenuItem key={key.id} value={key.id}>{key.password}</MenuItem>)}
                          </Select>
    </Grid>
<Grid xs={12}  md={6} item key={"14"}>
<Grid container justify={"flex-end"} alignContent={"flex-end"}>
<Button onClick={() => history.push('/trip_cancellations')} variant={"contained"} type={"Button"} color="secondary">Cancel</Button>
</Grid>
</Grid>
<Grid xs={12}  md={6} item key={"15"}>
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

export default withRouter(Trip_CancellationsAddUpdatePage)
