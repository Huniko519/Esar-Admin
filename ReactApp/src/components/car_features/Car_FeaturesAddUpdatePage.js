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
import {addCar_Features, getCar_Features,getOneCar_Features, updateCar_Features} from "../../repo/car_featuresRepo";


import {getCars} from "../../repo/carsRepo";



function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
function validateEmail(email){
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
const Car_FeaturesAddUpdatePage = (props)=>{
    const [alertState, setAlertstate] = useState({
        open: false,
        vertical: 'bottom',
        horizontal: 'center',
        severity: "success",
        message:"",
      });
    const { vertical, horizontal, open, severity, message } = alertState;
    const [errorMessages, setErrorMessages] = useState({});
    const [car_features,setCar_Features] = useState(undefined);
    const [loading, setLoading] = useState(false);
    const [cars,setCars] = useState(undefined)


    const checkErrors = () => {
        let errorList = {}
        if(car_features.car_id === "" || car_features.car_id === undefined)
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
            getOneCar_Features(props.match.params.id).then((res) => {
                setCar_Features(res.data.data);
                setLoading(false);
            })
        }else{
            setCar_Features({})
        }
    },[props.match.params.id])
   

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
        const errors = checkErrors()
        //if no errors then send data
        if(Object.keys(errors).length<1) {
            if (car_features.id) {
            setLoading(true);
               var updateResponse =  await updateCar_Features(car_features.id,car_features);
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
                var addResponse = await addCar_Features(car_features);
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
        <PageTemplate title="Add/Update Car_Features">
            <Card>
            <CardContent>
                <form onSubmit={handleSubmit} noValidate autoComplete="off">
               
                    {(car_features!==undefined  && cars!==undefined)?
                        <Grid spacing={3} container>
                           <Grid xs={12} md={6} key={"1"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.color}
type ={"text"}
onChange={(e)=>{setCar_Features({...car_features,color:e.target.value});checkErrors()}}
defaultValue ={car_features.color}
error ={(errorMessages.color)?true:false}
label ={"color"}/>
</ Grid >
<Grid xs={12} md={6} key={"2"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.model_seats}
type ={"text"}
onChange={(e)=>{setCar_Features({...car_features,model_seats:e.target.value});checkErrors()}}
defaultValue ={car_features.model_seats}
error ={(errorMessages.model_seats)?true:false}
label ={"model_seats"}/>
</ Grid >
<Grid xs={12} md={6} key={"3"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.model_doors}
type ={"text"}
onChange={(e)=>{setCar_Features({...car_features,model_doors:e.target.value});checkErrors()}}
defaultValue ={car_features.model_doors}
error ={(errorMessages.model_doors)?true:false}
label ={"model_doors"}/>
</ Grid >
<Grid xs={12} md={6} key={"4"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.model_engine_fuel}
type ={"text"}
onChange={(e)=>{setCar_Features({...car_features,model_engine_fuel:e.target.value});checkErrors()}}
defaultValue ={car_features.model_engine_fuel}
error ={(errorMessages.model_engine_fuel)?true:false}
label ={"model_engine_fuel"}/>
</ Grid >
<Grid xs={12} md={6} key={"5"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.gas_grade}
type ={"text"}
onChange={(e)=>{setCar_Features({...car_features,gas_grade:e.target.value});checkErrors()}}
defaultValue ={car_features.gas_grade}
error ={(errorMessages.gas_grade)?true:false}
label ={"gas_grade"}/>
</ Grid >
<Grid xs={12} md={6} key={"6"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.model_lkm_city}
type ={"text"}
onChange={(e)=>{setCar_Features({...car_features,model_lkm_city:e.target.value});checkErrors()}}
defaultValue ={car_features.model_lkm_city}
error ={(errorMessages.model_lkm_city)?true:false}
label ={"model_lkm_city"}/>
</ Grid >
<Grid xs={12} md={6} key={"7"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.model_lkm_hwy}
type ={"text"}
onChange={(e)=>{setCar_Features({...car_features,model_lkm_hwy:e.target.value});checkErrors()}}
defaultValue ={car_features.model_lkm_hwy}
error ={(errorMessages.model_lkm_hwy)?true:false}
label ={"model_lkm_hwy"}/>
</ Grid >
<Grid xs={12} md={6} key={"8"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.hybrid}
type ={"number"}
onChange={(e)=>{setCar_Features({...car_features,hybrid:e.target.value});checkErrors()}}
defaultValue ={car_features.hybrid}
error ={(errorMessages.hybrid)?true:false}
label ={"hybrid"}/>
</ Grid >
<Grid xs={12} md={6} key={"9"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.bike_rack}
type ={"number"}
onChange={(e)=>{setCar_Features({...car_features,bike_rack:e.target.value});checkErrors()}}
defaultValue ={car_features.bike_rack}
error ={(errorMessages.bike_rack)?true:false}
label ={"bike_rack"}/>
</ Grid >
<Grid xs={12} md={6} key={"10"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.all_drive}
type ={"number"}
onChange={(e)=>{setCar_Features({...car_features,all_drive:e.target.value});checkErrors()}}
defaultValue ={car_features.all_drive}
error ={(errorMessages.all_drive)?true:false}
label ={"all_drive"}/>
</ Grid >
<Grid xs={12} md={6} key={"11"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.child_seat}
type ={"number"}
onChange={(e)=>{setCar_Features({...car_features,child_seat:e.target.value});checkErrors()}}
defaultValue ={car_features.child_seat}
error ={(errorMessages.child_seat)?true:false}
label ={"child_seat"}/>
</ Grid >
<Grid xs={12} md={6} key={"12"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.gps}
type ={"number"}
onChange={(e)=>{setCar_Features({...car_features,gps:e.target.value});checkErrors()}}
defaultValue ={car_features.gps}
error ={(errorMessages.gps)?true:false}
label ={"gps"}/>
</ Grid >
<Grid xs={12} md={6} key={"13"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.ski_rack}
type ={"number"}
onChange={(e)=>{setCar_Features({...car_features,ski_rack:e.target.value});checkErrors()}}
defaultValue ={car_features.ski_rack}
error ={(errorMessages.ski_rack)?true:false}
label ={"ski_rack"}/>
</ Grid >
<Grid xs={12} md={6} key={"14"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.bluetooth}
type ={"number"}
onChange={(e)=>{setCar_Features({...car_features,bluetooth:e.target.value});checkErrors()}}
defaultValue ={car_features.bluetooth}
error ={(errorMessages.bluetooth)?true:false}
label ={"bluetooth"}/>
</ Grid >
<Grid xs={12} md={6} key={"15"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.usb}
type ={"number"}
onChange={(e)=>{setCar_Features({...car_features,usb:e.target.value});checkErrors()}}
defaultValue ={car_features.usb}
error ={(errorMessages.usb)?true:false}
label ={"usb"}/>
</ Grid >
<Grid xs={12} md={6} key={"16"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.ventilated_seat}
type ={"number"}
onChange={(e)=>{setCar_Features({...car_features,ventilated_seat:e.target.value});checkErrors()}}
defaultValue ={car_features.ventilated_seat}
error ={(errorMessages.ventilated_seat)?true:false}
label ={"ventilated_seat"}/>
</ Grid >
<Grid xs={12} md={6} key={"17"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.audio_input}
type ={"number"}
onChange={(e)=>{setCar_Features({...car_features,audio_input:e.target.value});checkErrors()}}
defaultValue ={car_features.audio_input}
error ={(errorMessages.audio_input)?true:false}
label ={"audio_input"}/>
</ Grid >
<Grid xs={12} md={6} key={"18"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.convertible}
type ={"number"}
onChange={(e)=>{setCar_Features({...car_features,convertible:e.target.value});checkErrors()}}
defaultValue ={car_features.convertible}
error ={(errorMessages.convertible)?true:false}
label ={"convertible"}/>
</ Grid >
<Grid xs={12} md={6} key={"19"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.toll_pass}
type ={"number"}
onChange={(e)=>{setCar_Features({...car_features,toll_pass:e.target.value});checkErrors()}}
defaultValue ={car_features.toll_pass}
error ={(errorMessages.toll_pass)?true:false}
label ={"toll_pass"}/>
</ Grid >
<Grid xs={12} md={6} key={"20"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.sunroof}
type ={"number"}
onChange={(e)=>{setCar_Features({...car_features,sunroof:e.target.value});checkErrors()}}
defaultValue ={car_features.sunroof}
error ={(errorMessages.sunroof)?true:false}
label ={"sunroof"}/>
</ Grid >
<Grid xs={12} md={6} key={"21"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.pet_friendly}
type ={"number"}
onChange={(e)=>{setCar_Features({...car_features,pet_friendly:e.target.value});checkErrors()}}
defaultValue ={car_features.pet_friendly}
error ={(errorMessages.pet_friendly)?true:false}
label ={"pet_friendly"}/>
</ Grid >
<Grid xs={12} md={6} key={"22"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.heated_seat}
type ={"number"}
onChange={(e)=>{setCar_Features({...car_features,heated_seat:e.target.value});checkErrors()}}
defaultValue ={car_features.heated_seat}
error ={(errorMessages.heated_seat)?true:false}
label ={"heated_seat"}/>
</ Grid >
<Grid xs={12} md={6} key={"23"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.car_title}
type ={"text"}
onChange={(e)=>{setCar_Features({...car_features,car_title:e.target.value});checkErrors()}}
defaultValue ={car_features.car_title}
error ={(errorMessages.car_title)?true:false}
label ={"car_title"}/>
</ Grid >
<Grid xs={12} md={6} key={"24"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.car_description}
type ={"text"}
onChange={(e)=>{setCar_Features({...car_features,car_description:e.target.value});checkErrors()}}
defaultValue ={car_features.car_description}
error ={(errorMessages.car_description)?true:false}
label ={"car_description"}/>
</ Grid >
<Grid xs={12} md={6} key={"25"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.car_guidelines}
type ={"text"}
onChange={(e)=>{setCar_Features({...car_features,car_guidelines:e.target.value});checkErrors()}}
defaultValue ={car_features.car_guidelines}
error ={(errorMessages.car_guidelines)?true:false}
label ={"car_guidelines"}/>
</ Grid >
<Grid xs={12} md={6} key={"26"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.created_at}
type ={"datetime-local"}
InputLabelProps ={{ shrink: true, }}
onChange={(e)=>{setCar_Features({...car_features,created_at:e.target.value});checkErrors()}}
defaultValue ={car_features.created_at}
error ={(errorMessages.created_at)?true:false}
label ={"created_at"}/>
</ Grid >
<Grid xs={12} md={6} key={"27"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.updated_at}
type ={"datetime-local"}
InputLabelProps ={{ shrink: true, }}
onChange={(e)=>{setCar_Features({...car_features,updated_at:e.target.value});checkErrors()}}
defaultValue ={car_features.updated_at}
error ={(errorMessages.updated_at)?true:false}
label ={"updated_at"}/>
</ Grid >
<Grid xs={12} md={6} key={"28"} item >
<InputLabel style={{textAlign: 'left'}}>car_id</InputLabel>
        <Select style={{width: '100%',textAlign: 'left'}}
                              labelId ="car_id"
                              id="car_id"
                              value={car_features.car_id}
                              onChange ={(e)=>{setCar_Features({...car_features,car_id:e.target.value});checkErrors()}}>
                              {cars.map((key)=><MenuItem key={key.id} value={key.id}>{key.long_location}</MenuItem>)}
                          </Select>
    </Grid>
<Grid xs={12}  md={6} item key={"29"}>
<Grid container justify={"flex-end"} alignContent={"flex-end"}>
<Button onClick={() => history.push('/car_features')} variant={"contained"} type={"Button"} color="secondary">Cancel</Button>
</Grid>
</Grid>
<Grid xs={12}  md={6} item key={"30"}>
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

export default withRouter(Car_FeaturesAddUpdatePage)
