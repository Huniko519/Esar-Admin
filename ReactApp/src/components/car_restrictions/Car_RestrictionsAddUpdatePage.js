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
import {addCar_Restrictions, getCar_Restrictions,getOneCar_Restrictions, updateCar_Restrictions} from "../../repo/car_restrictionsRepo";


import {getCars} from "../../repo/carsRepo";



function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
function validateEmail(email){
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
const Car_RestrictionsAddUpdatePage = (props)=>{
    const [alertState, setAlertstate] = useState({
        open: false,
        vertical: 'bottom',
        horizontal: 'center',
        severity: "success",
        message:"",
      });
    const { vertical, horizontal, open, severity, message } = alertState;
    const [errorMessages, setErrorMessages] = useState({});
    const [car_restrictions,setCar_Restrictions] = useState(undefined);
    const [loading, setLoading] = useState(false);
    const [cars,setCars] = useState(undefined)


    const checkErrors = () => {
        let errorList = {}
        if(car_restrictions.car_id === "" || car_restrictions.car_id === undefined)
{
   errorList = { ...errorList,car_id: "Required field!"}
}


        setErrorMessages(errorList)
        return errorList
    }

    useEffect(()=>{
     setLoading(true);
    getCars(0,200,"").then((res)=>{ setCars(res.data); setLoading(false); })

      
        if(props.match.params.id) {
            setLoading(true);
            getOneCar_Restrictions(props.match.params.id).then((res) => {
                setCar_Restrictions(res.data.data);
                setLoading(false);
            })
        }else{
            setCar_Restrictions({})
        }
    },[props.match.params.id])
   

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
        const errors = checkErrors()
        //if no errors then send data
        if(Object.keys(errors).length<1) {
            if (car_restrictions.id) {
            setLoading(true);
               var updateResponse =  await updateCar_Restrictions(car_restrictions.id,car_restrictions);
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
                var addResponse = await addCar_Restrictions(car_restrictions);
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
        <PageTemplate title="Add/Update Car_Restrictions">
            <Card>
            <CardContent>
                <form onSubmit={handleSubmit} noValidate autoComplete="off">
               
                    {(car_restrictions!==undefined  && cars!==undefined)?
                        <Grid spacing={3} container>
                           <Grid xs={12} md={6} key={"1"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.km_per_day}
type ={"text"}
onChange={(e)=>{setCar_Restrictions({...car_restrictions,km_per_day:e.target.value});checkErrors()}}
defaultValue ={car_restrictions.km_per_day}
error ={(errorMessages.km_per_day)?true:false}
label ={"km_per_day"}/>
</ Grid >
<Grid xs={12} md={6} key={"2"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.km_per_week}
type ={"text"}
onChange={(e)=>{setCar_Restrictions({...car_restrictions,km_per_week:e.target.value});checkErrors()}}
defaultValue ={car_restrictions.km_per_week}
error ={(errorMessages.km_per_week)?true:false}
label ={"km_per_week"}/>
</ Grid >
<Grid xs={12} md={6} key={"3"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.km_per_month}
type ={"text"}
onChange={(e)=>{setCar_Restrictions({...car_restrictions,km_per_month:e.target.value});checkErrors()}}
defaultValue ={car_restrictions.km_per_month}
error ={(errorMessages.km_per_month)?true:false}
label ={"km_per_month"}/>
</ Grid >
<Grid xs={12} md={6} key={"4"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.price_per_km}
type ={"number"}
onChange={(e)=>{setCar_Restrictions({...car_restrictions,price_per_km:e.target.value});checkErrors()}}
defaultValue ={car_restrictions.price_per_km}
error ={(errorMessages.price_per_km)?true:false}
label ={"price_per_km"}/>
</ Grid >
<Grid xs={12} md={6} key={"5"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.created_at}
type ={"datetime-local"}
InputLabelProps ={{ shrink: true, }}
onChange={(e)=>{setCar_Restrictions({...car_restrictions,created_at:e.target.value});checkErrors()}}
defaultValue ={car_restrictions.created_at}
error ={(errorMessages.created_at)?true:false}
label ={"created_at"}/>
</ Grid >
<Grid xs={12} md={6} key={"6"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.updated_at}
type ={"datetime-local"}
InputLabelProps ={{ shrink: true, }}
onChange={(e)=>{setCar_Restrictions({...car_restrictions,updated_at:e.target.value});checkErrors()}}
defaultValue ={car_restrictions.updated_at}
error ={(errorMessages.updated_at)?true:false}
label ={"updated_at"}/>
</ Grid >
<Grid xs={12} md={6} key={"7"} item >
<InputLabel style={{textAlign: 'left'}}>car_id</InputLabel>
        <Select style={{width: '100%',textAlign: 'left'}}
                              labelId ="car_id"
                              id="car_id"
                              value={car_restrictions.car_id}
                              onChange ={(e)=>{setCar_Restrictions({...car_restrictions,car_id:e.target.value});checkErrors()}}>
                              {cars.map((key)=><MenuItem key={key.id} value={key.id}>{key.long_location}</MenuItem>)}
                          </Select>
    </Grid>
<Grid xs={12}  md={6} item key={"8"}>
<Grid container justify={"flex-end"} alignContent={"flex-end"}>
<Button onClick={() => history.push('/car_restrictions')} variant={"contained"} type={"Button"} color="secondary">Cancel</Button>
</Grid>
</Grid>
<Grid xs={12}  md={6} item key={"9"}>
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

export default withRouter(Car_RestrictionsAddUpdatePage)
