import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));

export default function DatePickers() {
  const classes = useStyles();

  return (
    <form className={classes.container} noValidate>
      <TextField
        id="dateArrival"
        label="Saapuminen"
        type="date"
        // defaultValue= {new Date().getDate()+"-"+(new Date().getMonth()+1)+"-"+new Date().getFullYear()}
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
      />
       <TextField
        id="dateLeave"
        label="Lähtö"
        type="date"
        // defaultValue= ""
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
      />
    </form>
  );
}
