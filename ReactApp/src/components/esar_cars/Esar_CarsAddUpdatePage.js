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
import {addEsar_Cars, getEsar_Cars,getOneEsar_Cars, updateEsar_Cars} from "../../repo/esar_carsRepo";





function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
function validateEmail(email){
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
const Esar_CarsAddUpdatePage = (props)=>{
    const [alertState, setAlertstate] = useState({
        open: false,
        vertical: 'bottom',
        horizontal: 'center',
        severity: "success",
        message:"",
      });
    const { vertical, horizontal, open, severity, message } = alertState;
    const [errorMessages, setErrorMessages] = useState({});
    const [esar_cars,setEsar_Cars] = useState(undefined);
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
            getOneEsar_Cars(props.match.params.id).then((res) => {
                setEsar_Cars(res.data.data);
                setLoading(false);
            })
        }else{
            setEsar_Cars({})
        }
    },[props.match.params.id])
   

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
        const errors = checkErrors()
        //if no errors then send data
        if(Object.keys(errors).length<1) {
            if (esar_cars.id) {
            setLoading(true);
               var updateResponse =  await updateEsar_Cars(esar_cars.id,esar_cars);
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
                var addResponse = await addEsar_Cars(esar_cars);
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
        <PageTemplate title="Add/Update Esar_Cars">
            <Card>
            <CardContent>
                <form onSubmit={handleSubmit} noValidate autoComplete="off">
               
                    {(esar_cars!==undefined )?
                        <Grid spacing={3} container>
                           <Grid xs={12} md={6} key={"0"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.model_make_id}
type ={"text"}
onChange={(e)=>{setEsar_Cars({...esar_cars,model_make_id:e.target.value});checkErrors()}}
defaultValue ={esar_cars.model_make_id}
error ={(errorMessages.model_make_id)?true:false}
label ={"model_make_id"}/>
</ Grid >
<Grid xs={12} md={6} key={"1"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.manufacturer_arabic}
type ={"text"}
onChange={(e)=>{setEsar_Cars({...esar_cars,manufacturer_arabic:e.target.value});checkErrors()}}
defaultValue ={esar_cars.manufacturer_arabic}
error ={(errorMessages.manufacturer_arabic)?true:false}
label ={"manufacturer_arabic"}/>
</ Grid >
<Grid xs={12} md={6} key={"2"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.model_name}
type ={"text"}
onChange={(e)=>{setEsar_Cars({...esar_cars,model_name:e.target.value});checkErrors()}}
defaultValue ={esar_cars.model_name}
error ={(errorMessages.model_name)?true:false}
label ={"model_name"}/>
</ Grid >
<Grid xs={12} md={6} key={"3"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.model_trim}
type ={"text"}
onChange={(e)=>{setEsar_Cars({...esar_cars,model_trim:e.target.value});checkErrors()}}
defaultValue ={esar_cars.model_trim}
error ={(errorMessages.model_trim)?true:false}
label ={"model_trim"}/>
</ Grid >
<Grid xs={12} md={6} key={"4"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.model_year}
type ={"text"}
onChange={(e)=>{setEsar_Cars({...esar_cars,model_year:e.target.value});checkErrors()}}
defaultValue ={esar_cars.model_year}
error ={(errorMessages.model_year)?true:false}
label ={"model_year"}/>
</ Grid >
<Grid xs={12} md={6} key={"5"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.model_class}
type ={"text"}
onChange={(e)=>{setEsar_Cars({...esar_cars,model_class:e.target.value});checkErrors()}}
defaultValue ={esar_cars.model_class}
error ={(errorMessages.model_class)?true:false}
label ={"model_class"}/>
</ Grid >
<Grid xs={12} md={6} key={"6"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.model_body}
type ={"text"}
onChange={(e)=>{setEsar_Cars({...esar_cars,model_body:e.target.value});checkErrors()}}
defaultValue ={esar_cars.model_body}
error ={(errorMessages.model_body)?true:false}
label ={"model_body"}/>
</ Grid >
<Grid xs={12} md={6} key={"7"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.model_engine_fuel}
type ={"text"}
onChange={(e)=>{setEsar_Cars({...esar_cars,model_engine_fuel:e.target.value});checkErrors()}}
defaultValue ={esar_cars.model_engine_fuel}
error ={(errorMessages.model_engine_fuel)?true:false}
label ={"model_engine_fuel"}/>
</ Grid >
<Grid xs={12} md={6} key={"8"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.model_transmission_type}
type ={"text"}
onChange={(e)=>{setEsar_Cars({...esar_cars,model_transmission_type:e.target.value});checkErrors()}}
defaultValue ={esar_cars.model_transmission_type}
error ={(errorMessages.model_transmission_type)?true:false}
label ={"model_transmission_type"}/>
</ Grid >
<Grid xs={12} md={6} key={"9"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.model_transmission_type_arabic}
type ={"text"}
onChange={(e)=>{setEsar_Cars({...esar_cars,model_transmission_type_arabic:e.target.value});checkErrors()}}
defaultValue ={esar_cars.model_transmission_type_arabic}
error ={(errorMessages.model_transmission_type_arabic)?true:false}
label ={"model_transmission_type_arabic"}/>
</ Grid >
<Grid xs={12} md={6} key={"10"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.model_seats}
type ={"text"}
onChange={(e)=>{setEsar_Cars({...esar_cars,model_seats:e.target.value});checkErrors()}}
defaultValue ={esar_cars.model_seats}
error ={(errorMessages.model_seats)?true:false}
label ={"model_seats"}/>
</ Grid >
<Grid xs={12} md={6} key={"11"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.model_doors}
type ={"text"}
onChange={(e)=>{setEsar_Cars({...esar_cars,model_doors:e.target.value});checkErrors()}}
defaultValue ={esar_cars.model_doors}
error ={(errorMessages.model_doors)?true:false}
label ={"model_doors"}/>
</ Grid >
<Grid xs={12} md={6} key={"12"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.model_lkm_hwy}
type ={"text"}
onChange={(e)=>{setEsar_Cars({...esar_cars,model_lkm_hwy:e.target.value});checkErrors()}}
defaultValue ={esar_cars.model_lkm_hwy}
error ={(errorMessages.model_lkm_hwy)?true:false}
label ={"model_lkm_hwy"}/>
</ Grid >
<Grid xs={12} md={6} key={"13"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.model_lkm_city}
type ={"text"}
onChange={(e)=>{setEsar_Cars({...esar_cars,model_lkm_city:e.target.value});checkErrors()}}
defaultValue ={esar_cars.model_lkm_city}
error ={(errorMessages.model_lkm_city)?true:false}
label ={"model_lkm_city"}/>
</ Grid >
<Grid xs={12}  md={6} item key={"14"}>
<Grid container justify={"flex-end"} alignContent={"flex-end"}>
<Button onClick={() => history.push('/esar_cars')} variant={"contained"} type={"Button"} color="secondary">Cancel</Button>
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

export default withRouter(Esar_CarsAddUpdatePage)
