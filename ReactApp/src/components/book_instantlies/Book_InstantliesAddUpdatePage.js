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
import {addBook_Instantlies, getBook_Instantlies,getOneBook_Instantlies, updateBook_Instantlies} from "../../repo/book_instantliesRepo";


import {getCars} from "../../repo/carsRepo";



function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
function validateEmail(email){
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
const Book_InstantliesAddUpdatePage = (props)=>{
    const [alertState, setAlertstate] = useState({
        open: false,
        vertical: 'bottom',
        horizontal: 'center',
        severity: "success",
        message:"",
      });
    const { vertical, horizontal, open, severity, message } = alertState;
    const [errorMessages, setErrorMessages] = useState({});
    const [book_instantlies,setBook_Instantlies] = useState(undefined);
    const [loading, setLoading] = useState(false);
    const [cars,setCars] = useState(undefined)


    const checkErrors = () => {
        let errorList = {}
        if(book_instantlies.car_id === "" || book_instantlies.car_id === undefined)
{
   errorList = { ...errorList,car_id: "Required field!"}
}
if(book_instantlies.on_car_location === "" || book_instantlies.on_car_location === undefined)
{
   errorList = { ...errorList,on_car_location: "Required field!"}
}
if(book_instantlies.on_airport === "" || book_instantlies.on_airport === undefined)
{
   errorList = { ...errorList,on_airport: "Required field!"}
}
if(book_instantlies.on_guest_location === "" || book_instantlies.on_guest_location === undefined)
{
   errorList = { ...errorList,on_guest_location: "Required field!"}
}
if(book_instantlies.work_on_guest_location === "" || book_instantlies.work_on_guest_location === undefined)
{
   errorList = { ...errorList,work_on_guest_location: "Required field!"}
}


        setErrorMessages(errorList)
        return errorList
    }

    useEffect(()=>{
     setLoading(true);
    getCars(0,200,"").then((res)=>{ setCars(res.data); setLoading(false); })

      
        if(props.match.params.id) {
            setLoading(true);
            getOneBook_Instantlies(props.match.params.id).then((res) => {
                setBook_Instantlies(res.data.data);
                setLoading(false);
            })
        }else{
            setBook_Instantlies({})
        }
    },[props.match.params.id])
   

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
        const errors = checkErrors()
        //if no errors then send data
        if(Object.keys(errors).length<1) {
            if (book_instantlies.id) {
            setLoading(true);
               var updateResponse =  await updateBook_Instantlies(book_instantlies.id,book_instantlies);
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
                var addResponse = await addBook_Instantlies(book_instantlies);
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
        <PageTemplate title="Add/Update Book_Instantlies">
            <Card>
            <CardContent>
                <form onSubmit={handleSubmit} noValidate autoComplete="off">
               
                    {(book_instantlies!==undefined  && cars!==undefined)?
                        <Grid spacing={3} container>
                           <Grid xs={12} md={6} key={"1"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.on_car_location}
type ={"number"}
onChange={(e)=>{setBook_Instantlies({...book_instantlies,on_car_location:e.target.value});checkErrors()}}
defaultValue ={book_instantlies.on_car_location}
error ={(errorMessages.on_car_location)?true:false}
label ={"on_car_location"}/>
</ Grid >
<Grid xs={12} md={6} key={"2"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.on_airport}
type ={"number"}
onChange={(e)=>{setBook_Instantlies({...book_instantlies,on_airport:e.target.value});checkErrors()}}
defaultValue ={book_instantlies.on_airport}
error ={(errorMessages.on_airport)?true:false}
label ={"on_airport"}/>
</ Grid >
<Grid xs={12} md={6} key={"3"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.on_guest_location}
type ={"number"}
onChange={(e)=>{setBook_Instantlies({...book_instantlies,on_guest_location:e.target.value});checkErrors()}}
defaultValue ={book_instantlies.on_guest_location}
error ={(errorMessages.on_guest_location)?true:false}
label ={"on_guest_location"}/>
</ Grid >
<Grid xs={12} md={6} key={"4"} item>
<TextField required autoFocus fullWidth
helperText ={errorMessages.work_on_guest_location}
type ={"number"}
onChange={(e)=>{setBook_Instantlies({...book_instantlies,work_on_guest_location:e.target.value});checkErrors()}}
defaultValue ={book_instantlies.work_on_guest_location}
error ={(errorMessages.work_on_guest_location)?true:false}
label ={"work_on_guest_location"}/>
</ Grid >
<Grid xs={12} md={6} key={"5"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.delivery_fee_guest_location}
type ={"number"}
onChange={(e)=>{setBook_Instantlies({...book_instantlies,delivery_fee_guest_location:e.target.value});checkErrors()}}
defaultValue ={book_instantlies.delivery_fee_guest_location}
error ={(errorMessages.delivery_fee_guest_location)?true:false}
label ={"delivery_fee_guest_location"}/>
</ Grid >
<Grid xs={12} md={6} key={"6"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.max_distance}
type ={"number"}
onChange={(e)=>{setBook_Instantlies({...book_instantlies,max_distance:e.target.value});checkErrors()}}
defaultValue ={book_instantlies.max_distance}
error ={(errorMessages.max_distance)?true:false}
label ={"max_distance"}/>
</ Grid >
<Grid xs={12} md={6} key={"7"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.min_trip_for_free_delivery}
type ={"number"}
onChange={(e)=>{setBook_Instantlies({...book_instantlies,min_trip_for_free_delivery:e.target.value});checkErrors()}}
defaultValue ={book_instantlies.min_trip_for_free_delivery}
error ={(errorMessages.min_trip_for_free_delivery)?true:false}
label ={"min_trip_for_free_delivery"}/>
</ Grid >
<Grid xs={12} md={6} key={"8"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.guest_location_delivery_details}
type ={"text"}
onChange={(e)=>{setBook_Instantlies({...book_instantlies,guest_location_delivery_details:e.target.value});checkErrors()}}
defaultValue ={book_instantlies.guest_location_delivery_details}
error ={(errorMessages.guest_location_delivery_details)?true:false}
label ={"guest_location_delivery_details"}/>
</ Grid >
<Grid xs={12} md={6} key={"9"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.created_at}
type ={"datetime-local"}
InputLabelProps ={{ shrink: true, }}
onChange={(e)=>{setBook_Instantlies({...book_instantlies,created_at:e.target.value});checkErrors()}}
defaultValue ={book_instantlies.created_at}
error ={(errorMessages.created_at)?true:false}
label ={"created_at"}/>
</ Grid >
<Grid xs={12} md={6} key={"10"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.updated_at}
type ={"datetime-local"}
InputLabelProps ={{ shrink: true, }}
onChange={(e)=>{setBook_Instantlies({...book_instantlies,updated_at:e.target.value});checkErrors()}}
defaultValue ={book_instantlies.updated_at}
error ={(errorMessages.updated_at)?true:false}
label ={"updated_at"}/>
</ Grid >
<Grid xs={12} md={6} key={"11"} item >
<InputLabel style={{textAlign: 'left'}}>car_id</InputLabel>
        <Select style={{width: '100%',textAlign: 'left'}}
                              labelId ="car_id"
                              id="car_id"
                              value={book_instantlies.car_id}
                              onChange ={(e)=>{setBook_Instantlies({...book_instantlies,car_id:e.target.value});checkErrors()}}>
                              {cars.map((key)=><MenuItem key={key.id} value={key.id}>{key.long_location}</MenuItem>)}
                          </Select>
    </Grid>
<Grid xs={12}  md={6} item key={"12"}>
<Grid container justify={"flex-end"} alignContent={"flex-end"}>
<Button onClick={() => history.push('/book_instantlies')} variant={"contained"} type={"Button"} color="secondary">Cancel</Button>
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

export default withRouter(Book_InstantliesAddUpdatePage)
