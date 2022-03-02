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
import {addDriver_Licences, getDriver_Licences,getOneDriver_Licences, updateDriver_Licences} from "../../repo/driver_licencesRepo";


import {getUsers} from "../../repo/usersRepo";



function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
function validateEmail(email){
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
const Driver_LicencesAddUpdatePage = (props)=>{
    const [alertState, setAlertstate] = useState({
        open: false,
        vertical: 'bottom',
        horizontal: 'center',
        severity: "success",
        message:"",
      });
    const { vertical, horizontal, open, severity, message } = alertState;
    const [errorMessages, setErrorMessages] = useState({});
    const [driver_licences,setDriver_Licences] = useState(undefined);
    const [loading, setLoading] = useState(false);
    const [users,setUsers] = useState(undefined)


    const checkErrors = () => {
        let errorList = {}
        if(driver_licences.user_id === "" || driver_licences.user_id === undefined)
{
   errorList = { ...errorList,user_id: "Required field!"}
}


        setErrorMessages(errorList)
        return errorList
    }

    useEffect(()=>{
     setLoading(true);
    getUsers(0,200,"").then((res)=>{ setUsers(res.data); setLoading(false); })

      
        if(props.match.params.id) {
            setLoading(true);
            getOneDriver_Licences(props.match.params.id).then((res) => {
                setDriver_Licences(res.data.data);
                setLoading(false);
            })
        }else{
            setDriver_Licences({})
        }
    },[props.match.params.id])
   

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
        const errors = checkErrors()
        //if no errors then send data
        if(Object.keys(errors).length<1) {
            if (driver_licences.id) {
            setLoading(true);
               var updateResponse =  await updateDriver_Licences(driver_licences.id,driver_licences);
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
                var addResponse = await addDriver_Licences(driver_licences);
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
        <PageTemplate title="Add/Update Driver_Licences">
            <Card>
            <CardContent>
                <form onSubmit={handleSubmit} noValidate autoComplete="off">
               
                    {(driver_licences!==undefined  && users!==undefined)?
                        <Grid spacing={3} container>
                           <Grid xs={12} md={6} key={"1"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.dl_number}
type ={"text"}
onChange={(e)=>{setDriver_Licences({...driver_licences,dl_number:e.target.value});checkErrors()}}
defaultValue ={driver_licences.dl_number}
error ={(errorMessages.dl_number)?true:false}
label ={"dl_number"}/>
</ Grid >
<Grid xs={12} md={6} key={"2"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.country}
type ={"text"}
onChange={(e)=>{setDriver_Licences({...driver_licences,country:e.target.value});checkErrors()}}
defaultValue ={driver_licences.country}
error ={(errorMessages.country)?true:false}
label ={"country"}/>
</ Grid >
<Grid xs={12} md={6} key={"3"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.state}
type ={"text"}
onChange={(e)=>{setDriver_Licences({...driver_licences,state:e.target.value});checkErrors()}}
defaultValue ={driver_licences.state}
error ={(errorMessages.state)?true:false}
label ={"state"}/>
</ Grid >
<Grid xs={12} md={6} key={"4"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.city}
type ={"text"}
onChange={(e)=>{setDriver_Licences({...driver_licences,city:e.target.value});checkErrors()}}
defaultValue ={driver_licences.city}
error ={(errorMessages.city)?true:false}
label ={"city"}/>
</ Grid >
<Grid xs={12} md={6} key={"5"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.issued_by}
type ={"text"}
onChange={(e)=>{setDriver_Licences({...driver_licences,issued_by:e.target.value});checkErrors()}}
defaultValue ={driver_licences.issued_by}
error ={(errorMessages.issued_by)?true:false}
label ={"issued_by"}/>
</ Grid >
<Grid xs={12} md={6} key={"6"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.date_of_issue}
type ={"text"}
onChange={(e)=>{setDriver_Licences({...driver_licences,date_of_issue:e.target.value});checkErrors()}}
defaultValue ={driver_licences.date_of_issue}
error ={(errorMessages.date_of_issue)?true:false}
label ={"date_of_issue"}/>
</ Grid >
<Grid xs={12} md={6} key={"7"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.expiration_date}
type ={"text"}
onChange={(e)=>{setDriver_Licences({...driver_licences,expiration_date:e.target.value});checkErrors()}}
defaultValue ={driver_licences.expiration_date}
error ={(errorMessages.expiration_date)?true:false}
label ={"expiration_date"}/>
</ Grid >
<Grid xs={12} md={6} key={"8"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.expired}
type ={"number"}
onChange={(e)=>{setDriver_Licences({...driver_licences,expired:e.target.value});checkErrors()}}
defaultValue ={driver_licences.expired}
error ={(errorMessages.expired)?true:false}
label ={"expired"}/>
</ Grid >
<Grid xs={12} md={6} key={"9"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.image_path}
type ={"text"}
onChange={(e)=>{setDriver_Licences({...driver_licences,image_path:e.target.value});checkErrors()}}
defaultValue ={driver_licences.image_path}
error ={(errorMessages.image_path)?true:false}
label ={"image_path"}/>
</ Grid >
<Grid xs={12} md={6} key={"10"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.image_path_small}
type ={"text"}
onChange={(e)=>{setDriver_Licences({...driver_licences,image_path_small:e.target.value});checkErrors()}}
defaultValue ={driver_licences.image_path_small}
error ={(errorMessages.image_path_small)?true:false}
label ={"image_path_small"}/>
</ Grid >
<Grid xs={12} md={6} key={"11"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.created_at}
type ={"datetime-local"}
InputLabelProps ={{ shrink: true, }}
onChange={(e)=>{setDriver_Licences({...driver_licences,created_at:e.target.value});checkErrors()}}
defaultValue ={driver_licences.created_at}
error ={(errorMessages.created_at)?true:false}
label ={"created_at"}/>
</ Grid >
<Grid xs={12} md={6} key={"12"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.updated_at}
type ={"datetime-local"}
InputLabelProps ={{ shrink: true, }}
onChange={(e)=>{setDriver_Licences({...driver_licences,updated_at:e.target.value});checkErrors()}}
defaultValue ={driver_licences.updated_at}
error ={(errorMessages.updated_at)?true:false}
label ={"updated_at"}/>
</ Grid >
<Grid xs={12} md={6} key={"13"} item >
<InputLabel style={{textAlign: 'left'}}>user_id</InputLabel>
        <Select style={{width: '100%',textAlign: 'left'}}
                              labelId ="user_id"
                              id="user_id"
                              value={driver_licences.user_id}
                              onChange ={(e)=>{setDriver_Licences({...driver_licences,user_id:e.target.value});checkErrors()}}>
                              {users.map((key)=><MenuItem key={key.id} value={key.id}>{key.password}</MenuItem>)}
                          </Select>
    </Grid>
<Grid xs={12}  md={6} item key={"14"}>
<Grid container justify={"flex-end"} alignContent={"flex-end"}>
<Button onClick={() => history.push('/driver_licences')} variant={"contained"} type={"Button"} color="secondary">Cancel</Button>
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

export default withRouter(Driver_LicencesAddUpdatePage)
