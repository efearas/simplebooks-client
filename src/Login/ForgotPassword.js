import React, { useEffect, useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { GlobalContext } from '../GlobalContext';
import TextField from '@material-ui/core/TextField';
import Logo from '../Images/Logo.png';
import InputAdornment from '@material-ui/core/InputAdornment';
import MyButton from '../Components/MyButton';
import LockIcon from '@material-ui/icons/Lock';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import { useHistory } from 'react-router-dom';
import { validateEmail } from '../Util/ValidateEmail';
import Button from '@material-ui/core/Button';
import OrDiv from '../Components/OrDiv';
import useFetch from '../CustomHooks/useFetch';

export default function ForgotPassword(props) {
    const globalContext = useContext(GlobalContext);
    const classes = useStyles();
    const history = useHistory();
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [displayAfterSubmitMessage, setDisplayAfterSubmitMessage] = useState(false);
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
                return false;
            }
        }





        return true;
    }

    const submit = () => {
        if (validate() == true) {

            let data = {
                "email": email,
            }
            let url = "https://3r3fjjde27.execute-api.us-east-1.amazonaws.com/forgot-password/create-password-reset-code";

            myFetch(url,data,'POST', false,true).then(
                response => {
                    console.log(response);
                    setDisplayAfterSubmitMessage(true);
                }
            )
        }
    }


    return (
        <div className={classes.root}>
            <img src={Logo}></img>


            {
                displayAfterSubmitMessage ?

                    <Typography>
                        We have sent you an e-mail with a password reset link. Please check your inbox and spam folder.
                    </Typography>

                    :
                    <React.Fragment>
                        <Typography>
                            Type in your e-mail address. If we can find the e-mail address in our database we will send you a link to reset your password.
                        </Typography>
                        <TextField onChange={(e) => setEmail(e.target.value)} helperText={emailError} error={emailError != "" ? true : false} id="standard-basic" label="e-mail"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment className={classes.textFieldIcon} position="start">
                                        <MailOutlineIcon />
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <MyButton onClick={submit}>Send me reset password link</MyButton>
                    </React.Fragment>
            }




        </div>
    )
}

const useStyles = makeStyles({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',

        '&>*:not(img)': {
            width: '90%',
        },

        '&>*': {
            marginTop: '30px',
        },

        '&>p': {
            textAlign: 'center',
            fontSize: '1.2rem',
            marginTop: '40px',
        },

        '&>button': {
            marginTop: '40px',
        }
    },
    already: {
        fontSize: '0.9rem',
        textAlign: 'right',
        marginTop: '20px',
    },
    textField: {
        width: '90%',
    },
    textFieldIcon: {
        '& svg': {
            color: '#95D69B',
        }
    },

    signUpButton: {
        fontWeight: 600,
    }
});