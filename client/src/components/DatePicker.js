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

export default function DatePickers(alkuPvm, loppuPvm, setAlkuPvm, setLoppuPvm, mokkiAlku, mokkiLoppu, setMokkiAlku, setMokkiLoppu) {
  const classes = useStyles();

  return (
    <form className={classes.container} noValidate>
      <TextField
        id="dateArrival"
        label="Saapuminen"
        type="date"
        // value={alkuPvm ? alkuPvm : ""}
        // onChange={setAlkuPvm}
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
      />
       <TextField
        id="dateLeave"
        label="Lähtö"
        type="date"
        // value={loppuPvm ? loppuPvm : ""}
        // onChange={setLoppuPvm}
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
      />
    </form>
  );
}
