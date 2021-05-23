import React, { useEffect, useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { GlobalContext } from '../GlobalContext';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';


export default function Product__Search(props) {
    const globalContext = useContext(GlobalContext);
    const classes = useStyles();
    

   


    return (

        <div className={classes.search}>
            <div className={classes.firstLine}>
                <SearchIcon  color="secondary" ></SearchIcon>
                <TextField className={classes.searchTextBox} onChange={(e)=> props.setSearchKeyword(e.target.value)} value={props.searchKeyword} label="Search by product name"></TextField>
            </div>


           

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

    firstLine: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
    },

    searchTextBox: {
        width: '230px',
    }
   

});