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
import {addTrip_Images, getTrip_Images,getOneTrip_Images, updateTrip_Images} from "../../repo/trip_imagesRepo";


import {getUsers} from "../../repo/usersRepo";



function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
function validateEmail(email){
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
const Trip_ImagesAddUpdatePage = (props)=>{
    const [alertState, setAlertstate] = useState({
        open: false,
        vertical: 'bottom',
        horizontal: 'center',
        severity: "success",
        message:"",
      });
    const { vertical, horizontal, open, severity, message } = alertState;
    const [errorMessages, setErrorMessages] = useState({});
    const [trip_images,setTrip_Images] = useState(undefined);
    const [loading, setLoading] = useState(false);
    const [users,setUsers] = useState(undefined)


    const checkErrors = () => {
        let errorList = {}
        if(trip_images.trip_id === "" || trip_images.trip_id === undefined)
{
   errorList = { ...errorList,trip_id: "Required field!"}
}
if(trip_images.user_id === "" || trip_images.user_id === undefined)
{
   errorList = { ...errorList,user_id: "Required field!"}
}
if(trip_images.image_path === "" || trip_images.image_path === undefined)
{
   errorList = { ...errorList,image_path: "Required field!"}
}


        setErrorMessages(errorList)
        return errorList
    }

    useEffect(()=>{
     setLoading(true);
    getUsers(0,200,"").then((res)=>{ setUsers(res.data); setLoading(false); })

      
        if(props.match.params.id) {
            setLoading(true);
            getOneTrip_Images(props.match.params.id).then((res) => {
                setTrip_Images(res.data.data);
                setLoading(false);
            })
        }else{
            setTrip_Images({})
        }
    },[props.match.params.id])
   

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
        const errors = checkErrors()
        //if no errors then send data
        if(Object.keys(errors).length<1) {
            if (trip_images.id) {
            setLoading(true);
               var updateResponse =  await updateTrip_Images(trip_images.id,trip_images);
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
                var addResponse = await addTrip_Images(trip_images);
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
        <PageTemplate title="Add/Update Trip_Images">
            <Card>
            <CardContent>
                <form onSubmit={handleSubmit} noValidate autoComplete="off">
               
                    {(trip_images!==undefined  && users!==undefined)?
                        <Grid spacing={3} container>
                           <Grid xs={12} md={6} key={"0"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.trip_id}
type ={"text"}
onChange={(e)=>{setTrip_Images({...trip_images,trip_id:e.target.value});checkErrors()}}
defaultValue ={trip_images.trip_id}
error ={(errorMessages.trip_id)?true:false}
label ={"trip_id"}/>
</ Grid >
<Grid xs={12} md={6} key={"2"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.image_path}
type ={"text"}
onChange={(e)=>{setTrip_Images({...trip_images,image_path:e.target.value});checkErrors()}}
defaultValue ={trip_images.image_path}
error ={(errorMessages.image_path)?true:false}
label ={"image_path"}/>
</ Grid >
<Grid xs={12} md={6} key={"3"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.small_image_path}
type ={"text"}
onChange={(e)=>{setTrip_Images({...trip_images,small_image_path:e.target.value});checkErrors()}}
defaultValue ={trip_images.small_image_path}
error ={(errorMessages.small_image_path)?true:false}
label ={"small_image_path"}/>
</ Grid >
<Grid xs={12} md={6} key={"4"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.before_trip}
type ={"number"}
onChange={(e)=>{setTrip_Images({...trip_images,before_trip:e.target.value});checkErrors()}}
defaultValue ={trip_images.before_trip}
error ={(errorMessages.before_trip)?true:false}
label ={"before_trip"}/>
</ Grid >
<Grid xs={12} md={6} key={"5"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.created_at}
type ={"datetime-local"}
InputLabelProps ={{ shrink: true, }}
onChange={(e)=>{setTrip_Images({...trip_images,created_at:e.target.value});checkErrors()}}
defaultValue ={trip_images.created_at}
error ={(errorMessages.created_at)?true:false}
label ={"created_at"}/>
</ Grid >
<Grid xs={12} md={6} key={"6"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.updated_at}
type ={"datetime-local"}
InputLabelProps ={{ shrink: true, }}
onChange={(e)=>{setTrip_Images({...trip_images,updated_at:e.target.value});checkErrors()}}
defaultValue ={trip_images.updated_at}
error ={(errorMessages.updated_at)?true:false}
label ={"updated_at"}/>
</ Grid >
<Grid xs={12} md={6} key={"7"} item >
<InputLabel style={{textAlign: 'left'}}>user_id</InputLabel>
        <Select style={{width: '100%',textAlign: 'left'}}
                              labelId ="user_id"
                              id="user_id"
                              value={trip_images.user_id}
                              onChange ={(e)=>{setTrip_Images({...trip_images,user_id:e.target.value});checkErrors()}}>
                              {users.map((key)=><MenuItem key={key.id} value={key.id}>{key.password}</MenuItem>)}
                          </Select>
    </Grid>
<Grid xs={12}  md={6} item key={"8"}>
<Grid container justify={"flex-end"} alignContent={"flex-end"}>
<Button onClick={() => history.push('/trip_images')} variant={"contained"} type={"Button"} color="secondary">Cancel</Button>
</Grid>
</Grid>
<Grid xs={12}  md={6} item key={"9"}>
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

export default withRouter(Trip_ImagesAddUpdatePage)
