import React, { useEffect, useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { GlobalContext } from './GlobalContext';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Typography from '@material-ui/core/Typography';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { useHistory } from 'react-router-dom';




export default function Header(props) {
    const globalContext = useContext(GlobalContext);
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const history = useHistory();

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const logOff = () => {
        localStorage.setItem('token', '');
        history.push('/login');
    }
    return (
        <div className={classes.root} id="header-wrapper">
            <div className={classes.header}>
                <div className={classes.iconAndTitleWrapper}>
                    {props.iconLeft}
                    <Typography id="header-title" variant="h6" className={classes.title} component="span">
                        {props.title}
                    </Typography>
                </div>
                <div>
                    {props.iconRight}
                    <MoreVertIcon className={classes.dotsIcon} onClick={handleClick}></MoreVertIcon>
                    <Menu
                        id="simple-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                        <MenuItem onClick={() => history.push("/company/edit")}>Edit company info</MenuItem>
                        <MenuItem onClick={() => history.push("/support/support")}>Support</MenuItem>
                        <MenuItem onClick={() => logOff()}>Log off</MenuItem>

                    </Menu>
                </div>

            </div>
        </div>
    )
}

const useStyles = makeStyles({
    root: {
    },
    header: {
        position: 'fixed',
        top: '-20px',
        left: 0,
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        backgroundColor: '#59ad54',
        color: 'white',
        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
        borderRadius: '20px',
        paddingTop: '30px',
        paddingBottom: '10px',
        alignItems: 'center',
        zIndex: 12,

        '& svg': {
            width: '1.2em',
            height: '1.2em',
        },

        '& > svg': {
            marginRight: '15px',
        }
    },

    iconAndTitleWrapper: {
        display: 'flex',
        alignItems: 'center',

        '&>svg': {
            marginLeft: '15px',
        }
    },
    title: {
        marginLeft: '10px',
    },
    dotsIcon: {
        margin: '0 10px',
    }
});