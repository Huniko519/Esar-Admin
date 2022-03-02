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
import {addCountry_Currencies, getCountry_Currencies,getOneCountry_Currencies, updateCountry_Currencies} from "../../repo/country_currenciesRepo";





function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
function validateEmail(email){
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
const Country_CurrenciesAddUpdatePage = (props)=>{
    const [alertState, setAlertstate] = useState({
        open: false,
        vertical: 'bottom',
        horizontal: 'center',
        severity: "success",
        message:"",
      });
    const { vertical, horizontal, open, severity, message } = alertState;
    const [errorMessages, setErrorMessages] = useState({});
    const [country_currencies,setCountry_Currencies] = useState(undefined);
    const [loading, setLoading] = useState(false);
    

    const checkErrors = () => {
        let errorList = {}
        if(country_currencies.country === "" || country_currencies.country === undefined)
{
   errorList = { ...errorList,country: "Required field!"}
}
if(country_currencies.currency === "" || country_currencies.currency === undefined)
{
   errorList = { ...errorList,currency: "Required field!"}
}
if(country_currencies.code === "" || country_currencies.code === undefined)
{
   errorList = { ...errorList,code: "Required field!"}
}


        setErrorMessages(errorList)
        return errorList
    }

    useEffect(()=>{
     setLoading(true);
    
      
        if(props.match.params.id) {
            setLoading(true);
            getOneCountry_Currencies(props.match.params.id).then((res) => {
                setCountry_Currencies(res.data.data);
                setLoading(false);
            })
        }else{
            setCountry_Currencies({})
        }
    },[props.match.params.id])
   

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
        const errors = checkErrors()
        //if no errors then send data
        if(Object.keys(errors).length<1) {
            if (country_currencies.id) {
            setLoading(true);
               var updateResponse =  await updateCountry_Currencies(country_currencies.id,country_currencies);
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
                var addResponse = await addCountry_Currencies(country_currencies);
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
        <PageTemplate title="Add/Update Country_Currencies">
            <Card>
            <CardContent>
                <form onSubmit={handleSubmit} noValidate autoComplete="off">
               
                    {(country_currencies!==undefined )?
                        <Grid spacing={3} container>
                           <Grid xs={12} md={6} key={"0"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.country}
type ={"text"}
onChange={(e)=>{setCountry_Currencies({...country_currencies,country:e.target.value});checkErrors()}}
defaultValue ={country_currencies.country}
error ={(errorMessages.country)?true:false}
label ={"country"}/>
</ Grid >
<Grid xs={12} md={6} key={"1"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.arabic_country}
type ={"text"}
onChange={(e)=>{setCountry_Currencies({...country_currencies,arabic_country:e.target.value});checkErrors()}}
defaultValue ={country_currencies.arabic_country}
error ={(errorMessages.arabic_country)?true:false}
label ={"arabic_country"}/>
</ Grid >
<Grid xs={12} md={6} key={"2"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.currency}
type ={"text"}
onChange={(e)=>{setCountry_Currencies({...country_currencies,currency:e.target.value});checkErrors()}}
defaultValue ={country_currencies.currency}
error ={(errorMessages.currency)?true:false}
label ={"currency"}/>
</ Grid >
<Grid xs={12} md={6} key={"3"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.arabic_currency}
type ={"text"}
onChange={(e)=>{setCountry_Currencies({...country_currencies,arabic_currency:e.target.value});checkErrors()}}
defaultValue ={country_currencies.arabic_currency}
error ={(errorMessages.arabic_currency)?true:false}
label ={"arabic_currency"}/>
</ Grid >
<Grid xs={12} md={6} key={"4"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.code}
type ={"text"}
onChange={(e)=>{setCountry_Currencies({...country_currencies,code:e.target.value});checkErrors()}}
defaultValue ={country_currencies.code}
error ={(errorMessages.code)?true:false}
label ={"code"}/>
</ Grid >
<Grid xs={12} md={6} key={"5"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.arabic_code}
type ={"text"}
onChange={(e)=>{setCountry_Currencies({...country_currencies,arabic_code:e.target.value});checkErrors()}}
defaultValue ={country_currencies.arabic_code}
error ={(errorMessages.arabic_code)?true:false}
label ={"arabic_code"}/>
</ Grid >
<Grid xs={12} md={6} key={"6"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.symbol}
type ={"text"}
onChange={(e)=>{setCountry_Currencies({...country_currencies,symbol:e.target.value});checkErrors()}}
defaultValue ={country_currencies.symbol}
error ={(errorMessages.symbol)?true:false}
label ={"symbol"}/>
</ Grid >
<Grid xs={12} md={6} key={"7"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.arabic_symbol}
type ={"text"}
onChange={(e)=>{setCountry_Currencies({...country_currencies,arabic_symbol:e.target.value});checkErrors()}}
defaultValue ={country_currencies.arabic_symbol}
error ={(errorMessages.arabic_symbol)?true:false}
label ={"arabic_symbol"}/>
</ Grid >
<Grid xs={12} md={6} key={"8"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.created_at}
type ={"datetime-local"}
InputLabelProps ={{ shrink: true, }}
onChange={(e)=>{setCountry_Currencies({...country_currencies,created_at:e.target.value});checkErrors()}}
defaultValue ={country_currencies.created_at}
error ={(errorMessages.created_at)?true:false}
label ={"created_at"}/>
</ Grid >
<Grid xs={12} md={6} key={"9"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.updated_at}
type ={"datetime-local"}
InputLabelProps ={{ shrink: true, }}
onChange={(e)=>{setCountry_Currencies({...country_currencies,updated_at:e.target.value});checkErrors()}}
defaultValue ={country_currencies.updated_at}
error ={(errorMessages.updated_at)?true:false}
label ={"updated_at"}/>
</ Grid >
<Grid xs={12}  md={6} item key={"10"}>
<Grid container justify={"flex-end"} alignContent={"flex-end"}>
<Button onClick={() => history.push('/country_currencies')} variant={"contained"} type={"Button"} color="secondary">Cancel</Button>
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

export default withRouter(Country_CurrenciesAddUpdatePage)
