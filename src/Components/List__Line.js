import React, { useEffect, useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { GlobalContext } from '../GlobalContext';
import EditIcon from '@material-ui/icons/Edit';
import Typography from '@material-ui/core/Typography';
import { getMonthName } from '../Util/DateFunctions';

export default function List__Line(props) {
    const globalContext = useContext(GlobalContext);
    const classes = useStyles();

    return (
        <div className={classes.root} onClick={props.onMouseClick}>

            {
                props.date ?
                    <div className={classes.dateWrapper}>
                        <div className={classes.day}>
                        {(new Date(props.date)).getDate()}
                        </div>
                        <div className={classes.monthAndYear}>
                            {getMonthName(new Date(props.date)).substring(0, 3)} {(new Date(props.date)).getFullYear()}
                        </div>
                        <div className={classes.hour}>

                        </div>
                    </div>
                    : null
            }
            <div className={classes.twoLineWrapper}>

                <div className={classes.customerAndMoney}>
                    <div className={classes.customer}>
                        {props.customerName && props.customerName.substring(0, 20)}
                    </div>
                    {
                        props.money ?
                            <div className={classes.money}>
                                 {'£ ' + props.money}
                            </div>
                            : null
                    }

                </div>

                <div className={classes.descriptionAndIcon}>
                    <div className={classes.description}>
                        
                        {props.notes && props.notes.substring(0,20)+ (props.notes.length>20 ? '...' :'')}
                    </div>
                    <div className={classes.editIconWrapper}>
                        <EditIcon></EditIcon>
                    </div>
                </div>
            </div>




        </div>
    )
}

const useStyles = makeStyles({
    root: {
        display: 'flex',
        //justifyContent: 'space-between',
        padding: '10px 10px',
        borderBottom: '1px solid #80808029',
        fontFamily: 'Open Sans',
    },
    twoLineWrapper: {
        width: '100%',
        marginLeft: '20px',
    },
    customerAndMoney: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    dateWrapper: {
        display: 'flex',
        flexDirection: 'column',
        minWidth: '65px',


        '&>*': {
            textAlign: 'center',
        }
    },

    descriptionAndIcon: {
        display: 'flex',
        justifyContent: 'space-between',
    },

    editIconWrapper: {
        //textAlign: 'right',

        '&>svg': {
            color: '#2fa8ac',
            fontSize: '1.2rem',
            opacity: '0.8',
        }
    },
    customerAndDescriptionWrapper: {
        marginLeft: '30px',
    },
    customer: {
        fontWeight: '600',
        fontSize: '1rem',
    },
    description: {
        fontWeight: '600',
        fontSize: '0.9rem',
        color: 'rgba(0, 0, 0, 0.5)',
    },
    day: {
        //fontSize: '1.5rem',
        fontSize: '1.0rem',
        opacity: 0.6,
        fontWeight: 600,
    },

    monthAndYear: {
        fontSize: '0.9rem',
        color: 'rgba(0, 0, 0, 0.6)',
    },
    hour: {
        fontSize: '0.9rem',
        color: 'rgba(0, 0, 0, 0.6)',
    },
    money: {
        fontSize: '0.9rem',
        fontWeight: 600,
    }

});