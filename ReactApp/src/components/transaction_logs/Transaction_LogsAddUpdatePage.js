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
import {addTransaction_Logs, getTransaction_Logs,getOneTransaction_Logs, updateTransaction_Logs} from "../../repo/transaction_logsRepo";





function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
function validateEmail(email){
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
const Transaction_LogsAddUpdatePage = (props)=>{
    const [alertState, setAlertstate] = useState({
        open: false,
        vertical: 'bottom',
        horizontal: 'center',
        severity: "success",
        message:"",
      });
    const { vertical, horizontal, open, severity, message } = alertState;
    const [errorMessages, setErrorMessages] = useState({});
    const [transaction_logs,setTransaction_Logs] = useState(undefined);
    const [loading, setLoading] = useState(false);
    

    const checkErrors = () => {
        let errorList = {}
        if(transaction_logs.trip_id === "" || transaction_logs.trip_id === undefined)
{
   errorList = { ...errorList,trip_id: "Required field!"}
}
if(transaction_logs.trip_bill_id === "" || transaction_logs.trip_bill_id === undefined)
{
   errorList = { ...errorList,trip_bill_id: "Required field!"}
}
if(transaction_logs.user_id === "" || transaction_logs.user_id === undefined)
{
   errorList = { ...errorList,user_id: "Required field!"}
}


        setErrorMessages(errorList)
        return errorList
    }

    useEffect(()=>{
     setLoading(true);
    
      
        if(props.match.params.id) {
            setLoading(true);
            getOneTransaction_Logs(props.match.params.id).then((res) => {
                setTransaction_Logs(res.data.data);
                setLoading(false);
            })
        }else{
            setTransaction_Logs({})
        }
    },[props.match.params.id])
   

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
        const errors = checkErrors()
        //if no errors then send data
        if(Object.keys(errors).length<1) {
            if (transaction_logs.id) {
            setLoading(true);
               var updateResponse =  await updateTransaction_Logs(transaction_logs.id,transaction_logs);
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
                var addResponse = await addTransaction_Logs(transaction_logs);
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
        <PageTemplate title="Add/Update Transaction_Logs">
            <Card>
            <CardContent>
                <form onSubmit={handleSubmit} noValidate autoComplete="off">
               
                    {(transaction_logs!==undefined )?
                        <Grid spacing={3} container>
                           <Grid xs={12} md={6} key={"0"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.trip_id}
type ={"text"}
onChange={(e)=>{setTransaction_Logs({...transaction_logs,trip_id:e.target.value});checkErrors()}}
defaultValue ={transaction_logs.trip_id}
error ={(errorMessages.trip_id)?true:false}
label ={"trip_id"}/>
</ Grid >
<Grid xs={12} md={6} key={"1"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.trip_bill_id}
type ={"text"}
onChange={(e)=>{setTransaction_Logs({...transaction_logs,trip_bill_id:e.target.value});checkErrors()}}
defaultValue ={transaction_logs.trip_bill_id}
error ={(errorMessages.trip_bill_id)?true:false}
label ={"trip_bill_id"}/>
</ Grid >
<Grid xs={12} md={6} key={"2"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.user_id}
type ={"text"}
onChange={(e)=>{setTransaction_Logs({...transaction_logs,user_id:e.target.value});checkErrors()}}
defaultValue ={transaction_logs.user_id}
error ={(errorMessages.user_id)?true:false}
label ={"user_id"}/>
</ Grid >
<Grid xs={12} md={6} key={"3"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.device_os_version}
type ={"text"}
onChange={(e)=>{setTransaction_Logs({...transaction_logs,device_os_version:e.target.value});checkErrors()}}
defaultValue ={transaction_logs.device_os_version}
error ={(errorMessages.device_os_version)?true:false}
label ={"device_os_version"}/>
</ Grid >
<Grid xs={12} md={6} key={"4"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.app_version}
type ={"text"}
onChange={(e)=>{setTransaction_Logs({...transaction_logs,app_version:e.target.value});checkErrors()}}
defaultValue ={transaction_logs.app_version}
error ={(errorMessages.app_version)?true:false}
label ={"app_version"}/>
</ Grid >
<Grid xs={12} md={6} key={"5"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.payment_sdk_version}
type ={"text"}
onChange={(e)=>{setTransaction_Logs({...transaction_logs,payment_sdk_version:e.target.value});checkErrors()}}
defaultValue ={transaction_logs.payment_sdk_version}
error ={(errorMessages.payment_sdk_version)?true:false}
label ={"payment_sdk_version"}/>
</ Grid >
<Grid xs={12} md={6} key={"6"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.error_message}
type ={"text"}
onChange={(e)=>{setTransaction_Logs({...transaction_logs,error_message:e.target.value});checkErrors()}}
defaultValue ={transaction_logs.error_message}
error ={(errorMessages.error_message)?true:false}
label ={"error_message"}/>
</ Grid >
<Grid xs={12} md={6} key={"7"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.error_code}
type ={"text"}
onChange={(e)=>{setTransaction_Logs({...transaction_logs,error_code:e.target.value});checkErrors()}}
defaultValue ={transaction_logs.error_code}
error ={(errorMessages.error_code)?true:false}
label ={"error_code"}/>
</ Grid >
<Grid xs={12} md={6} key={"8"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.error_id}
type ={"text"}
onChange={(e)=>{setTransaction_Logs({...transaction_logs,error_id:e.target.value});checkErrors()}}
defaultValue ={transaction_logs.error_id}
error ={(errorMessages.error_id)?true:false}
label ={"error_id"}/>
</ Grid >
<Grid xs={12} md={6} key={"9"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.stack_trace}
type ={"text"}
onChange={(e)=>{setTransaction_Logs({...transaction_logs,stack_trace:e.target.value});checkErrors()}}
defaultValue ={transaction_logs.stack_trace}
error ={(errorMessages.stack_trace)?true:false}
label ={"stack_trace"}/>
</ Grid >
<Grid xs={12} md={6} key={"10"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.amount}
type ={"text"}
onChange={(e)=>{setTransaction_Logs({...transaction_logs,amount:e.target.value});checkErrors()}}
defaultValue ={transaction_logs.amount}
error ={(errorMessages.amount)?true:false}
label ={"amount"}/>
</ Grid >
<Grid xs={12} md={6} key={"11"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.currency}
type ={"text"}
onChange={(e)=>{setTransaction_Logs({...transaction_logs,currency:e.target.value});checkErrors()}}
defaultValue ={transaction_logs.currency}
error ={(errorMessages.currency)?true:false}
label ={"currency"}/>
</ Grid >
<Grid xs={12} md={6} key={"12"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.cart_id}
type ={"text"}
onChange={(e)=>{setTransaction_Logs({...transaction_logs,cart_id:e.target.value});checkErrors()}}
defaultValue ={transaction_logs.cart_id}
error ={(errorMessages.cart_id)?true:false}
label ={"cart_id"}/>
</ Grid >
<Grid xs={12} md={6} key={"13"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.transaction_class}
type ={"text"}
onChange={(e)=>{setTransaction_Logs({...transaction_logs,transaction_class:e.target.value});checkErrors()}}
defaultValue ={transaction_logs.transaction_class}
error ={(errorMessages.transaction_class)?true:false}
label ={"transaction_class"}/>
</ Grid >
<Grid xs={12} md={6} key={"14"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.transaction_type}
type ={"text"}
onChange={(e)=>{setTransaction_Logs({...transaction_logs,transaction_type:e.target.value});checkErrors()}}
defaultValue ={transaction_logs.transaction_type}
error ={(errorMessages.transaction_type)?true:false}
label ={"transaction_type"}/>
</ Grid >
<Grid xs={12} md={6} key={"15"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.transaction_first_reference}
type ={"text"}
onChange={(e)=>{setTransaction_Logs({...transaction_logs,transaction_first_reference:e.target.value});checkErrors()}}
defaultValue ={transaction_logs.transaction_first_reference}
error ={(errorMessages.transaction_first_reference)?true:false}
label ={"transaction_first_reference"}/>
</ Grid >
<Grid xs={12} md={6} key={"16"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.test_mode}
type ={"number"}
onChange={(e)=>{setTransaction_Logs({...transaction_logs,test_mode:e.target.value});checkErrors()}}
defaultValue ={transaction_logs.test_mode}
error ={(errorMessages.test_mode)?true:false}
label ={"test_mode"}/>
</ Grid >
<Grid xs={12} md={6} key={"17"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.transaction_time}
type ={"number"}
onChange={(e)=>{setTransaction_Logs({...transaction_logs,transaction_time:e.target.value});checkErrors()}}
defaultValue ={transaction_logs.transaction_time}
error ={(errorMessages.transaction_time)?true:false}
label ={"transaction_time"}/>
</ Grid >
<Grid xs={12} md={6} key={"18"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.city}
type ={"text"}
onChange={(e)=>{setTransaction_Logs({...transaction_logs,city:e.target.value});checkErrors()}}
defaultValue ={transaction_logs.city}
error ={(errorMessages.city)?true:false}
label ={"city"}/>
</ Grid >
<Grid xs={12} md={6} key={"19"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.country}
type ={"text"}
onChange={(e)=>{setTransaction_Logs({...transaction_logs,country:e.target.value});checkErrors()}}
defaultValue ={transaction_logs.country}
error ={(errorMessages.country)?true:false}
label ={"country"}/>
</ Grid >
<Grid xs={12} md={6} key={"20"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.region}
type ={"text"}
onChange={(e)=>{setTransaction_Logs({...transaction_logs,region:e.target.value});checkErrors()}}
defaultValue ={transaction_logs.region}
error ={(errorMessages.region)?true:false}
label ={"region"}/>
</ Grid >
<Grid xs={12} md={6} key={"21"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.street_address}
type ={"text"}
onChange={(e)=>{setTransaction_Logs({...transaction_logs,street_address:e.target.value});checkErrors()}}
defaultValue ={transaction_logs.street_address}
error ={(errorMessages.street_address)?true:false}
label ={"street_address"}/>
</ Grid >
<Grid xs={12} md={6} key={"22"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.first_name}
type ={"text"}
onChange={(e)=>{setTransaction_Logs({...transaction_logs,first_name:e.target.value});checkErrors()}}
defaultValue ={transaction_logs.first_name}
error ={(errorMessages.first_name)?true:false}
label ={"first_name"}/>
</ Grid >
<Grid xs={12} md={6} key={"23"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.last_name}
type ={"text"}
onChange={(e)=>{setTransaction_Logs({...transaction_logs,last_name:e.target.value});checkErrors()}}
defaultValue ={transaction_logs.last_name}
error ={(errorMessages.last_name)?true:false}
label ={"last_name"}/>
</ Grid >
<Grid xs={12} md={6} key={"24"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.title}
type ={"text"}
onChange={(e)=>{setTransaction_Logs({...transaction_logs,title:e.target.value});checkErrors()}}
defaultValue ={transaction_logs.title}
error ={(errorMessages.title)?true:false}
label ={"title"}/>
</ Grid >
<Grid xs={12} md={6} key={"25"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.email}
type ={"email"}
onChange={(e)=>{setTransaction_Logs({...transaction_logs,email:e.target.value});checkErrors()}}
defaultValue ={transaction_logs.email}
error ={(errorMessages.email)?true:false}
label ={"email"}/>
</ Grid >
<Grid xs={12} md={6} key={"26"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.device_manufacturer}
type ={"text"}
onChange={(e)=>{setTransaction_Logs({...transaction_logs,device_manufacturer:e.target.value});checkErrors()}}
defaultValue ={transaction_logs.device_manufacturer}
error ={(errorMessages.device_manufacturer)?true:false}
label ={"device_manufacturer"}/>
</ Grid >
<Grid xs={12} md={6} key={"27"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.device_model}
type ={"text"}
onChange={(e)=>{setTransaction_Logs({...transaction_logs,device_model:e.target.value});checkErrors()}}
defaultValue ={transaction_logs.device_model}
error ={(errorMessages.device_model)?true:false}
label ={"device_model"}/>
</ Grid >
<Grid xs={12} md={6} key={"28"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.device_longitude}
type ={"text"}
onChange={(e)=>{setTransaction_Logs({...transaction_logs,device_longitude:e.target.value});checkErrors()}}
defaultValue ={transaction_logs.device_longitude}
error ={(errorMessages.device_longitude)?true:false}
label ={"device_longitude"}/>
</ Grid >
<Grid xs={12} md={6} key={"29"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.device_latitude}
type ={"text"}
onChange={(e)=>{setTransaction_Logs({...transaction_logs,device_latitude:e.target.value});checkErrors()}}
defaultValue ={transaction_logs.device_latitude}
error ={(errorMessages.device_latitude)?true:false}
label ={"device_latitude"}/>
</ Grid >
<Grid xs={12} md={6} key={"30"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.app_id}
type ={"text"}
onChange={(e)=>{setTransaction_Logs({...transaction_logs,app_id:e.target.value});checkErrors()}}
defaultValue ={transaction_logs.app_id}
error ={(errorMessages.app_id)?true:false}
label ={"app_id"}/>
</ Grid >
<Grid xs={12} md={6} key={"31"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.app_name}
type ={"text"}
onChange={(e)=>{setTransaction_Logs({...transaction_logs,app_name:e.target.value});checkErrors()}}
defaultValue ={transaction_logs.app_name}
error ={(errorMessages.app_name)?true:false}
label ={"app_name"}/>
</ Grid >
<Grid xs={12} md={6} key={"32"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.store_id}
type ={"text"}
onChange={(e)=>{setTransaction_Logs({...transaction_logs,store_id:e.target.value});checkErrors()}}
defaultValue ={transaction_logs.store_id}
error ={(errorMessages.store_id)?true:false}
label ={"store_id"}/>
</ Grid >
<Grid xs={12} md={6} key={"33"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.auth_key}
type ={"text"}
onChange={(e)=>{setTransaction_Logs({...transaction_logs,auth_key:e.target.value});checkErrors()}}
defaultValue ={transaction_logs.auth_key}
error ={(errorMessages.auth_key)?true:false}
label ={"auth_key"}/>
</ Grid >
<Grid xs={12} md={6} key={"34"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.created_at}
type ={"datetime-local"}
InputLabelProps ={{ shrink: true, }}
onChange={(e)=>{setTransaction_Logs({...transaction_logs,created_at:e.target.value});checkErrors()}}
defaultValue ={transaction_logs.created_at}
error ={(errorMessages.created_at)?true:false}
label ={"created_at"}/>
</ Grid >
<Grid xs={12} md={6} key={"35"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.updated_at}
type ={"datetime-local"}
InputLabelProps ={{ shrink: true, }}
onChange={(e)=>{setTransaction_Logs({...transaction_logs,updated_at:e.target.value});checkErrors()}}
defaultValue ={transaction_logs.updated_at}
error ={(errorMessages.updated_at)?true:false}
label ={"updated_at"}/>
</ Grid >
<Grid xs={12}  md={6} item key={"36"}>
<Grid container justify={"flex-end"} alignContent={"flex-end"}>
<Button onClick={() => history.push('/transaction_logs')} variant={"contained"} type={"Button"} color="secondary">Cancel</Button>
</Grid>
</Grid>
<Grid xs={12}  md={6} item key={"37"}>
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

export default withRouter(Transaction_LogsAddUpdatePage)
