import React,{useEffect, useState, useContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { GlobalContext } from '../GlobalContext';
import Typography from '@material-ui/core/Typography';

export default function NoDataImage (props) {
    const globalContext = useContext(GlobalContext);
    const classes = useStyles();

    return (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '140px',
        flexDirection: 'column',
        alignItems: 'center', }}>
            {props.svgImage}
            <div>
                <Typography style={{margin: '20px 0', fontWeight:600, textAlign:'center', padding:'0 10px'}}>
                    {props.message}
                </Typography>
            </div>
        </div>
    )
}

const useStyles = makeStyles({
    root: {
    }
});