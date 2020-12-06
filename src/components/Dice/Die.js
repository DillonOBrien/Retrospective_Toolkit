/**
 * This represents a card that the dice and the button handler will live on.
 */

// Imports
import React, { useState } from "react";
import PropTypes from "prop-types";
import Card from "@material-ui/core/Card";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import DiceModel from "./DiceModel";

const useStyles = makeStyles({
  card: {
    display: "flex",
    flexWrap: "wrap",
    padding: "10px",
    justifyContent: "space-around",
    maxWidth: "275px",
    textAlign: "center",
    height: "200px",
  },
  dieButton: {
    flex: "initial",
    flexWrap: "wrap",
    padding: "10px",
  },
});

const Die = (props) => {
  const { numSides, title } = props;
  const dieClass = useStyles();
  // diceResult will re-render the DOM when it is updated
  const [diceResult, setDiceResult] = useState(0);
  let displayText = `This die has ${numSides} sides and is an ${title} die.`;

  // Pass the reference to this function to DieModel.js
  const updateResult = (rollResult) => {
    setDiceResult(rollResult);
  };

  if (diceResult !== 0) {
    displayText = `You rolled a ${diceResult}!`;
  }

  // Returns JSX to DiceLanding
  return (
    <Card className={dieClass.card}>
      <Typography>{displayText}</Typography>
      <DiceModel result={updateResult} css={dieClass.dieButton} />
    </Card>
  );
};

/**
 * "Strict typing" of the properties that this function will need
 * This mainly affects things like DiceLanding.js that pass in
 * title, numSides, and roll.
 */
Die.propTypes = {
  title: PropTypes.string,
  numSides: PropTypes.number.isRequired,
};

Die.defaultProps = {
  title: "undefined",
};

export default Die;
