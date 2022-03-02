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
import {addProfiles, getProfiles,getOneProfiles, updateProfiles} from "../../repo/profilesRepo";


import {getUsers} from "../../repo/usersRepo";



function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
function validateEmail(email){
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
const ProfilesAddUpdatePage = (props)=>{
    const [alertState, setAlertstate] = useState({
        open: false,
        vertical: 'bottom',
        horizontal: 'center',
        severity: "success",
        message:"",
      });
    const { vertical, horizontal, open, severity, message } = alertState;
    const [errorMessages, setErrorMessages] = useState({});
    const [profiles,setProfiles] = useState(undefined);
    const [loading, setLoading] = useState(false);
    const [users,setUsers] = useState(undefined)


    const checkErrors = () => {
        let errorList = {}
        if(profiles.user_id === "" || profiles.user_id === undefined)
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
            getOneProfiles(props.match.params.id).then((res) => {
                setProfiles(res.data.data);
                setLoading(false);
            })
        }else{
            setProfiles({})
        }
    },[props.match.params.id])
   

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
        const errors = checkErrors()
        //if no errors then send data
        if(Object.keys(errors).length<1) {
            if (profiles.id) {
            setLoading(true);
               var updateResponse =  await updateProfiles(profiles.id,profiles);
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
                var addResponse = await addProfiles(profiles);
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
        <PageTemplate title="Add/Update Profiles">
            <Card>
            <CardContent>
                <form onSubmit={handleSubmit} noValidate autoComplete="off">
               
                    {(profiles!==undefined  && users!==undefined)?
                        <Grid spacing={3} container>
                           <Grid xs={12} md={6} key={"1"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.works}
type ={"text"}
onChange={(e)=>{setProfiles({...profiles,works:e.target.value});checkErrors()}}
defaultValue ={profiles.works}
error ={(errorMessages.works)?true:false}
label ={"works"}/>
</ Grid >
<Grid xs={12} md={6} key={"2"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.address}
type ={"text"}
onChange={(e)=>{setProfiles({...profiles,address:e.target.value});checkErrors()}}
defaultValue ={profiles.address}
error ={(errorMessages.address)?true:false}
label ={"address"}/>
</ Grid >
<Grid xs={12} md={6} key={"3"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.school}
type ={"text"}
onChange={(e)=>{setProfiles({...profiles,school:e.target.value});checkErrors()}}
defaultValue ={profiles.school}
error ={(errorMessages.school)?true:false}
label ={"school"}/>
</ Grid >
<Grid xs={12} md={6} key={"4"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.language}
type ={"text"}
onChange={(e)=>{setProfiles({...profiles,language:e.target.value});checkErrors()}}
defaultValue ={profiles.language}
error ={(errorMessages.language)?true:false}
label ={"language"}/>
</ Grid >
<Grid xs={12} md={6} key={"5"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.about_me}
type ={"text"}
onChange={(e)=>{setProfiles({...profiles,about_me:e.target.value});checkErrors()}}
defaultValue ={profiles.about_me}
error ={(errorMessages.about_me)?true:false}
label ={"about_me"}/>
</ Grid >
<Grid xs={12} md={6} key={"6"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.original_image_path}
type ={"text"}
onChange={(e)=>{setProfiles({...profiles,original_image_path:e.target.value});checkErrors()}}
defaultValue ={profiles.original_image_path}
error ={(errorMessages.original_image_path)?true:false}
label ={"original_image_path"}/>
</ Grid >
<Grid xs={12} md={6} key={"7"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.profile_photo}
type ={"text"}
onChange={(e)=>{setProfiles({...profiles,profile_photo:e.target.value});checkErrors()}}
defaultValue ={profiles.profile_photo}
error ={(errorMessages.profile_photo)?true:false}
label ={"profile_photo"}/>
</ Grid >
<Grid xs={12} md={6} key={"8"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.profile_photo_header}
type ={"text"}
onChange={(e)=>{setProfiles({...profiles,profile_photo_header:e.target.value});checkErrors()}}
defaultValue ={profiles.profile_photo_header}
error ={(errorMessages.profile_photo_header)?true:false}
label ={"profile_photo_header"}/>
</ Grid >
<Grid xs={12} md={6} key={"9"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.created_at}
type ={"datetime-local"}
InputLabelProps ={{ shrink: true, }}
onChange={(e)=>{setProfiles({...profiles,created_at:e.target.value});checkErrors()}}
defaultValue ={profiles.created_at}
error ={(errorMessages.created_at)?true:false}
label ={"created_at"}/>
</ Grid >
<Grid xs={12} md={6} key={"10"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.updated_at}
type ={"datetime-local"}
InputLabelProps ={{ shrink: true, }}
onChange={(e)=>{setProfiles({...profiles,updated_at:e.target.value});checkErrors()}}
defaultValue ={profiles.updated_at}
error ={(errorMessages.updated_at)?true:false}
label ={"updated_at"}/>
</ Grid >
<Grid xs={12} md={6} key={"11"} item >
<InputLabel style={{textAlign: 'left'}}>user_id</InputLabel>
        <Select style={{width: '100%',textAlign: 'left'}}
                              labelId ="user_id"
                              id="user_id"
                              value={profiles.user_id}
                              onChange ={(e)=>{setProfiles({...profiles,user_id:e.target.value});checkErrors()}}>
                              {users.map((key)=><MenuItem key={key.id} value={key.id}>{key.password}</MenuItem>)}
                          </Select>
    </Grid>
<Grid xs={12}  md={6} item key={"12"}>
<Grid container justify={"flex-end"} alignContent={"flex-end"}>
<Button onClick={() => history.push('/profiles')} variant={"contained"} type={"Button"} color="secondary">Cancel</Button>
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

export default withRouter(ProfilesAddUpdatePage)
