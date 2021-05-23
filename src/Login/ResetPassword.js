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
import SignUp_Success from './SignUp__Success';
import BusinessIcon from '@material-ui/icons/Business';
import useFetch from '../CustomHooks/useFetch';

export default function ResetPassword(props) {
    const globalContext = useContext(GlobalContext);
    const classes = useStyles();
    const history = useHistory();

    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [passwordAgain, setPasswordAgain] = useState('');
    const [passwordAgainError, setPasswordAgainError] = useState('');
    const [signUpSuccess, setSignUpSuccess] = useState(false);
    const [companyName, setCompanyName] = useState('');
    const [state, setState] = useState(0)
    const [resetCode, setResetCode] = useState('');
    const myFetch = useFetch();

    useEffect(
        () => {
            let code = window.location.href.substring(window.location.href.indexOf('=') + 1);
            setResetCode(code);
        }, []
    )


    const sendNewPasswordToServer = () => {

        globalContext.dispatchMethod({ type: 'SET_MESSAGE', value: { message: '...', showButton: false } });
        let url = "https://3r3fjjde27.execute-api.us-east-1.amazonaws.com/forgot-password/reset-password";

        let data = {
            passwordResetCode: resetCode,
            password: password,
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
        )
    }

    const validate = () => {



        if (password == "") {
            setPasswordError('Please enter password');
            return false;
        }
        else {
            setPasswordError('');
        }

        if (passwordAgain == "") {
            setPasswordAgainError('Please enter password again');
            return false;
        }
        else {
            if (password != passwordAgain) {
                setPasswordAgainError('Both passwords must be same');
                return false;
            }
            else {
                setPasswordAgainError('');
            }

        }

        return true;
    }

    const submit = () => {
        if (validate() == true) {
            sendNewPasswordToServer();
        }
    }


    return (
        <div className={classes.root}>
            <img src={Logo}></img>
            {
                state == 1 ?
                    <Typography>
                        We have reset your password. <a href="/login">Login</a> with your new password.
                    </Typography>
                    : null
            }
            {
                state == 2 ?
                    <Typography>
                        Something gone wrong. Try clicking the link on the mail again. Please contact us if you need at support@simplebooks.app
                    </Typography>
                    : null
            }

            {
                state==0 ?
                    
                    <React.Fragment>

                        <Typography>
                            Reset your password
                        </Typography>

                        <TextField type="password" onChange={(e) => setPassword(e.target.value)} helperText={passwordError} error={passwordError != "" ? true : false} id="standard-basic" label="Password"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment className={classes.textFieldIcon} position="start">
                                        <LockIcon />
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <TextField type="password" onChange={(e) => setPasswordAgain(e.target.value)} helperText={passwordAgainError} error={passwordAgainError != "" ? true : false} id="standard-basic" label="Password again"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment className={classes.textFieldIcon} position="start">
                                        <LockIcon />
                                    </InputAdornment>
                                ),
                            }}
                        />

                        <MyButton onClick={submit}>Reset my password</MyButton>
                    </React.Fragment>
                    :null
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
});