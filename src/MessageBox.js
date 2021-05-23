import React,{useEffect, useState, useContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { GlobalContext } from './GlobalContext';
import CircularProgress from '@material-ui/core/CircularProgress';
import MyButton from './Components/MyButton';
import { Typography } from '@material-ui/core';

export default function MessageBox (props) {
    const globalContext = useContext(GlobalContext);
    const classes = useStyles();

    const clicked = () => {
        console.log('clickEd!');
        globalContext.dispatchMethod({ type: 'SET_MESSAGE', value: { message: '', showButton: false } });
        if (globalContext.globalState.messageOptions.doSmthIfOk != null) {
            globalContext.globalState.messageOptions.doSmthIfOk();
        }
    }

    const divClicked = () => {
        globalContext.dispatchMethod({ type: 'SET_MESSAGE', value: { message: '', showButton: false } });
    }
    const cancelClick = () => {
        console.log('cancel clicked');
        globalContext.dispatchMethod({ type: 'SET_MESSAGE', value: { message: '', showButton: false } });
    }




    return (
        <div className={classes.root} style={{
            display: globalContext.globalState.messageOptions.message.length != 0 ? 'flex' : 'none',
        }}>
            <div className={classes.innerWrapper}>
            {!globalContext.globalState.messageOptions.showButton ?
                    <div className={classes.centeringDiv}>
                        <CircularProgress></CircularProgress>
                    </div>
                    : null
                }
                <Typography id="message-box-text" className={classes.messageText}>
                    {globalContext.globalState.messageOptions.message != '...' ? globalContext.globalState.messageOptions.message : ''}
                </Typography>
                <div className={classes.buttonWrapper}>
                    {globalContext.globalState.messageOptions.doSmthIfOk != undefined && !globalContext.globalState.messageOptions.doNotShowCancel ?
                        <span   className={classes.cancelButton}  onClick={cancelClick}>
                            Cancel
                        </span>
                        : null
                        }

                    {globalContext.globalState.messageOptions.showButton ?
                        <MyButton id="ok-button" variant="contained" color="primary" style={{ marginTop: '30px', width: '30%', alignSelf: 'flex-end', }} onClick={clicked}>
                            OK
                        </MyButton>
                        : null
                        }
                </div>
            </div>
            
        </div>
    )
}

const useStyles = makeStyles({
    root: {
        height: '100hv',
        backgroundColor: 'rgba(0, 0, 0, .6)',
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
    buttonWrapper: {
        display: 'flex',
        justifyContent: 'flex-end',
        marginTop: '20px',
        alignItems: 'center',
    },
    cancelButton: {
        width: '50%',
        textAlign: 'center',
    },
    centeringDiv:{
        display:'flex',
        justifyContent:'center',
    },
    messageText: {
        textAlign: 'center',
    }

});