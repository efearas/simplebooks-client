import React,{useEffect, useState, useContext, useRef} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { GlobalContext } from '../GlobalContext';


export default function MyModal (props) {
    const globalContext = useContext(GlobalContext);
    const classes = useStyles();
    const refInnerDiv = useRef(null);

    useEffect(() => {
        window.addEventListener('click', handleClick);
    
        return () => {
          window.removeEventListener('click', handleClick);
        };
      }, []);


    const handleClick = (e) => {
        if(refInnerDiv.current.contains(e.target)){
            //console.log('iceride');
        }
        else {
            //console.log('disarida');
            if(props.outsideClick){
                props.outsideClick();
            }
            
        }
    }

    return (
        <div className={classes.root}>
            <div className={classes.innerWrapper} ref={refInnerDiv}>
                {props.children}
            </div>
        </div>
    )
}

const useStyles = makeStyles({
    root: {
        height: '100hv',
        backgroundColor: 'rgba(0, 0, 0, .4)',
        position: 'fixed',
        top:0,
        left:0,
        height: '100vh',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        zIndex: 10,
    },
    innerWrapper: {
        backgroundColor: 'white',
        alignSelf: 'flex-start',
        marginTop: '150px',
        width: '90%',
        borderRadius: '5px',
        padding: '10px',
    },
});