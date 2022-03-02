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
import {addError_Logs, getError_Logs,getOneError_Logs, updateError_Logs} from "../../repo/error_logsRepo";





function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
function validateEmail(email){
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
const Error_LogsAddUpdatePage = (props)=>{
    const [alertState, setAlertstate] = useState({
        open: false,
        vertical: 'bottom',
        horizontal: 'center',
        severity: "success",
        message:"",
      });
    const { vertical, horizontal, open, severity, message } = alertState;
    const [errorMessages, setErrorMessages] = useState({});
    const [error_logs,setError_Logs] = useState(undefined);
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
            getOneError_Logs(props.match.params.id).then((res) => {
                setError_Logs(res.data.data);
                setLoading(false);
            })
        }else{
            setError_Logs({})
        }
    },[props.match.params.id])
   

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
        const errors = checkErrors()
        //if no errors then send data
        if(Object.keys(errors).length<1) {
            if (error_logs.id) {
            setLoading(true);
               var updateResponse =  await updateError_Logs(error_logs.id,error_logs);
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
                var addResponse = await addError_Logs(error_logs);
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
        <PageTemplate title="Add/Update Error_Logs">
            <Card>
            <CardContent>
                <form onSubmit={handleSubmit} noValidate autoComplete="off">
               
                    {(error_logs!==undefined )?
                        <Grid spacing={3} container>
                           <Grid xs={12} md={6} key={"0"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.request_uri}
type ={"text"}
onChange={(e)=>{setError_Logs({...error_logs,request_uri:e.target.value});checkErrors()}}
defaultValue ={error_logs.request_uri}
error ={(errorMessages.request_uri)?true:false}
label ={"request_uri"}/>
</ Grid >
<Grid xs={12} md={6} key={"1"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.redirect_uri}
type ={"text"}
onChange={(e)=>{setError_Logs({...error_logs,redirect_uri:e.target.value});checkErrors()}}
defaultValue ={error_logs.redirect_uri}
error ={(errorMessages.redirect_uri)?true:false}
label ={"redirect_uri"}/>
</ Grid >
<Grid xs={12} md={6} key={"2"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.referer}
type ={"text"}
onChange={(e)=>{setError_Logs({...error_logs,referer:e.target.value});checkErrors()}}
defaultValue ={error_logs.referer}
error ={(errorMessages.referer)?true:false}
label ={"referer"}/>
</ Grid >
<Grid xs={12} md={6} key={"3"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.user_agent}
type ={"text"}
onChange={(e)=>{setError_Logs({...error_logs,user_agent:e.target.value});checkErrors()}}
defaultValue ={error_logs.user_agent}
error ={(errorMessages.user_agent)?true:false}
label ={"user_agent"}/>
</ Grid >
<Grid xs={12} md={6} key={"4"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.status_code}
type ={"text"}
onChange={(e)=>{setError_Logs({...error_logs,status_code:e.target.value});checkErrors()}}
defaultValue ={error_logs.status_code}
error ={(errorMessages.status_code)?true:false}
label ={"status_code"}/>
</ Grid >
<Grid xs={12} md={6} key={"5"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.message}
type ={"text"}
onChange={(e)=>{setError_Logs({...error_logs,message:e.target.value});checkErrors()}}
defaultValue ={error_logs.message}
error ={(errorMessages.message)?true:false}
label ={"message"}/>
</ Grid >
<Grid xs={12} md={6} key={"6"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.file}
type ={"text"}
onChange={(e)=>{setError_Logs({...error_logs,file:e.target.value});checkErrors()}}
defaultValue ={error_logs.file}
error ={(errorMessages.file)?true:false}
label ={"file"}/>
</ Grid >
<Grid xs={12} md={6} key={"7"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.line}
type ={"text"}
onChange={(e)=>{setError_Logs({...error_logs,line:e.target.value});checkErrors()}}
defaultValue ={error_logs.line}
error ={(errorMessages.line)?true:false}
label ={"line"}/>
</ Grid >
<Grid xs={12} md={6} key={"8"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.code}
type ={"text"}
onChange={(e)=>{setError_Logs({...error_logs,code:e.target.value});checkErrors()}}
defaultValue ={error_logs.code}
error ={(errorMessages.code)?true:false}
label ={"code"}/>
</ Grid >
<Grid xs={12} md={6} key={"9"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.sql_error}
type ={"text"}
onChange={(e)=>{setError_Logs({...error_logs,sql_error:e.target.value});checkErrors()}}
defaultValue ={error_logs.sql_error}
error ={(errorMessages.sql_error)?true:false}
label ={"sql_error"}/>
</ Grid >
<Grid xs={12} md={6} key={"10"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.error_info}
type ={"text"}
onChange={(e)=>{setError_Logs({...error_logs,error_info:e.target.value});checkErrors()}}
defaultValue ={error_logs.error_info}
error ={(errorMessages.error_info)?true:false}
label ={"error_info"}/>
</ Grid >
<Grid xs={12} md={6} key={"11"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.model}
type ={"text"}
onChange={(e)=>{setError_Logs({...error_logs,model:e.target.value});checkErrors()}}
defaultValue ={error_logs.model}
error ={(errorMessages.model)?true:false}
label ={"model"}/>
</ Grid >
<Grid xs={12} md={6} key={"12"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.exception_trace}
type ={"text"}
onChange={(e)=>{setError_Logs({...error_logs,exception_trace:e.target.value});checkErrors()}}
defaultValue ={error_logs.exception_trace}
error ={(errorMessages.exception_trace)?true:false}
label ={"exception_trace"}/>
</ Grid >
<Grid xs={12} md={6} key={"13"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.headers}
type ={"text"}
onChange={(e)=>{setError_Logs({...error_logs,headers:e.target.value});checkErrors()}}
defaultValue ={error_logs.headers}
error ={(errorMessages.headers)?true:false}
label ={"headers"}/>
</ Grid >
<Grid xs={12} md={6} key={"14"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.ids}
type ={"text"}
onChange={(e)=>{setError_Logs({...error_logs,ids:e.target.value});checkErrors()}}
defaultValue ={error_logs.ids}
error ={(errorMessages.ids)?true:false}
label ={"ids"}/>
</ Grid >
<Grid xs={12} md={6} key={"15"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.exception_previous}
type ={"text"}
onChange={(e)=>{setError_Logs({...error_logs,exception_previous:e.target.value});checkErrors()}}
defaultValue ={error_logs.exception_previous}
error ={(errorMessages.exception_previous)?true:false}
label ={"exception_previous"}/>
</ Grid >
<Grid xs={12} md={6} key={"16"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.severity}
type ={"text"}
onChange={(e)=>{setError_Logs({...error_logs,severity:e.target.value});checkErrors()}}
defaultValue ={error_logs.severity}
error ={(errorMessages.severity)?true:false}
label ={"severity"}/>
</ Grid >
<Grid xs={12} md={6} key={"17"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.user_id}
type ={"number"}
onChange={(e)=>{setError_Logs({...error_logs,user_id:e.target.value});checkErrors()}}
defaultValue ={error_logs.user_id}
error ={(errorMessages.user_id)?true:false}
label ={"user_id"}/>
</ Grid >
<Grid xs={12} md={6} key={"18"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.car_id}
type ={"number"}
onChange={(e)=>{setError_Logs({...error_logs,car_id:e.target.value});checkErrors()}}
defaultValue ={error_logs.car_id}
error ={(errorMessages.car_id)?true:false}
label ={"car_id"}/>
</ Grid >
<Grid xs={12} md={6} key={"19"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.trip_id}
type ={"number"}
onChange={(e)=>{setError_Logs({...error_logs,trip_id:e.target.value});checkErrors()}}
defaultValue ={error_logs.trip_id}
error ={(errorMessages.trip_id)?true:false}
label ={"trip_id"}/>
</ Grid >
<Grid xs={12} md={6} key={"20"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.trip_bill_id}
type ={"number"}
onChange={(e)=>{setError_Logs({...error_logs,trip_bill_id:e.target.value});checkErrors()}}
defaultValue ={error_logs.trip_bill_id}
error ={(errorMessages.trip_bill_id)?true:false}
label ={"trip_bill_id"}/>
</ Grid >
<Grid xs={12} md={6} key={"21"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.chat_id}
type ={"number"}
onChange={(e)=>{setError_Logs({...error_logs,chat_id:e.target.value});checkErrors()}}
defaultValue ={error_logs.chat_id}
error ={(errorMessages.chat_id)?true:false}
label ={"chat_id"}/>
</ Grid >
<Grid xs={12} md={6} key={"22"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.created_at}
type ={"datetime-local"}
InputLabelProps ={{ shrink: true, }}
onChange={(e)=>{setError_Logs({...error_logs,created_at:e.target.value});checkErrors()}}
defaultValue ={error_logs.created_at}
error ={(errorMessages.created_at)?true:false}
label ={"created_at"}/>
</ Grid >
<Grid xs={12} md={6} key={"23"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.updated_at}
type ={"datetime-local"}
InputLabelProps ={{ shrink: true, }}
onChange={(e)=>{setError_Logs({...error_logs,updated_at:e.target.value});checkErrors()}}
defaultValue ={error_logs.updated_at}
error ={(errorMessages.updated_at)?true:false}
label ={"updated_at"}/>
</ Grid >
<Grid xs={12}  md={6} item key={"24"}>
<Grid container justify={"flex-end"} alignContent={"flex-end"}>
<Button onClick={() => history.push('/error_logs')} variant={"contained"} type={"Button"} color="secondary">Cancel</Button>
</Grid>
</Grid>
<Grid xs={12}  md={6} item key={"25"}>
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

export default withRouter(Error_LogsAddUpdatePage)
