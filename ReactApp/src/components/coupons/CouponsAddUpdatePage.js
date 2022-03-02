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
import {addCoupons, getCoupons,getOneCoupons, updateCoupons} from "../../repo/couponsRepo";





function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
function validateEmail(email){
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
const CouponsAddUpdatePage = (props)=>{
    const [alertState, setAlertstate] = useState({
        open: false,
        vertical: 'bottom',
        horizontal: 'center',
        severity: "success",
        message:"",
      });
    const { vertical, horizontal, open, severity, message } = alertState;
    const [errorMessages, setErrorMessages] = useState({});
    const [coupons,setCoupons] = useState(undefined);
    const [loading, setLoading] = useState(false);
    

    const checkErrors = () => {
        let errorList = {}
        if(coupons.name === "" || coupons.name === undefined)
{
   errorList = { ...errorList,name: "Required field!"}
}
if(coupons.uses_number === "" || coupons.uses_number === undefined)
{
   errorList = { ...errorList,uses_number: "Required field!"}
}
if(coupons.max_uses_user === "" || coupons.max_uses_user === undefined)
{
   errorList = { ...errorList,max_uses_user: "Required field!"}
}
if(coupons.discount_amount === "" || coupons.discount_amount === undefined)
{
   errorList = { ...errorList,discount_amount: "Required field!"}
}
if(coupons.is_fixed === "" || coupons.is_fixed === undefined)
{
   errorList = { ...errorList,is_fixed: "Required field!"}
}


        setErrorMessages(errorList)
        return errorList
    }

    useEffect(()=>{
     setLoading(true);
    
      
        if(props.match.params.id) {
            setLoading(true);
            getOneCoupons(props.match.params.id).then((res) => {
                setCoupons(res.data.data);
                setLoading(false);
            })
        }else{
            setCoupons({})
        }
    },[props.match.params.id])
   

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
        const errors = checkErrors()
        //if no errors then send data
        if(Object.keys(errors).length<1) {
            if (coupons.id) {
            setLoading(true);
               var updateResponse =  await updateCoupons(coupons.id,coupons);
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
                var addResponse = await addCoupons(coupons);
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
        <PageTemplate title="Add/Update Coupons">
            <Card>
            <CardContent>
                <form onSubmit={handleSubmit} noValidate autoComplete="off">
               
                    {(coupons!==undefined )?
                        <Grid spacing={3} container>
                           <Grid xs={12} md={6} key={"0"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.code}
type ={"text"}
onChange={(e)=>{setCoupons({...coupons,code:e.target.value});checkErrors()}}
defaultValue ={coupons.code}
error ={(errorMessages.code)?true:false}
label ={"code"}/>
</ Grid >
<Grid xs={12} md={6} key={"1"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.name}
type ={"text"}
onChange={(e)=>{setCoupons({...coupons,name:e.target.value});checkErrors()}}
defaultValue ={coupons.name}
error ={(errorMessages.name)?true:false}
label ={"name"}/>
</ Grid >
<Grid xs={12} md={6} key={"2"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.description}
type ={"text"}
onChange={(e)=>{setCoupons({...coupons,description:e.target.value});checkErrors()}}
defaultValue ={coupons.description}
error ={(errorMessages.description)?true:false}
label ={"description"}/>
</ Grid >
<Grid xs={12} md={6} key={"3"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.uses_number}
type ={"text"}
onChange={(e)=>{setCoupons({...coupons,uses_number:e.target.value});checkErrors()}}
defaultValue ={coupons.uses_number}
error ={(errorMessages.uses_number)?true:false}
label ={"uses_number"}/>
</ Grid >
<Grid xs={12} md={6} key={"4"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.max_uses}
type ={"text"}
onChange={(e)=>{setCoupons({...coupons,max_uses:e.target.value});checkErrors()}}
defaultValue ={coupons.max_uses}
error ={(errorMessages.max_uses)?true:false}
label ={"max_uses"}/>
</ Grid >
<Grid xs={12} md={6} key={"5"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.max_uses_user}
type ={"text"}
onChange={(e)=>{setCoupons({...coupons,max_uses_user:e.target.value});checkErrors()}}
defaultValue ={coupons.max_uses_user}
error ={(errorMessages.max_uses_user)?true:false}
label ={"max_uses_user"}/>
</ Grid >
<Grid xs={12} md={6} key={"6"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.type}
type ={"text"}
onChange={(e)=>{setCoupons({...coupons,type:e.target.value});checkErrors()}}
defaultValue ={coupons.type}
error ={(errorMessages.type)?true:false}
label ={"type"}/>
</ Grid >
<Grid xs={12} md={6} key={"7"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.discount_amount}
type ={"number"}
onChange={(e)=>{setCoupons({...coupons,discount_amount:e.target.value});checkErrors()}}
defaultValue ={coupons.discount_amount}
error ={(errorMessages.discount_amount)?true:false}
label ={"discount_amount"}/>
</ Grid >
<Grid xs={12} md={6} key={"8"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.is_fixed}
type ={"number"}
onChange={(e)=>{setCoupons({...coupons,is_fixed:e.target.value});checkErrors()}}
defaultValue ={coupons.is_fixed}
error ={(errorMessages.is_fixed)?true:false}
label ={"is_fixed"}/>
</ Grid >
<Grid xs={12} md={6} key={"11"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.created_at}
type ={"datetime-local"}
InputLabelProps ={{ shrink: true, }}
onChange={(e)=>{setCoupons({...coupons,created_at:e.target.value});checkErrors()}}
defaultValue ={coupons.created_at}
error ={(errorMessages.created_at)?true:false}
label ={"created_at"}/>
</ Grid >
<Grid xs={12} md={6} key={"12"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.updated_at}
type ={"datetime-local"}
InputLabelProps ={{ shrink: true, }}
onChange={(e)=>{setCoupons({...coupons,updated_at:e.target.value});checkErrors()}}
defaultValue ={coupons.updated_at}
error ={(errorMessages.updated_at)?true:false}
label ={"updated_at"}/>
</ Grid >
<Grid xs={12} md={6} key={"13"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.deleted_at}
type ={"datetime-local"}
InputLabelProps ={{ shrink: true, }}
onChange={(e)=>{setCoupons({...coupons,deleted_at:e.target.value});checkErrors()}}
defaultValue ={coupons.deleted_at}
error ={(errorMessages.deleted_at)?true:false}
label ={"deleted_at"}/>
</ Grid >
<Grid xs={12}  md={6} item key={"14"}>
<Grid container justify={"flex-end"} alignContent={"flex-end"}>
<Button onClick={() => history.push('/coupons')} variant={"contained"} type={"Button"} color="secondary">Cancel</Button>
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

export default withRouter(CouponsAddUpdatePage)
