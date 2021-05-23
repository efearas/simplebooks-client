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

export default function Login(props) {
    const globalContext = useContext(GlobalContext);
    const classes = useStyles();
    const history = useHistory();
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
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

        if (password == "") {
            setPasswordError('Please enter password');
            return false;
        }
        else {
            setPasswordError('');
        }



        return true;
    }

    const submit = () => {
        if (validate()==true) {

            globalContext.dispatchMethod({type: 'SET_MESSAGE',value: {message: '...',},});

            let data = {
                "email": email,
                "password": password,
            }
            let url = "/login";

            myFetch(url,data,'POST', false,true).then(
                response => {
                    console.log(response);

                    switch (response.status) {
                        case 200:
                            console.log('here 1');
                            response.json().then(data => {
                                localStorage.setItem('token', data.token);
                                //history.push('/invoice/list');
                                history.push('/customer/list');
                            });
                            
                            break;
                        case 401:
                            
                            globalContext.dispatchMethod(
                                {
                                    type: 'SET_MESSAGE',
                                    value: {
                                        message: 'Wrong e-mail or password.',
                                        showButton: true,
                                    },
                                });
                            break;
                        case 403:
                            
                            globalContext.dispatchMethod(
                                {
                                    type: 'SET_MESSAGE',
                                    value: {
                                        message: 'Please verify your email.',
                                        showButton: true,
                                    },
                                });
                            break;
                        default:
                            console.log('in defualt')
                            break;
                    }



                }
            )
        }
    }


    return (
        <div className={classes.root}>
            <img src={Logo}></img>


            <Typography>
                Login to Simple Books
                </Typography>
            <TextField onChange={(e) => setEmail(e.target.value)} helperText={emailError} error={emailError != "" ? true : false} id="email" label="e-mail"
                InputProps={{
                    startAdornment: (
                        <InputAdornment className={classes.textFieldIcon} position="start">
                            <MailOutlineIcon />
                        </InputAdornment>
                    ),
                }}
            />
            <TextField type="password" onChange={(e) => setPassword(e.target.value)} helperText={passwordError} error={passwordError != "" ? true : false} id="password" label="Password"
                InputProps={{
                    startAdornment: (
                        <InputAdornment className={classes.textFieldIcon} position="start">
                            <LockIcon />
                        </InputAdornment>
                    ),
                }}
            />

            <Typography component="span" className={classes.already}>
                <Link onClick={() => history.push('/forgot-password')}>
                    Forgot password?</Link>
            </Typography>
            <MyButton id="submit-button" onClick={submit}>Login</MyButton>
            <OrDiv></OrDiv>
            <Button className={classes.signUpButton} onClick={() => history.push('/sign-up')} variant="outlined" color="primary">
                Sign Up
                        </Button>


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