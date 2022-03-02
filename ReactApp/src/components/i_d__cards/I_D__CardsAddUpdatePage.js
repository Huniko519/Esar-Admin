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
import {addI_D__Cards, getI_D__Cards,getOneI_D__Cards, updateI_D__Cards} from "../../repo/i_d__cardsRepo";


import {getUsers} from "../../repo/usersRepo";



function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
function validateEmail(email){
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
const I_D__CardsAddUpdatePage = (props)=>{
    const [alertState, setAlertstate] = useState({
        open: false,
        vertical: 'bottom',
        horizontal: 'center',
        severity: "success",
        message:"",
      });
    const { vertical, horizontal, open, severity, message } = alertState;
    const [errorMessages, setErrorMessages] = useState({});
    const [i_d__cards,setI_D__Cards] = useState(undefined);
    const [loading, setLoading] = useState(false);
    const [users,setUsers] = useState(undefined)


    const checkErrors = () => {
        let errorList = {}
        if(i_d__cards.user_id === "" || i_d__cards.user_id === undefined)
{
   errorList = { ...errorList,user_id: "Required field!"}
}


        setErrorMessages(errorList)
        return errorList
    }

    useEffect(()=>{
     setLoading(true);
    getUsers(0,200,"").then((res)=>{ setUsers(res.data); setLoading(false); })

      
        if(props.match.params.id) {
            setLoading(true);
            getOneI_D__Cards(props.match.params.id).then((res) => {
                setI_D__Cards(res.data.data);
                setLoading(false);
            })
        }else{
            setI_D__Cards({})
        }
    },[props.match.params.id])
   

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
        const errors = checkErrors()
        //if no errors then send data
        if(Object.keys(errors).length<1) {
            if (i_d__cards.id) {
            setLoading(true);
               var updateResponse =  await updateI_D__Cards(i_d__cards.id,i_d__cards);
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
                var addResponse = await addI_D__Cards(i_d__cards);
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
        <PageTemplate title="Add/Update I_D__Cards">
            <Card>
            <CardContent>
                <form onSubmit={handleSubmit} noValidate autoComplete="off">
               
                    {(i_d__cards!==undefined  && users!==undefined)?
                        <Grid spacing={3} container>
                           <Grid xs={12} md={6} key={"1"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.first_name}
type ={"text"}
onChange={(e)=>{setI_D__Cards({...i_d__cards,first_name:e.target.value});checkErrors()}}
defaultValue ={i_d__cards.first_name}
error ={(errorMessages.first_name)?true:false}
label ={"first_name"}/>
</ Grid >
<Grid xs={12} md={6} key={"2"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.last_name}
type ={"text"}
onChange={(e)=>{setI_D__Cards({...i_d__cards,last_name:e.target.value});checkErrors()}}
defaultValue ={i_d__cards.last_name}
error ={(errorMessages.last_name)?true:false}
label ={"last_name"}/>
</ Grid >
<Grid xs={12} md={6} key={"3"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.middle_name}
type ={"text"}
onChange={(e)=>{setI_D__Cards({...i_d__cards,middle_name:e.target.value});checkErrors()}}
defaultValue ={i_d__cards.middle_name}
error ={(errorMessages.middle_name)?true:false}
label ={"middle_name"}/>
</ Grid >
<Grid xs={12} md={6} key={"4"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.dob}
type ={"text"}
onChange={(e)=>{setI_D__Cards({...i_d__cards,dob:e.target.value});checkErrors()}}
defaultValue ={i_d__cards.dob}
error ={(errorMessages.dob)?true:false}
label ={"dob"}/>
</ Grid >
<Grid xs={12} md={6} key={"5"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.id_number}
type ={"text"}
onChange={(e)=>{setI_D__Cards({...i_d__cards,id_number:e.target.value});checkErrors()}}
defaultValue ={i_d__cards.id_number}
error ={(errorMessages.id_number)?true:false}
label ={"id_number"}/>
</ Grid >
<Grid xs={12} md={6} key={"6"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.id_country}
type ={"text"}
onChange={(e)=>{setI_D__Cards({...i_d__cards,id_country:e.target.value});checkErrors()}}
defaultValue ={i_d__cards.id_country}
error ={(errorMessages.id_country)?true:false}
label ={"id_country"}/>
</ Grid >
<Grid xs={12} md={6} key={"7"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.id_state}
type ={"text"}
onChange={(e)=>{setI_D__Cards({...i_d__cards,id_state:e.target.value});checkErrors()}}
defaultValue ={i_d__cards.id_state}
error ={(errorMessages.id_state)?true:false}
label ={"id_state"}/>
</ Grid >
<Grid xs={12} md={6} key={"8"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.id_city}
type ={"text"}
onChange={(e)=>{setI_D__Cards({...i_d__cards,id_city:e.target.value});checkErrors()}}
defaultValue ={i_d__cards.id_city}
error ={(errorMessages.id_city)?true:false}
label ={"id_city"}/>
</ Grid >
<Grid xs={12} md={6} key={"9"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.date_of_issue}
type ={"text"}
onChange={(e)=>{setI_D__Cards({...i_d__cards,date_of_issue:e.target.value});checkErrors()}}
defaultValue ={i_d__cards.date_of_issue}
error ={(errorMessages.date_of_issue)?true:false}
label ={"date_of_issue"}/>
</ Grid >
<Grid xs={12} md={6} key={"10"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.expiration_date}
type ={"text"}
onChange={(e)=>{setI_D__Cards({...i_d__cards,expiration_date:e.target.value});checkErrors()}}
defaultValue ={i_d__cards.expiration_date}
error ={(errorMessages.expiration_date)?true:false}
label ={"expiration_date"}/>
</ Grid >
<Grid xs={12} md={6} key={"11"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.expired_id}
type ={"text"}
onChange={(e)=>{setI_D__Cards({...i_d__cards,expired_id:e.target.value});checkErrors()}}
defaultValue ={i_d__cards.expired_id}
error ={(errorMessages.expired_id)?true:false}
label ={"expired_id"}/>
</ Grid >
<Grid xs={12} md={6} key={"12"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.issued_by}
type ={"text"}
onChange={(e)=>{setI_D__Cards({...i_d__cards,issued_by:e.target.value});checkErrors()}}
defaultValue ={i_d__cards.issued_by}
error ={(errorMessages.issued_by)?true:false}
label ={"issued_by"}/>
</ Grid >
<Grid xs={12} md={6} key={"13"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.expired}
type ={"number"}
onChange={(e)=>{setI_D__Cards({...i_d__cards,expired:e.target.value});checkErrors()}}
defaultValue ={i_d__cards.expired}
error ={(errorMessages.expired)?true:false}
label ={"expired"}/>
</ Grid >
<Grid xs={12} md={6} key={"14"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.image_path}
type ={"text"}
onChange={(e)=>{setI_D__Cards({...i_d__cards,image_path:e.target.value});checkErrors()}}
defaultValue ={i_d__cards.image_path}
error ={(errorMessages.image_path)?true:false}
label ={"image_path"}/>
</ Grid >
<Grid xs={12} md={6} key={"15"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.image_path_small}
type ={"text"}
onChange={(e)=>{setI_D__Cards({...i_d__cards,image_path_small:e.target.value});checkErrors()}}
defaultValue ={i_d__cards.image_path_small}
error ={(errorMessages.image_path_small)?true:false}
label ={"image_path_small"}/>
</ Grid >
<Grid xs={12} md={6} key={"16"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.created_at}
type ={"datetime-local"}
InputLabelProps ={{ shrink: true, }}
onChange={(e)=>{setI_D__Cards({...i_d__cards,created_at:e.target.value});checkErrors()}}
defaultValue ={i_d__cards.created_at}
error ={(errorMessages.created_at)?true:false}
label ={"created_at"}/>
</ Grid >
<Grid xs={12} md={6} key={"17"} item>
<TextField  autoFocus fullWidth
helperText ={errorMessages.updated_at}
type ={"datetime-local"}
InputLabelProps ={{ shrink: true, }}
onChange={(e)=>{setI_D__Cards({...i_d__cards,updated_at:e.target.value});checkErrors()}}
defaultValue ={i_d__cards.updated_at}
error ={(errorMessages.updated_at)?true:false}
label ={"updated_at"}/>
</ Grid >
<Grid xs={12} md={6} key={"18"} item >
<InputLabel style={{textAlign: 'left'}}>user_id</InputLabel>
        <Select style={{width: '100%',textAlign: 'left'}}
                              labelId ="user_id"
                              id="user_id"
                              value={i_d__cards.user_id}
                              onChange ={(e)=>{setI_D__Cards({...i_d__cards,user_id:e.target.value});checkErrors()}}>
                              {users.map((key)=><MenuItem key={key.id} value={key.id}>{key.password}</MenuItem>)}
                          </Select>
    </Grid>
<Grid xs={12}  md={6} item key={"19"}>
<Grid container justify={"flex-end"} alignContent={"flex-end"}>
<Button onClick={() => history.push('/i_d__cards')} variant={"contained"} type={"Button"} color="secondary">Cancel</Button>
</Grid>
</Grid>
<Grid xs={12}  md={6} item key={"20"}>
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

export default withRouter(I_D__CardsAddUpdatePage)
