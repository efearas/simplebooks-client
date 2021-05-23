import React,{useEffect, useState, useContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';



export default function SearchWrapper (props) {

    const classes = useStyles();

    return (
        <div className={classes.search}>
            {props.children}
        </div>
    )
}

const useStyles = makeStyles({
    search: {
        position: 'fixed',
        top: '35px',
        left: 0,
        width: '100%',
        //display: 'flex',
        zIndex:10,
        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
        borderRadius: '20px',
        paddingTop: '30px',
        paddingBottom: '10px',

        backgroundColor: 'white',


        '&>svg': {
            width: '1.3em',
            height: '1.3em',
        }
    },
});