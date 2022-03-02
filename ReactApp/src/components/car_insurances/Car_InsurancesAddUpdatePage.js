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
import {addCar_Insurances, getCar_Insurances,getOneCar_Insurances, updateCar_Insurances} from "../../repo/car_insurancesRepo";


import {getCars} from "../../repo/carsRepo";



function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
function validateEmail(email){
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
const Car_InsurancesAddUpdatePage = (props)=>{
    const [alertState, setAlertstate] = useState({
        open: false,
        vertical: 'bottom',
        horizontal: 'center',
        severity: "success",
        message:"",
      });
    const { vertical, horizontal, open, severity, message } = alertState;
    const [errorMessages, setErrorMessages] = useState({});
    const [car_insurances,setCar_Insurances] = useState(undefined);
    const [loading, setLoading] = useState(false);
    const [cars,setCars] = useState(undefined)


    const checkErrors = () => {
        let errorList = {}
        if(car_insurances.car_id === "" || car_insurances.car_id === undefined)
{
   errorList = { ...errorList,car_id: "Required field!"}
}
if(car_insurances.policy_number === "" || car_insurances.policy_number === undefined)
{
   errorList = { ...errorList,policy_number: "Required field!"}
}
if(car_insurances.detectable_amount === "" || car_insurances.detectable_amount === undefined)
{
   errorList = { ...errorList,detectable_amount: "Required field!"}
}
if(car_insurances.image_policy_card === "" || car_insurances.image_policy_card === undefined)
{
   errorList = { ...errorList,image_policy_card: "Required field!"}
}
if(car_insurances.small_image_policy_card === "" || car_insurances.small_image_policy_card === undefined)
{
   errorList = { ...errorList,small_image_policy_card: "Required field!"}
}


        setErrorMessages(errorList)
        return errorList
    }

    useEffect(()=>{
     setLoading(true);
    getCars(0,200,"").then((res)=>{ setCars(res.data); setLoading(false); })

      
        if(props.match.params.id) {
            setLoading(true);
            getOneCar_Insurances(props.match.params.id).then((res) => {
                setCar_Insurances(res.data.data);
                setLoading(false);
            })
        }else{
            setCar_Insurances({})
        }
    },[props.match.params.id])
   

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
        const errors = checkErrors()
        //if no errors then send data
        if(Object.keys(errors).length<1) {
            if (car_insurances.id) {
            setLoading(true);
               var updateResponse =  await updateCar_Insurances(car_insurances.id,car_insurances);
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
                var addResponse = await addCar_Insurances(car_insurances);
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
        <PageTemplate title="Add/Update Car_Insurances">
            <Card>
            <CardContent>
                <form onSubmit={handleSubmit} noValidate autoComplete="off">
               
                    {(car_insurances!==undefined  && cars!==undefined)?
                        <Grid spacing={3} container>
                           <Grid xs={12} md={6} key={"1"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.policy_number}
type ={"text"}
onChange={(e)=>{setCar_Insurances({...car_insurances,policy_number:e.target.value});checkErrors()}}
defaultValue ={car_insurances.policy_number}
error ={(errorMessages.policy_number)?true:false}
label ={"policy_number"}/>
</ Grid >
<Grid xs={12} md={6} key={"2"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.detectable_amount}
type ={"text"}
onChange={(e)=>{setCar_Insurances({...car_insurances,detectable_amount:e.target.value});checkErrors()}}
defaultValue ={car_insurances.detectable_amount}
error ={(errorMessages.detectable_amount)?true:false}
label ={"detectable_amount"}/>
</ Grid >
<Grid xs={12} md={6} key={"3"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.expiration_date}
type ={"text"}
onChange={(e)=>{setCar_Insurances({...car_insurances,expiration_date:e.target.value});checkErrors()}}
defaultValue ={car_insurances.expiration_date}
error ={(errorMessages.expiration_date)?true:false}
label ={"expiration_date"}/>
</ Grid >
<Grid xs={12} md={6} key={"4"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.date_of_issue}
type ={"text"}
onChange={(e)=>{setCar_Insurances({...car_insurances,date_of_issue:e.target.value});checkErrors()}}
defaultValue ={car_insurances.date_of_issue}
error ={(errorMessages.date_of_issue)?true:false}
label ={"date_of_issue"}/>
</ Grid >
<Grid xs={12} md={6} key={"5"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.expired}
type ={"number"}
onChange={(e)=>{setCar_Insurances({...car_insurances,expired:e.target.value});checkErrors()}}
defaultValue ={car_insurances.expired}
error ={(errorMessages.expired)?true:false}
label ={"expired"}/>
</ Grid >
<Grid xs={12} md={6} key={"6"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.image_policy_card}
type ={"text"}
onChange={(e)=>{setCar_Insurances({...car_insurances,image_policy_card:e.target.value});checkErrors()}}
defaultValue ={car_insurances.image_policy_card}
error ={(errorMessages.image_policy_card)?true:false}
label ={"image_policy_card"}/>
</ Grid >
<Grid xs={12} md={6} key={"7"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.small_image_policy_card}
type ={"text"}
onChange={(e)=>{setCar_Insurances({...car_insurances,small_image_policy_card:e.target.value});checkErrors()}}
defaultValue ={car_insurances.small_image_policy_card}
error ={(errorMessages.small_image_policy_card)?true:false}
label ={"small_image_policy_card"}/>
</ Grid >
<Grid xs={12} md={6} key={"8"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.created_at}
type ={"datetime-local"}
InputLabelProps ={{ shrink: true, }}
onChange={(e)=>{setCar_Insurances({...car_insurances,created_at:e.target.value});checkErrors()}}
defaultValue ={car_insurances.created_at}
error ={(errorMessages.created_at)?true:false}
label ={"created_at"}/>
</ Grid >
<Grid xs={12} md={6} key={"9"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.updated_at}
type ={"datetime-local"}
InputLabelProps ={{ shrink: true, }}
onChange={(e)=>{setCar_Insurances({...car_insurances,updated_at:e.target.value});checkErrors()}}
defaultValue ={car_insurances.updated_at}
error ={(errorMessages.updated_at)?true:false}
label ={"updated_at"}/>
</ Grid >
<Grid xs={12} md={6} key={"10"} item >
<InputLabel style={{textAlign: 'left'}}>car_id</InputLabel>
        <Select style={{width: '100%',textAlign: 'left'}}
                              labelId ="car_id"
                              id="car_id"
                              value={car_insurances.car_id}
                              onChange ={(e)=>{setCar_Insurances({...car_insurances,car_id:e.target.value});checkErrors()}}>
                              {cars.map((key)=><MenuItem key={key.id} value={key.id}>{key.long_location}</MenuItem>)}
                          </Select>
    </Grid>
<Grid xs={12}  md={6} item key={"11"}>
<Grid container justify={"flex-end"} alignContent={"flex-end"}>
<Button onClick={() => history.push('/car_insurances')} variant={"contained"} type={"Button"} color="secondary">Cancel</Button>
</Grid>
</Grid>
<Grid xs={12}  md={6} item key={"12"}>
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

export default withRouter(Car_InsurancesAddUpdatePage)
