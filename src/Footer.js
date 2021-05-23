import React, { useEffect, useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { GlobalContext } from './GlobalContext';
import DescriptionOutlinedIcon from '@material-ui/icons/DescriptionOutlined';
import Typography from '@material-ui/core/Typography';
import PeopleIcon from '@material-ui/icons/People';
import MoneyIcon from '@material-ui/icons/Money';
import DevicesOtherIcon from '@material-ui/icons/DevicesOther';
import AssessmentIcon from '@material-ui/icons/Assessment';
import { useHistory } from 'react-router-dom';


export default function Footer(props) {
    const globalContext = useContext(GlobalContext);
    const classes = useStyles();
    const history = useHistory();

    const getClassName = (path) => {
        
        if(window.location.pathname == path){
            return `${classes.menuItemWrapper} ${classes.selectedMenuItem}`;
        }
        return `${classes.menuItemWrapper}`;
    }

    return (
        <div className={classes.root}>
            <div id="footer-invoices-button" className={getClassName('/invoice/list')} onClick={()=>history.push('/invoice/list')}>
                <DescriptionOutlinedIcon></DescriptionOutlinedIcon>
                <Typography component="span" variant="caption">Invoices</Typography>
                <div className={classes.underlineDiv}></div>
            </div>

            <div id="footer-customers-button"  className={getClassName('/customer/list')} onClick={()=>history.push('/customer/list')}>
                <PeopleIcon></PeopleIcon>
                <Typography component="span" variant="caption">Customers</Typography>
                <div className={classes.underlineDiv}></div>
            </div>
            <div id="footer-payments-button"  className={getClassName('/payment/list')} onClick={()=>history.push('/payment/list')}>
                <MoneyIcon></MoneyIcon>
                <Typography component="span" variant="caption">Payments</Typography>
                <div className={classes.underlineDiv}></div>
            </div>
            <div id="footer-products-button"  className={getClassName('/product/list')} onClick={()=>history.push('/product/list')}>
                <DevicesOtherIcon></DevicesOtherIcon>
                <Typography component="span" variant="caption">Products</Typography>
                <div className={classes.underlineDiv}></div>
            </div>
            <div id="footer-dashboard-button"  className={getClassName('/dashboard')} onClick={()=>history.push('/dashboard')}>
                <AssessmentIcon></AssessmentIcon>
                <Typography component="span" variant="caption">Dashboard</Typography>
                <div className={classes.underlineDiv}></div>
            </div>

        </div>
    )
}

const useStyles = makeStyles({
    root: {
        position: 'fixed',
        bottom: 0,
        left: 0,
        width: 'calc(100% - 20px)',
        display: 'flex',
        justifyContent: 'space-between',
        padding: '10px',
        backgroundColor: 'white',
        boxShadow: 'inset 0px 4px 14px rgba(0, 0, 0, 0.25)',
    },
    underlineDiv: {
        borderBottom: '0px solid gray',
        
    },
    menuItemWrapper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',

        '& svg,& span': {
            color: '#757575',
        },
        '& svg': {
            width: '1.3em',
            height: '1.3em',
        },
        '& span': {
            fontWeight: '600',
        },
    },

    selectedMenuItem: {
        '& > svg, & > span' : {
            color: '#7FBF35',
        },
        '& > div': {
            borderBottom: '2px solid #7FBF35',
            width: '100%',
        },
    }
});