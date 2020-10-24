/**
 * This class will be used as a container component that holds the other components in the landing page
 */

//Imports
import React from 'react';
import Die from '../controller/Die';
import {sides as sidesConst, themes as themeConst, themes} from '../controller/DieConstants'
import { makeStyles } from '@material-ui/core/styles';
import Header from '../components/Header'
import InfoCard from '../components/InfoCard';
import Grid from '@material-ui/core/Grid'
import '../css/DiceLanding.css';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: '5px',
  },
}));

//Directs the browser to statefarm for more information.
const redirect = (e) => {
  e.preventDefault();
  window.location.href="http://statefarm.com";
}


//Returns a landing page for the Dice Game
const DiceLanding = () => {
const classes = useStyles();

  return (
    
    <div>
      <Header/>
      <Grid className={classes.root} 
        container direction="row" justify="center" alignItems="center">
          <Grid item xs={5}>
            <InfoCard
              title="Cube Game"
              body="This cube game is intended to promote communication and understanding within a team."
              body2="How To Play:"
              body3="First, choose an action dice, then roll it. It will roll on a side with a picture. 
              Describe how the picture relates to an experience in software development you have had."
              clicked={redirect}
              />
          </Grid>
        <Grid item xs={5}>
        <div className={classes.dice}>
        <Die 
          numSides={sidesConst.SIX.sides}
          title={themeConst.Action}
        />
        </div>
      </Grid>
    </Grid>
  </div>
  );
}

export default DiceLanding;
