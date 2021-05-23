import React, { useEffect, useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { GlobalContext } from '../GlobalContext';
import MyModal from '../Components/MyModal';
//import { myFetch } from '../Util/MyFetch';
import TextField from '@material-ui/core/TextField';
import MyButton from '../Components/MyButton';
import OrDiv from '../Components/OrDiv';
import Button from '@material-ui/core/Button';
import { validateEmail } from '../Util/ValidateEmail';
import useFetch from '../CustomHooks/useFetch';

export default function Email__Form(props) {
    const globalContext = useContext(GlobalContext);
    const classes = useStyles();
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState('');
    const myFetch = useFetch();

    const validate = () => {
        
        if (email == "") {
            setEmailError('Please enter e-mail');
            return false;
        }
        else {
            if (validateEmail(email)) {
                setEmailError('');
            }
            else {
                setEmailError('Please enter a valid e-mail');
            }
        }
        return true;
    }

    const submit = () => {

        if(!validate()){
            return;
        }


        let url = "https://3r3fjjde27.execute-api.us-east-1.amazonaws.com/customers";
        let data = {
            customerId: props.customerId,
            fields: [
                {
                    name: "email",
                    value: email,
                    type: "string",
                }
            ]
        }
        myFetch(url, data, 'PATCH').then(
            response => {
                
                response.json().then(dataFromServer => {
                    props.sendToServer(true);
                }
                )
            }
        );
    }

    return (
        <MyModal outsideClick={props.outsideClick}>
            <div className={classes.root}>
                <div className={classes.message}>Please enter your customer's e-mail address so that we can send your email via e-mail.</div>
                <TextField id="email-textbox" helperText={emailError} error={emailError != "" ? true : false} value={email} onChange={(e) => setEmail(e.target.value)} label="e-mail"></TextField>
                <MyButton id="save-email-button" onClick={() => submit()} > Save e-mail</MyButton>
                <OrDiv></OrDiv>
                <Button id="do-not-send-email-button" className={classes.signUpButton}
                    onClick={()=> props.sendToServer(false)}
                    variant="outlined" color="primary">
                    Do not send e-mail
                </Button>
            </div>
        </MyModal>
    )
}

const useStyles = makeStyles({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: '20px',
        '& > *': {
            marginBottom: '20px',
            width: '90%',
        }
    },
    message: {

    }
});