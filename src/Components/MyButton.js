import React,{useEffect, useState, useContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';


export default function MyFunction (props) {
    const classes = useStyles();
    return (
        <Button id={props.id} onClick={props.onClick} className={classes.root} variant= {props.variant=='outlined'?'outlined':'contained'} color={props.color ? 'secondary' : 'primary'}>
                {props.children}
        </Button>
    )
}

const useStyles = makeStyles({
    root: {
        textTransform: 'capitalize',
        //padding: '10px 16px',
        fontSize: '1.1rem',
        width: '100%',
    }
});