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
import {addSocial_Connections, getSocial_Connections,getOneSocial_Connections, updateSocial_Connections} from "../../repo/social_connectionsRepo";


import {getUsers} from "../../repo/usersRepo";



function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
function validateEmail(email){
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
const Social_ConnectionsAddUpdatePage = (props)=>{
    const [alertState, setAlertstate] = useState({
        open: false,
        vertical: 'bottom',
        horizontal: 'center',
        severity: "success",
        message:"",
      });
    const { vertical, horizontal, open, severity, message } = alertState;
    const [errorMessages, setErrorMessages] = useState({});
    const [social_connections,setSocial_Connections] = useState(undefined);
    const [loading, setLoading] = useState(false);
    const [users,setUsers] = useState(undefined)


    const checkErrors = () => {
        let errorList = {}
        if(social_connections.user_id === "" || social_connections.user_id === undefined)
{
   errorList = { ...errorList,user_id: "Required field!"}
}
if(social_connections.social_id === "" || social_connections.social_id === undefined)
{
   errorList = { ...errorList,social_id: "Required field!"}
}


        setErrorMessages(errorList)
        return errorList
    }

    useEffect(()=>{
     setLoading(true);
    getUsers(0,200,"").then((res)=>{ setUsers(res.data); setLoading(false); })

      
        if(props.match.params.id) {
            setLoading(true);
            getOneSocial_Connections(props.match.params.id).then((res) => {
                setSocial_Connections(res.data.data);
                setLoading(false);
            })
        }else{
            setSocial_Connections({})
        }
    },[props.match.params.id])
   

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
        const errors = checkErrors()
        //if no errors then send data
        if(Object.keys(errors).length<1) {
            if (social_connections.id) {
            setLoading(true);
               var updateResponse =  await updateSocial_Connections(social_connections.id,social_connections);
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
                var addResponse = await addSocial_Connections(social_connections);
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
        <PageTemplate title="Add/Update Social_Connections">
            <Card>
            <CardContent>
                <form onSubmit={handleSubmit} noValidate autoComplete="off">
               
                    {(social_connections!==undefined  && users!==undefined)?
                        <Grid spacing={3} container>
                           <Grid xs={12} md={6} key={"1"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.social_id}
type ={"text"}
onChange={(e)=>{setSocial_Connections({...social_connections,social_id:e.target.value});checkErrors()}}
defaultValue ={social_connections.social_id}
error ={(errorMessages.social_id)?true:false}
label ={"social_id"}/>
</ Grid >
<Grid xs={12} md={6} key={"2"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.first_name}
type ={"text"}
onChange={(e)=>{setSocial_Connections({...social_connections,first_name:e.target.value});checkErrors()}}
defaultValue ={social_connections.first_name}
error ={(errorMessages.first_name)?true:false}
label ={"first_name"}/>
</ Grid >
<Grid xs={12} md={6} key={"3"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.last_name}
type ={"text"}
onChange={(e)=>{setSocial_Connections({...social_connections,last_name:e.target.value});checkErrors()}}
defaultValue ={social_connections.last_name}
error ={(errorMessages.last_name)?true:false}
label ={"last_name"}/>
</ Grid >
<Grid xs={12} md={6} key={"4"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.email}
type ={"email"}
onChange={(e)=>{setSocial_Connections({...social_connections,email:e.target.value});checkErrors()}}
defaultValue ={social_connections.email}
error ={(errorMessages.email)?true:false}
label ={"email"}/>
</ Grid >
<Grid xs={12} md={6} key={"5"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.picture_url}
type ={"text"}
onChange={(e)=>{setSocial_Connections({...social_connections,picture_url:e.target.value});checkErrors()}}
defaultValue ={social_connections.picture_url}
error ={(errorMessages.picture_url)?true:false}
label ={"picture_url"}/>
</ Grid >
<Grid xs={12} md={6} key={"6"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.friends_count}
type ={"number"}
onChange={(e)=>{setSocial_Connections({...social_connections,friends_count:e.target.value});checkErrors()}}
defaultValue ={social_connections.friends_count}
error ={(errorMessages.friends_count)?true:false}
label ={"friends_count"}/>
</ Grid >
<Grid xs={12} md={6} key={"7"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.created_at}
type ={"datetime-local"}
InputLabelProps ={{ shrink: true, }}
onChange={(e)=>{setSocial_Connections({...social_connections,created_at:e.target.value});checkErrors()}}
defaultValue ={social_connections.created_at}
error ={(errorMessages.created_at)?true:false}
label ={"created_at"}/>
</ Grid >
<Grid xs={12} md={6} key={"8"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.updated_at}
type ={"datetime-local"}
InputLabelProps ={{ shrink: true, }}
onChange={(e)=>{setSocial_Connections({...social_connections,updated_at:e.target.value});checkErrors()}}
defaultValue ={social_connections.updated_at}
error ={(errorMessages.updated_at)?true:false}
label ={"updated_at"}/>
</ Grid >
<Grid xs={12} md={6} key={"9"} item >
<InputLabel style={{textAlign: 'left'}}>user_id</InputLabel>
        <Select style={{width: '100%',textAlign: 'left'}}
                              labelId ="user_id"
                              id="user_id"
                              value={social_connections.user_id}
                              onChange ={(e)=>{setSocial_Connections({...social_connections,user_id:e.target.value});checkErrors()}}>
                              {users.map((key)=><MenuItem key={key.id} value={key.id}>{key.password}</MenuItem>)}
                          </Select>
    </Grid>
<Grid xs={12}  md={6} item key={"10"}>
<Grid container justify={"flex-end"} alignContent={"flex-end"}>
<Button onClick={() => history.push('/social_connections')} variant={"contained"} type={"Button"} color="secondary">Cancel</Button>
</Grid>
</Grid>
<Grid xs={12}  md={6} item key={"11"}>
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

export default withRouter(Social_ConnectionsAddUpdatePage)
