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
import Checkbox from '@material-ui/core/Checkbox';


export default function SignUp(props) {
    const globalContext = useContext(GlobalContext);
    const classes = useStyles();
    const history = useHistory();
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [passwordAgain, setPasswordAgain] = useState('');
    const [passwordAgainError, setPasswordAgainError] = useState('');
    const [signUpSuccess, setSignUpSuccess] = useState(false);
    const [companyName, setCompanyName] = useState('');
    const [companyNameError, setCompanyNameError] = useState('');
    const [agreeChecked, setAgreeChecked] = useState(false);
    const [agreeCheckError, setAgreeCheckError] = useState(false);

    const myFetch = useFetch();

    const validate = () => {

        if (companyName == "") {
            setCompanyNameError('Please enter company name');
            return false;
        }
        else {
            setCompanyNameError('');
        }


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

        if(!agreeChecked) {
            setAgreeCheckError(true);
            return false;
        }
        else{
            setAgreeCheckError(false);
        }

        return true;
    }

    const submit = () => {
        if (validate() == true) {

            globalContext.dispatchMethod({ type: 'SET_MESSAGE', value: { message: '...', }, });

            let data = {
                "email": email,
                "password": password,
                "companyName": companyName,
            }
            let url = "https://3r3fjjde27.execute-api.us-east-1.amazonaws.com/sign-up";

            myFetch(url, data, 'POST', false, true).then(
                response => {
                    globalContext.dispatchMethod({ type: 'SET_MESSAGE', value: { message: '', }, });
                    console.log(response);
                    if (response.status == 200) {
                        setSignUpSuccess(true);
                    }
                    else {
                        switch (response.status) {
                            case 409: {
                                globalContext.dispatchMethod(
                                    {
                                        type: 'SET_MESSAGE',
                                        value: {
                                            message: 'This e-mail is already in use. Please use Forgot Password link on Login Page to reset your password.',
                                            showButton: true,
                                            //doSmthIfOk: ()=> {props.addTableToCompletedPayments(props.table.customerTableId)},
                                        },
                                    });
                            }
                        }
                    }


                }
            )
        }
    }


    return (
        <div className={classes.root}>
            <img src={Logo}></img>
            {
                signUpSuccess ?
                    <SignUp_Success></SignUp_Success>
                    :
                    <React.Fragment>

                        <Typography>
                            Sign up to Simple Books
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
                        <TextField onChange={(e) => setCompanyName(e.target.value)} helperText={companyNameError} error={companyNameError != "" ? true : false} id="company-name" label="Company name"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment className={classes.textFieldIcon} position="start">
                                        <BusinessIcon />
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <TextField type="password" onChange={(e) => setPassword(e.target.value)} helperText={passwordError} error={passwordError != "" ? true : false} id="password-1" label="Password"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment className={classes.textFieldIcon} position="start">
                                        <LockIcon />
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <TextField type="password" onChange={(e) => setPasswordAgain(e.target.value)} helperText={passwordAgainError} error={passwordAgainError != "" ? true : false} id="password-2" label="Password again"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment className={classes.textFieldIcon} position="start">
                                        <LockIcon />
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <Typography component="span" className={classes.already}>
                            <Link onClick={() => history.push('/login')}>
                                Already have an account?</Link>
                        </Typography>
                        <div className={classes.agreementWrapper}>
                            <Checkbox
                                id="agreement-cb"
                                color="primary"
                                inputProps={{ 'aria-label': 'secondary checkbox' }}
                                onChange={()=>setAgreeChecked(!agreeChecked)}
                            />
                            <div style={{color: agreeCheckError? 'red': 'black'}}>
                                I agree to the SimpleBooks <a href="https://app.simplebooks.app/terms-of-service.html" target="_blank">Terms of Service</a>  and <a href="https://app.simplebooks.app/privacy-policy.html" target="_blank">Privacy Policy</a>
                            </div>
                        </div>
                        <MyButton id="submit-button" onClick={submit}>Sign up</MyButton>
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
            marginTop: '20px',
        },

        '&>button': {
            marginTop: '40px',
        }
    },
    agreementWrapper:{
        display: 'flex',
        alignItems: 'center'
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