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
import {addCar_Unlisteds, getCar_Unlisteds,getOneCar_Unlisteds, updateCar_Unlisteds} from "../../repo/car_unlistedsRepo";


import {getCars} from "../../repo/carsRepo";



function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
function validateEmail(email){
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
const Car_UnlistedsAddUpdatePage = (props)=>{
    const [alertState, setAlertstate] = useState({
        open: false,
        vertical: 'bottom',
        horizontal: 'center',
        severity: "success",
        message:"",
      });
    const { vertical, horizontal, open, severity, message } = alertState;
    const [errorMessages, setErrorMessages] = useState({});
    const [car_unlisteds,setCar_Unlisteds] = useState(undefined);
    const [loading, setLoading] = useState(false);
    const [cars,setCars] = useState(undefined)


    const checkErrors = () => {
        let errorList = {}
        if(car_unlisteds.car_id === "" || car_unlisteds.car_id === undefined)
{
   errorList = { ...errorList,car_id: "Required field!"}
}
if(car_unlisteds.car_status === "" || car_unlisteds.car_status === undefined)
{
   errorList = { ...errorList,car_status: "Required field!"}
}


        setErrorMessages(errorList)
        return errorList
    }

    useEffect(()=>{
     setLoading(true);
    getCars(0,200,"").then((res)=>{ setCars(res.data); setLoading(false); })

      
        if(props.match.params.id) {
            setLoading(true);
            getOneCar_Unlisteds(props.match.params.id).then((res) => {
                setCar_Unlisteds(res.data.data);
                setLoading(false);
            })
        }else{
            setCar_Unlisteds({})
        }
    },[props.match.params.id])
   

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
        const errors = checkErrors()
        //if no errors then send data
        if(Object.keys(errors).length<1) {
            if (car_unlisteds.id) {
            setLoading(true);
               var updateResponse =  await updateCar_Unlisteds(car_unlisteds.id,car_unlisteds);
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
                var addResponse = await addCar_Unlisteds(car_unlisteds);
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
        <PageTemplate title="Add/Update Car_Unlisteds">
            <Card>
            <CardContent>
                <form onSubmit={handleSubmit} noValidate autoComplete="off">
               
                    {(car_unlisteds!==undefined  && cars!==undefined)?
                        <Grid spacing={3} container>
                           <Grid xs={12} md={6} key={"1"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.car_status}
type ={"text"}
onChange={(e)=>{setCar_Unlisteds({...car_unlisteds,car_status:e.target.value});checkErrors()}}
defaultValue ={car_unlisteds.car_status}
error ={(errorMessages.car_status)?true:false}
label ={"car_status"}/>
</ Grid >
<Grid xs={12} md={6} key={"2"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.user_auto_delete}
type ={"number"}
onChange={(e)=>{setCar_Unlisteds({...car_unlisteds,user_auto_delete:e.target.value});checkErrors()}}
defaultValue ={car_unlisteds.user_auto_delete}
error ={(errorMessages.user_auto_delete)?true:false}
label ={"user_auto_delete"}/>
</ Grid >
<Grid xs={12} md={6} key={"3"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.admin_delete}
type ={"number"}
onChange={(e)=>{setCar_Unlisteds({...car_unlisteds,admin_delete:e.target.value});checkErrors()}}
defaultValue ={car_unlisteds.admin_delete}
error ={(errorMessages.admin_delete)?true:false}
label ={"admin_delete"}/>
</ Grid >
<Grid xs={12} md={6} key={"4"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.have_no_car}
type ={"number"}
onChange={(e)=>{setCar_Unlisteds({...car_unlisteds,have_no_car:e.target.value});checkErrors()}}
defaultValue ={car_unlisteds.have_no_car}
error ={(errorMessages.have_no_car)?true:false}
label ={"have_no_car"}/>
</ Grid >
<Grid xs={12} md={6} key={"5"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.safety_concerns}
type ={"number"}
onChange={(e)=>{setCar_Unlisteds({...car_unlisteds,safety_concerns:e.target.value});checkErrors()}}
defaultValue ={car_unlisteds.safety_concerns}
error ={(errorMessages.safety_concerns)?true:false}
label ={"safety_concerns"}/>
</ Grid >
<Grid xs={12} md={6} key={"6"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.not_earning_enough}
type ={"number"}
onChange={(e)=>{setCar_Unlisteds({...car_unlisteds,not_earning_enough:e.target.value});checkErrors()}}
defaultValue ={car_unlisteds.not_earning_enough}
error ={(errorMessages.not_earning_enough)?true:false}
label ={"not_earning_enough"}/>
</ Grid >
<Grid xs={12} md={6} key={"7"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.too_much_work}
type ={"number"}
onChange={(e)=>{setCar_Unlisteds({...car_unlisteds,too_much_work:e.target.value});checkErrors()}}
defaultValue ={car_unlisteds.too_much_work}
error ={(errorMessages.too_much_work)?true:false}
label ={"too_much_work"}/>
</ Grid >
<Grid xs={12} md={6} key={"8"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.negative_experience}
type ={"number"}
onChange={(e)=>{setCar_Unlisteds({...car_unlisteds,negative_experience:e.target.value});checkErrors()}}
defaultValue ={car_unlisteds.negative_experience}
error ={(errorMessages.negative_experience)?true:false}
label ={"negative_experience"}/>
</ Grid >
<Grid xs={12} md={6} key={"9"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.other_reason}
type ={"number"}
onChange={(e)=>{setCar_Unlisteds({...car_unlisteds,other_reason:e.target.value});checkErrors()}}
defaultValue ={car_unlisteds.other_reason}
error ={(errorMessages.other_reason)?true:false}
label ={"other_reason"}/>
</ Grid >
<Grid xs={12} md={6} key={"10"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.start_date}
type ={"datetime-local"}
InputLabelProps ={{ shrink: true, }}
onChange={(e)=>{setCar_Unlisteds({...car_unlisteds,start_date:e.target.value});checkErrors()}}
defaultValue ={car_unlisteds.start_date}
error ={(errorMessages.start_date)?true:false}
label ={"start_date"}/>
</ Grid >
<Grid xs={12} md={6} key={"11"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.end_date}
type ={"datetime-local"}
InputLabelProps ={{ shrink: true, }}
onChange={(e)=>{setCar_Unlisteds({...car_unlisteds,end_date:e.target.value});checkErrors()}}
defaultValue ={car_unlisteds.end_date}
error ={(errorMessages.end_date)?true:false}
label ={"end_date"}/>
</ Grid >
<Grid xs={12} md={6} key={"12"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.feedback}
type ={"text"}
onChange={(e)=>{setCar_Unlisteds({...car_unlisteds,feedback:e.target.value});checkErrors()}}
defaultValue ={car_unlisteds.feedback}
error ={(errorMessages.feedback)?true:false}
label ={"feedback"}/>
</ Grid >
<Grid xs={12} md={6} key={"13"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.created_at}
type ={"datetime-local"}
InputLabelProps ={{ shrink: true, }}
onChange={(e)=>{setCar_Unlisteds({...car_unlisteds,created_at:e.target.value});checkErrors()}}
defaultValue ={car_unlisteds.created_at}
error ={(errorMessages.created_at)?true:false}
label ={"created_at"}/>
</ Grid >
<Grid xs={12} md={6} key={"14"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.updated_at}
type ={"datetime-local"}
InputLabelProps ={{ shrink: true, }}
onChange={(e)=>{setCar_Unlisteds({...car_unlisteds,updated_at:e.target.value});checkErrors()}}
defaultValue ={car_unlisteds.updated_at}
error ={(errorMessages.updated_at)?true:false}
label ={"updated_at"}/>
</ Grid >
<Grid xs={12} md={6} key={"15"} item >
<InputLabel style={{textAlign: 'left'}}>car_id</InputLabel>
        <Select style={{width: '100%',textAlign: 'left'}}
                              labelId ="car_id"
                              id="car_id"
                              value={car_unlisteds.car_id}
                              onChange ={(e)=>{setCar_Unlisteds({...car_unlisteds,car_id:e.target.value});checkErrors()}}>
                              {cars.map((key)=><MenuItem key={key.id} value={key.id}>{key.long_location}</MenuItem>)}
                          </Select>
    </Grid>
<Grid xs={12}  md={6} item key={"16"}>
<Grid container justify={"flex-end"} alignContent={"flex-end"}>
<Button onClick={() => history.push('/car_unlisteds')} variant={"contained"} type={"Button"} color="secondary">Cancel</Button>
</Grid>
</Grid>
<Grid xs={12}  md={6} item key={"17"}>
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

export default withRouter(Car_UnlistedsAddUpdatePage)
