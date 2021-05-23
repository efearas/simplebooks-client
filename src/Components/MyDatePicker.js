import React, { useEffect, useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { GlobalContext } from '../GlobalContext';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardTimePicker, KeyboardDatePicker, } from '@material-ui/pickers';


export default function MyDatePicker(props) {
    const globalContext = useContext(GlobalContext);
    const classes = useStyles();

    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container justify="space-around">
                <KeyboardDatePicker
                    className={classes.datePicker}
                    margin="normal"
                    id="date-picker-dialog"
                    label={props.label}
                    format="dd/MM/yyyy"
                    value={props.date}
                    onChange={(date) => props.setDate(date)}
                    KeyboardButtonProps={{
                        'aria-label': 'change date',
                    }}
                />
            </Grid>
        </MuiPickersUtilsProvider>
    )
}

const useStyles = makeStyles({
    root: {
    },
    datePicker: {
        width: '100%',
        '& svg':{
            color: '#7FBF35',
        }
    }
});