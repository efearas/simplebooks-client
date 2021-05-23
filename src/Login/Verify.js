import React, { useEffect, useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { GlobalContext } from '../GlobalContext';
import { myFetch } from '../Util/MyFetch';
import { SentimentSatisfied } from '@material-ui/icons';
import DoneIcon from '@material-ui/icons/Done';
import useFetch from '../CustomHooks/useFetch';

export default function Verify(props) {
    const globalContext = useContext(GlobalContext);
    const classes = useStyles();
    const [state, setState] = useState(0)
    const myFetch = useFetch();

    useEffect(
        () => {
            let code = window.location.href.substring(window.location.href.indexOf('=') + 1);

            globalContext.dispatchMethod({ type: 'SET_MESSAGE', value: { message: '...', showButton: false } });
            let url = "https://3r3fjjde27.execute-api.us-east-1.amazonaws.com/verification/verify";

            let data = {
                verificationCode: code,
            }

            myFetch(url,data,'POST', false,true).then(
                response => {
                    globalContext.dispatchMethod({ type: 'SET_MESSAGE', value: { message: '', showButton: false } });
                    console.log(response);
                    if (response.status == 200) {
                        setState(1);
                    }
                    else {
                        setState(2);
                    }
                }
            );

        }, []
    )

    return (
        <div className={classes.root}>
            
            {
                state==0?
                    <div>
                        <span className={classes.message}>Verification in progress. Please stand by.</span>
                    </div>
                    :null
            }
            {
                state==1?
                    <div className={classes.iconAndMessageWrapper}>
                        <DoneIcon className={classes.icon}></DoneIcon>
                        <span id="mail-verified" className={classes.message}>Your e-mail is verified and your free account is activated. You can <a href='/login'>login</a> now! </span>
                    </div>
                    :null
            }
            {
                state==2?
                    <span className={classes.message}>
                        Verification rejected. Please click the link on verification mail. If it does not work please contact us at support@simplebooks.app 
                    </span>
                    :null
            }
        </div>
    )
}

const useStyles = makeStyles({
    root: {
        padding: '50px 0px',
        display: 'flex',
        justifyContent: 'center',
    },
    message:{
        fontSize: '1.2rem',
        width: '70%',
        textAlign: 'center',
    },
    iconAndMessageWrapper:{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    icon: {
        width: '2.5rem',
        height: '2.5rem',
        color: 'green'
    }
    
});