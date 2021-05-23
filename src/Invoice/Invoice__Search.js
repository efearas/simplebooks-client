import React, { useEffect, useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { GlobalContext } from '../GlobalContext';

import SearchIcon from '@material-ui/icons/Search';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import { SignalCellularNull } from '@material-ui/icons';
import TextField from '@material-ui/core/TextField';
import MyButton from '../Components/MyButton';
import SearchWrapper from '../Components/SearchWrapper';
import useFetch from '../CustomHooks/useFetch';

export default function Invoice__Search(props) {
    const globalContext = useContext(GlobalContext);
    const classes = useStyles();
    const [searchPanelOpen, setSearchPanelOpen] = useState(false);
    const [lastDays, setLastDays] = useState(30);
    const [customerName, setCustomerName] = useState('');
    const [chipText, setChipText] = useState('');
    const myFetch = useFetch();

    const handleDateChipClick = () => {
        setSearchPanelOpen(true);
    }

    const handleCustomerChipClick = () => {
        setChipText('');
        setCustomerName('');
        props.search('', lastDays);
    }

    const search = () => {
        props.search(customerName, lastDays);
        setChipText(customerName);
        setSearchPanelOpen(false);
    }

    return (

        <SearchWrapper>
            <div className={classes.firstLine}>
                <SearchIcon className={classes.searchIcon} onClick={() => setSearchPanelOpen(!searchPanelOpen)} color="secondary" ></SearchIcon>

                <div className={classes.chipsWrapper}>
                    {
                        props.dateSearchOn ?
                            <Chip color="secondary" label={lastDays == 3650 ? 'All time' : 'Last ' + lastDays + ' days'} onClick={handleDateChipClick} />
                            : null
                    }


                    {
                        chipText.length > 0 ?
                            <Chip
                                color="secondary"
                                label={chipText}
                                onDelete={handleCustomerChipClick}
                            />
                            : null
                    }
                </div>
            </div>


            {
                searchPanelOpen ?
                    <div className={classes.secondLine}>
                        {
                            props.dateSearchOn ?
                                <FormControl className={classes.formControl}>
                                    <InputLabel id="demo-simple-select-label">Date</InputLabel>
                                    <Select
                                        color="secondary"
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={lastDays}
                                        onChange={(e) => { setLastDays(e.target.value) }}
                                    >
                                        <MenuItem value={7}>Last 7 days</MenuItem>
                                        <MenuItem value={15}>Last 15 days</MenuItem>
                                        <MenuItem value={30}>Last 30 days</MenuItem>
                                        <MenuItem value={90}>Last 3 months</MenuItem>
                                        <MenuItem value={3650}>All time</MenuItem>
                                    </Select>
                                </FormControl>
                                : null
                        }
                        <TextField value={customerName} onChange={(e) => setCustomerName(e.target.value)} color="secondary" id="standard-basic" label="Customer" />
                        <MyButton color={'secondary'} onClick={() => search()}>Search</MyButton>

                    </div>
                    : null
            }

        </SearchWrapper>


    )
}

const useStyles = makeStyles({



    firstLine: {
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '100%',
    },

    secondLine: {
        //marginTop: '20px',        
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',

        '& > *': {
            width: '80%',
            marginTop: '20px',
        }



    },

    searchIcon:{
        marginLeft: '30px',
    },
    chipsWrapper:{
        marginLeft: 'auto',
        marginRight: '20px',

        '&>*:nth-child(2)':{
            marginLeft:'20px'
        }
    },
    circleIcon: {
        marginRight: '15px',
    },
    invoiceIcon: {
        marginLeft: '15px',
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
    }
});