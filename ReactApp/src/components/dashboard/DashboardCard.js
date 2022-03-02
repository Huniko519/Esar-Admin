import React from "react";
import {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import history from './../../history';
const useStyles = makeStyles((theme) => ({
    root: {
      margin:20
    },
    media: {
      height: 80,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
      },
  }));

  export default function DashboardCard(props) {
    
    const classes = useStyles();
    const [pagenmame,setPagename] = useState('dashboard')
    const handleNavigation = async (e) => {
      console.log("pagename",pagenmame);
      history.push("/"+pagenmame)
    }
    useEffect(()=>{
console.log(props.pagename);
      if(props.pagename){
        setPagename(props.pagename)
      }
    },[props.pagename])
    const title = (str) => {
      return str.replace(/(^|\s)\S/g, function(t) { return t.toUpperCase() });
    }
    return (
        
      <Card className={classes.root}>
        <CardActionArea>
        <CardMedia
          component="img"
          alt="Contemplative Reptile"
          height="100"
          image="https://picsum.photos/200/80.jpg"
          title="Contemplative Reptile"
        />
           <CardContent style={{textOverflow: "ellipsis", width: '13rem'}}>
            <Typography gutterBottom variant="h6" component="h6">
            {title(props.pagename)}
            </Typography>
           
          </CardContent>
        </CardActionArea>
        <CardActions justify={"flex-end"} alignContent={"flex-end"}>
        <Button style={{width: '100%'}}variant={"contained"} color="primary" onClick={handleNavigation}>View</Button>
          
        </CardActions>
      </Card>
      
    );
  }

