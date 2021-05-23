import React,{useEffect, useState, useContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { GlobalContext } from '../GlobalContext';


export default function OrDiv (props) {
    const globalContext = useContext(GlobalContext);
    const classes = useStyles();

    return (
        <div className={classes.orWrapper}>
        <span>or</span>
    </div>
    )
}

const useStyles = makeStyles({
    orWrapper: {
        borderBottom: '1px solid #80808069',
        display: 'flex',
        justifyContent: 'center',

        '& > span': {
            position: 'relative',
            top: '10px',
            display: 'inline-block',
            backgroundColor: 'white',
            padding: '0 20px',
        }
    },
});