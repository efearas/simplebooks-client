import React, { useEffect, useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { GlobalContext } from '../GlobalContext';
import Header from '../Header';
import { useHistory } from 'react-router-dom';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import SaveIcon from '@material-ui/icons/Save';
import TextField from '@material-ui/core/TextField';
import MyButton from '../Components/MyButton';
//import { myFetch } from '../Util/MyFetch';
import OrDiv from '../Components/OrDiv';
import Button from '@material-ui/core/Button';
import useFetch from '../CustomHooks/useFetch';
import { validateEmail } from '../Util/ValidateEmail';

export default function Customer__Add(props) {
    const globalContext = useContext(GlobalContext);
    const classes = useStyles();
    const history = useHistory();
    const [customerName, setCustomerName] = useState('');
    const [customerError, setCustomerError] = useState('');
    const [contactName, setContactName] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [notes, setNotes] = useState("");
    const [editId, setEditId] = useState("-1");
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState('');
    const myFetch = useFetch();

    useEffect(
        () => {
            const params = new URLSearchParams(window.location.search);
            if (params.has('id')) {

                let customerId = params.get('id');
                setEditId(customerId);



                let url = `https://3r3fjjde27.execute-api.us-east-1.amazonaws.com/customers/${customerId}`

                myFetch(url, null, 'GET').then(
                    response => {
                        response.json().then(data => {
                            console.log(data);

                            setCustomerName(data.customer.name);
                            setContactName(data.customer.contactName);
                            setPhone(data.customer.phone);
                            setAddress(data.customer.address);
                            setNotes(data.customer.notes);
                            setEmail(data.customer.email);
                        }
                        )
                    }
                );
            }

        }, []
    )

    const deleteCustomer = () => {

        let url = "https://3r3fjjde27.execute-api.us-east-1.amazonaws.com/customers";
        if (editId != "-1") {

            let data = {
                customerId: editId
            }
            myFetch(url, data, 'DELETE').then(
                response => {
                    console.log(response);

                    if (response.status == 409) {
                        globalContext.dispatchMethod({ type: 'SET_MESSAGE', value: { message: 'This customer has an invoice or a payment. You first need to delete customer\'s invoices and payments', showButton: true } });
                    }
                    else {
                        globalContext.dispatchMethod({ type: 'SET_MESSAGE', value: { message: 'Customer deleted.', doNotShowCancel: true, doSmthIfOk: () => history.push('/customer/list'), showButton: true } });
                        /*setTimeout(() => {
                            
                        }, 2000);*/
                    }
                }
            );
        }
    }

    const validate = () => {
        if (customerName == "") {
            setCustomerError('Enter customer name');
            return false;
        }
        else {
            setCustomerError('');
        }


        if (validateEmail(email) || email == "") {
            setEmailError('');
        }
        else {
            setEmailError('Please enter a valid e-mail');
            return false;
        }


        return true;
    }

    const submit = () => {
        if (validate() == false) {
            return false;
        }




        let url = "https://3r3fjjde27.execute-api.us-east-1.amazonaws.com/customers";
        let data = {
            customerName: customerName,
            contactName: contactName,
            phone: phone,
            address: address,
            notes: notes,
            email: email,
        }

        if (editId == "-1") {
            myFetch(url, data, 'POST').then(
                response => {
                    if (response.status == 409) {
                        globalContext.dispatchMethod({ type: 'SET_MESSAGE', value: { message: 'This customer has been added before.', showButton: true } });
                    }
                    else {
                        response.json().then(data => {
                            globalContext.dispatchMethod({ type: 'SET_MESSAGE', value: { message: 'Customer saved', showButton: true, doNotShowCancel: true, doSmthIfOk: () => history.push('/customer/list') } })
                        }
                        )
                    }
                }
            );
        }
        else {
            data.customerId = editId;
            myFetch(url, data, 'PUT').then(
                response => {
                    if (response.status == 409) {
                        globalContext.dispatchMethod({ type: 'SET_MESSAGE', value: { message: 'This customer has been added before.', showButton: true } });
                    }
                    else {
                     
                        response.json().then(data => {
                            globalContext.dispatchMethod({ type: 'SET_MESSAGE', value: { message: 'Changes saved', showButton: true, doNotShowCancel: true, doSmthIfOk: () => history.push('/customer/list') } })
                        }
                        )
                    }
                }
            );
        }
    }

    return (

        <div >
            <Header
                title={editId == "-1" ? "Add new customer" : "Edit customer"}
                iconLeft={
                    <ArrowBackIcon onClick={() => history.push('/customer/list')}></ArrowBackIcon>
                }

            >
            </Header>
            <div className={classes.root}>
                <TextField id="customer-name-tb" value={customerName} error={customerError == '' ? false : true} helperText={customerError} onChange={(e) => setCustomerName(e.target.value)} label="Customer name"></TextField>
                <TextField id="contact-name-tb" value={contactName} onChange={(e) => setContactName(e.target.value)} label="Contact name"></TextField>
                <TextField id="email-tb" value={email} helperText={emailError} error={emailError != "" ? true : false} onChange={(e) => setEmail(e.target.value)} label="e-mail"></TextField>
                <TextField id="phone-tb" type="number" value={phone} onChange={(e) => setPhone(e.target.value)} label="Phone"></TextField>
                <TextField id="address-tb" multiline value={address} onChange={(e) => setAddress(e.target.value)} label="Address" rows={4}></TextField>
                <TextField id="notes-tb" multiline value={notes} onChange={(e) => setNotes(e.target.value)} label="Notes" rows={4}></TextField>

                <div className={classes.saveButtonWrapper}>
                    <MyButton id="save-button" onClick={() => submit()} > Save</MyButton>
                </div>
                {
                    editId != "-1" ?
                        <React.Fragment>
                            <OrDiv></OrDiv>
                            <Button className={classes.signUpButton}
                                onClick={() => globalContext.dispatchMethod({ type: 'SET_MESSAGE', value: { message: 'Do you really want to delete the customer?', showButton: true, doSmthIfOk: deleteCustomer, } })}
                                variant="outlined" color="primary">
                                Delete
                                    </Button>
                        </React.Fragment>
                        : null
                }

            </div>
        </div>


    )
}

const useStyles = makeStyles({
    root: {
        marginTop: '60px',
        marginBottom: '70px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        '&>*': {
            width: '90%',
            marginBottom: '20px',
        }
    },
    line: {
        marginTop: '30px',
        borderBottom: '1px solid #80808029',
    },
    firstLine: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    secondLine: {
        display: 'flex',
        justifyContent: 'space-between',

        '& > span:first-child': {
            opacity: 0.6,
        },
        '& > span:last-child > svg': {
            color: '#7fbf35',
        }
    },
    addItem: {
        color: '#2FA8AC',
        textDecoration: 'underline',
        display: 'flex',
        marginTop: '10px',

        '&>span': {
            marginLeft: '10px',
        }
    },
    taxInput: {
        width: '100px',

    },
    taxDiv: {
        display: 'flex',
        justifyContent: 'flex-end',
        marginTop: '20px',
    },
    totalDiv: {
        display: 'flex',
        justifyContent: 'flex-end',
        marginTop: '20px',
    },
    saveButtonWrapper: {
        marginTop: '20px',
    }

});