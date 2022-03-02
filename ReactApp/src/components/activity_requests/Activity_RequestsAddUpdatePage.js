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
import {addActivity_Requests, getActivity_Requests,getOneActivity_Requests, updateActivity_Requests} from "../../repo/activity_requestsRepo";


import {getUsers} from "../../repo/usersRepo";
import {getCars} from "../../repo/carsRepo";



function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
function validateEmail(email){
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
const Activity_RequestsAddUpdatePage = (props)=>{
    const [alertState, setAlertstate] = useState({
        open: false,
        vertical: 'bottom',
        horizontal: 'center',
        severity: "success",
        message:"",
      });
    const { vertical, horizontal, open, severity, message } = alertState;
    const [errorMessages, setErrorMessages] = useState({});
    const [activity_requests,setActivity_Requests] = useState(undefined);
    const [loading, setLoading] = useState(false);
    const [users,setUsers] = useState(undefined)
const [cars,setCars] = useState(undefined)


    const checkErrors = () => {
        let errorList = {}
        if(activity_requests.owner_id === "" || activity_requests.owner_id === undefined)
{
   errorList = { ...errorList,owner_id: "Required field!"}
}
if(activity_requests.renter_id === "" || activity_requests.renter_id === undefined)
{
   errorList = { ...errorList,renter_id: "Required field!"}
}
if(activity_requests.car_id === "" || activity_requests.car_id === undefined)
{
   errorList = { ...errorList,car_id: "Required field!"}
}
if(activity_requests.trip_id === "" || activity_requests.trip_id === undefined)
{
   errorList = { ...errorList,trip_id: "Required field!"}
}
if(activity_requests.activity_request_type === "" || activity_requests.activity_request_type === undefined)
{
   errorList = { ...errorList,activity_request_type: "Required field!"}
}
if(activity_requests.status === "" || activity_requests.status === undefined)
{
   errorList = { ...errorList,status: "Required field!"}
}
if(activity_requests.visibility === "" || activity_requests.visibility === undefined)
{
   errorList = { ...errorList,visibility: "Required field!"}
}


        setErrorMessages(errorList)
        return errorList
    }

    useEffect(()=>{
     setLoading(true);
    getUsers(0,200,"").then((res)=>{ setUsers(res.data); setLoading(false); })
getCars(0,200,"").then((res)=>{ setCars(res.data); setLoading(false); })

      
        if(props.match.params.id) {
            setLoading(true);
            getOneActivity_Requests(props.match.params.id).then((res) => {
                setActivity_Requests(res.data.data);
                setLoading(false);
            })
        }else{
            setActivity_Requests({})
        }
    },[props.match.params.id])
   

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
        const errors = checkErrors()
        //if no errors then send data
        if(Object.keys(errors).length<1) {
            if (activity_requests.id) {
            setLoading(true);
               var updateResponse =  await updateActivity_Requests(activity_requests.id,activity_requests);
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
                var addResponse = await addActivity_Requests(activity_requests);
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
        <PageTemplate title="Add/Update Activity_Requests">
            <Card>
            <CardContent>
                <form onSubmit={handleSubmit} noValidate autoComplete="off">
               
                    {(activity_requests!==undefined  && users!==undefined && users!==undefined && cars!==undefined)?
                        <Grid spacing={3} container>
                           <Grid xs={12} md={6} key={"3"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.trip_id}
type ={"text"}
onChange={(e)=>{setActivity_Requests({...activity_requests,trip_id:e.target.value});checkErrors()}}
defaultValue ={activity_requests.trip_id}
error ={(errorMessages.trip_id)?true:false}
label ={"trip_id"}/>
</ Grid >
<Grid xs={12} md={6} key={"4"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.activity_request_type}
type ={"number"}
onChange={(e)=>{setActivity_Requests({...activity_requests,activity_request_type:e.target.value});checkErrors()}}
defaultValue ={activity_requests.activity_request_type}
error ={(errorMessages.activity_request_type)?true:false}
label ={"activity_request_type"}/>
</ Grid >
<Grid xs={12} md={6} key={"5"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.status}
type ={"number"}
onChange={(e)=>{setActivity_Requests({...activity_requests,status:e.target.value});checkErrors()}}
defaultValue ={activity_requests.status}
error ={(errorMessages.status)?true:false}
label ={"status"}/>
</ Grid >
<Grid xs={12} md={6} key={"6"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.visibility}
type ={"number"}
onChange={(e)=>{setActivity_Requests({...activity_requests,visibility:e.target.value});checkErrors()}}
defaultValue ={activity_requests.visibility}
error ={(errorMessages.visibility)?true:false}
label ={"visibility"}/>
</ Grid >
<Grid xs={12} md={6} key={"7"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.created_at}
type ={"datetime-local"}
InputLabelProps ={{ shrink: true, }}
onChange={(e)=>{setActivity_Requests({...activity_requests,created_at:e.target.value});checkErrors()}}
defaultValue ={activity_requests.created_at}
error ={(errorMessages.created_at)?true:false}
label ={"created_at"}/>
</ Grid >
<Grid xs={12} md={6} key={"8"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.updated_at}
type ={"datetime-local"}
InputLabelProps ={{ shrink: true, }}
onChange={(e)=>{setActivity_Requests({...activity_requests,updated_at:e.target.value});checkErrors()}}
defaultValue ={activity_requests.updated_at}
error ={(errorMessages.updated_at)?true:false}
label ={"updated_at"}/>
</ Grid >
<Grid xs={12} md={6} key={"9"} item >
<InputLabel style={{textAlign: 'left'}}>owner_id</InputLabel>
        <Select style={{width: '100%',textAlign: 'left'}}
                              labelId ="owner_id"
                              id="owner_id"
                              value={activity_requests.owner_id}
                              onChange ={(e)=>{setActivity_Requests({...activity_requests,owner_id:e.target.value});checkErrors()}}>
                              {users.map((key)=><MenuItem key={key.id} value={key.id}>{key.password}</MenuItem>)}
                          </Select>
    </Grid>
<Grid xs={12} md={6} key={"10"} item >
<InputLabel style={{textAlign: 'left'}}>renter_id</InputLabel>
        <Select style={{width: '100%',textAlign: 'left'}}
                              labelId ="renter_id"
                              id="renter_id"
                              value={activity_requests.renter_id}
                              onChange ={(e)=>{setActivity_Requests({...activity_requests,renter_id:e.target.value});checkErrors()}}>
                              {users.map((key)=><MenuItem key={key.id} value={key.id}>{key.password}</MenuItem>)}
                          </Select>
    </Grid>
<Grid xs={12} md={6} key={"11"} item >
<InputLabel style={{textAlign: 'left'}}>car_id</InputLabel>
        <Select style={{width: '100%',textAlign: 'left'}}
                              labelId ="car_id"
                              id="car_id"
                              value={activity_requests.car_id}
                              onChange ={(e)=>{setActivity_Requests({...activity_requests,car_id:e.target.value});checkErrors()}}>
                              {cars.map((key)=><MenuItem key={key.id} value={key.id}>{key.long_location}</MenuItem>)}
                          </Select>
    </Grid>
<Grid xs={12}  md={6} item key={"12"}>
<Grid container justify={"flex-end"} alignContent={"flex-end"}>
<Button onClick={() => history.push('/activity_requests')} variant={"contained"} type={"Button"} color="secondary">Cancel</Button>
</Grid>
</Grid>
<Grid xs={12}  md={6} item key={"13"}>
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

export default withRouter(Activity_RequestsAddUpdatePage)
