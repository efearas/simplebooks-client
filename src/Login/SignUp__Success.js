import React, { useEffect, useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { GlobalContext } from '../GlobalContext';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import Typography from '@material-ui/core/Typography';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import Link from '@material-ui/core/Link';
import { useHistory } from 'react-router-dom';

export default function SignUp__Success(props) {
    const globalContext = useContext(GlobalContext);
    const classes = useStyles();
    const history = useHistory();

    return (
        <div className={classes.root} id="sign-up-success-wrapper-div">
            <VerifiedUserIcon className={classes.icon} ></VerifiedUserIcon>
            <Typography variant="h6" style={{textAlign:'center'}}>
                We have sent you an e-mail. Please click the link in the e-mail to activate your account.
            </Typography>
        </div>
    )
}

const useStyles = makeStyles({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    icon: {
        color: '#489C42',
        width: '2em',
        height: '2em',
        margin: '20px 0',
    },
    goToLogin: {
        marginTop: '20px',
    }
});