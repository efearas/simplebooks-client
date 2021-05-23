import React, { useEffect, useState, useContext, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { GlobalContext } from '../GlobalContext';
import CircularProgress from '@material-ui/core/CircularProgress';
import LinearProgress from '@material-ui/core/LinearProgress';
import TextField from '@material-ui/core/TextField';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import useFetch from '../CustomHooks/useFetch';

export default function Invoice__Add__CustomerSearch(props) {
    const globalContext = useContext(GlobalContext);
    const classes = useStyles();
    const [customerList, setCustomerList] = useState([]);
    const [gettingCustomers, setGettingCustomers] = useState(false);
    const noResultHash = useRef([]); //result donmeyen stringleri tutuyorum
    const myFetch = useFetch();
    //const [isLoading, setIsLoading] = useState(false);

    const checkForNoResult = (customerName) => {

        for (let i = 1; i < customerName.length; i++) {
            if (noResultHash.current[customerName.substring(0, i)]) {
                return false;
            }
        }
        return true;
    }



    useEffect(
        () => {
            if (props.customer.length > 0 && props.selectedCustomer.name != props.customer && checkForNoResult(props.customer)) {
                setGettingCustomers(true);
                //console.log(props.customer);
                let url = "https://3r3fjjde27.execute-api.us-east-1.amazonaws.com/customers?customerName=" + props.customer;

                /*
                fetch(url, {
                    method: 'GET',
                    mode: 'cors',
                    headers: {
                        'Content-Type': 'application/json',
                    },

                }*/
                myFetch(url, null, 'GET', true).then(
                    response => {
                        //console.log(response);
                        setGettingCustomers(false);
                        if (response.status == 200) {
                            response.json().then(
                                data => {
                                    setCustomerList([...data.customers]);
                                    if (data.customers.length == 0) {
                                        noResultHash.current = {
                                            ...noResultHash.current,
                                            [props.customer]: true,
                                        }
                                    }
                                }

                            );
                        }
                    }
                )
            }
            else {
                setCustomerList([]);
            }
        }, [props.customer]
    )

    const outsideClick = () => {
        props.setSelectedCustomer({})

        props.setCustomer('');

        setCustomerList([]);   
    }

    const setSelectedCustomer = (id, name) => {
        props.setSelectedCustomer({
            id: id,
            name: name,
        })

        props.setCustomer(name);

        setCustomerList([]);
    }

    const addCustomer = () => {

        let url = "https://3r3fjjde27.execute-api.us-east-1.amazonaws.com/customers";
        let data = {
            customerName: props.customer,
            contactName: '',
            phone: '',
            address: '',
            notes: '',
            email: '',
        }
        myFetch(url, data, 'POST').then(
            response => {

                response.json().then(data => {
                    //console.log(data.id);
                    setSelectedCustomer(data.id, props.customer);
                }
                )
            }
        );
    }

    return (
        <div className={classes.root}>
            <TextField id="customer-name" autoComplete="off" error={props.customerError.length == 0 ? false : true} helperText={props.customerError} className={classes.customerTextField} value={props.customer} onChange={(e) => props.setCustomer(e.target.value)}  label="Customer" />
            <div className={classes.customerListDivPositioner}>
                {
                    props.customer.length > 0 ?
                        <React.Fragment>
                            {/*
                            customerList.length >0 && (props.customer != props.selectedCustomer.name && !gettingCustomers && customerList.filter(customer => customer.name == props.customer).length == 0 && props.selectedCustomer.id) ?
                                <div className={classes.background}></div>
                                :null
                            */}

                            <div className={classes.customerListDiv}>
                                {
                                    gettingCustomers ?
                                        <LinearProgress></LinearProgress>
                                        :
                                        props.editId == "-1" || (props.customer != props.selectedCustomer.name && props.selectedCustomer.id) ?
                                            <React.Fragment>
                                                {
                                                    customerList.map(
                                                        customer =>
                                                            <div className={classes.customerList__Line} onClick={() => setSelectedCustomer(customer.id, customer.name)} key={customer.id}>
                                                                {customer.name}
                                                            </div>
                                                    )
                                                }
                                                
                                            </React.Fragment>
                                            : null
                                }
                                {
                                    props.customer != props.selectedCustomer.name && !gettingCustomers && customerList.filter(customer => customer.name == props.customer).length == 0 ?
                                        <div id="add-new-customer-div" className={classes.customerList__Line} onClick={() => addCustomer()}><AddCircleIcon color="secondary" ></AddCircleIcon> Add <span>{' ' + props.customer}</span></div>
                                        : null
                                }
                               
                            </div>
                            {
                                    customerList.length != 0 && !gettingCustomers && (props.editId == "-1" || (props.customer != props.selectedCustomer.name && props.selectedCustomer.id)) || (props.customer != props.selectedCustomer.name && !gettingCustomers && customerList.filter(customer => customer.name == props.customer).length == 0)?
                                    <div onClick={outsideClick}  className={classes.background}></div>
                                    :null
                                }
                        </React.Fragment>
                        : null
                }


            </div>
        </div>
    )
}

const useStyles = makeStyles({
    root: {
    },
    customerListDiv: {
        position: 'absolute',
        backgroundColor: 'white',
        zIndex: 2,
        width: '100%',
    },
    customerListDivPositioner: {
        position: 'relative',
    },
    customerList__Line: {
        padding: '10px 0',
        borderBottom: '1px solid #dadada',
        display: 'flex',
        alignItems: 'center',

        '& span': {
            marginLeft: '5px',
        }
    },
    customerTextField: {
        width: '100%',
    },
    background: {
        position: 'fixed',
        top: 0,
        left: 0,
        backgroundColor: 'rgba(0, 0, 0, .4)',
        height: '100vh',
        width: '100%',
    }
});