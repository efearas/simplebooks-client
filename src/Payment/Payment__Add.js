import React, { useEffect, useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { GlobalContext } from '../GlobalContext';
import Header from '../Header';
import Footer from '../Footer';
import DescriptionOutlinedIcon from '@material-ui/icons/DescriptionOutlined';
import { useHistory } from 'react-router-dom';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import SaveIcon from '@material-ui/icons/Save';
import TextField from '@material-ui/core/TextField';
import MyButton from '../Components/MyButton';
import Invoice__Add__CustomerSearch from '../Invoice/Invoice__Add__CustomerSearch';
import MyDatePicker from '../Components/MyDatePicker';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Product__List__InnerList from '../Product/Product__List__InnerList';
import EditIcon from '@material-ui/icons/Edit';
import Product__EditBeforeInvoiceAdd from '../Product/Product__EditBeforeInvoiceAdd';
import useFetch from '../CustomHooks/useFetch';
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import { Typography } from '@material-ui/core';
import { formatDate, formatTime } from '../Util/DateFunctions';
import { SettingsRemoteSharp } from '@material-ui/icons';
import OrDiv from '../Components/OrDiv';
import Button from '@material-ui/core/Button';


export default function Payment__Add(props) {
    const globalContext = useContext(GlobalContext);
    const classes = useStyles();
    const history = useHistory();
    const [paymentDate, setPaymentDate] = React.useState(new Date());
    const [total, setTotal] = useState(0);
    const [totalError, setTotalError] = useState('');
    const [customer, setCustomer] = useState('');
    const [customerError, setCustomerError] = useState('');
    const [selectedCustomer, setSelectedCustomer] = useState({});
    const [notes, setNotes] = useState("");
    const [editId, setEditId] = useState("-1");
    const myFetch = useFetch();


    useEffect(
        () => {
            const params = new URLSearchParams(window.location.search);
            if (params.has('id')) {
               
                let paymentId = params.get('id');
                setEditId(paymentId);



                let url = `https://3r3fjjde27.execute-api.us-east-1.amazonaws.com/payments/${paymentId}`

                myFetch(url, null, 'GET').then(
                    response => {
                      
                        response.json().then(data => {
                            console.log(data);

                            setCustomer(data.payment.customerName);
                            setPaymentDate(data.payment.paymentDate);
                            setNotes(data.payment.notes);
                            setTotal(data.payment.total);
                            setSelectedCustomer({
                                id: data.payment.customerId,
                                name: data.payment.customerName,
                            })
                        }
                        )
                    }
                );
            }
            else{
                setTotal('');
            }
        }, []
    )

    const deletePayment= () => {
        let url = "https://3r3fjjde27.execute-api.us-east-1.amazonaws.com/payments";
        if (editId != "-1") {

            let data = {
                paymentId: editId
            }
            myFetch(url, data, 'DELETE').then(
                response => {
                    console.log(response);
                  
                   
                        globalContext.dispatchMethod({ type: 'SET_MESSAGE', value: { message: 'Payment deleted.', showButton: false } });
                        setTimeout(() => {
                            history.push('/payment/list')
                        }, 2000);
                    
                }
            );
        }
    }

    const validate = () => {
        if (Object.keys(selectedCustomer).length == 0) {
            setCustomerError('Select a customer');
            return false;
        }
        else {
            setCustomerError('');
        }


        console.log(typeof(total));
        if(total == null || (typeof(total)=="string" && total.length==0)){
            setTotalError('Enter payment amount');
            return false;
        }else {
            setTotalError('');
        }


        return true;
    }

    const submit = () => {
        if (validate() == false) {
            return false;
        }


        

        let url = "https://3r3fjjde27.execute-api.us-east-1.amazonaws.com/payments";
        let data = {
            customerId: selectedCustomer.id,
            paymentDate: formatDate(paymentDate),
            total: parseFloat(total),
            createdOn: formatDate(new Date()) + ' ' + formatTime(new Date()),
            notes: notes,
        }


        console.log(data);

        if (editId == "-1") {
            myFetch(url, data, 'POST').then(
                response => {
                 
                    response.json().then(dataFromServer => {
                        console.log(dataFromServer);
                        globalContext.dispatchMethod({ type: 'SET_MESSAGE', value: { message: 'Payment saved', showButton: true, doNotShowCancel:true, doSmthIfOk: ()=>history.push('/payment/list') } })
                    }
                    )
                }
            );
        }
        else {
            data.paymentId = parseInt(editId);
            data.customerId = parseInt(data.customerId);
            data.total = parseFloat(data.total);
            myFetch(url, data, 'PUT').then(
                response => {
                
                    response.json().then(dataFromServer => {
                        console.log(dataFromServer);
                        globalContext.dispatchMethod({ type: 'SET_MESSAGE', value: { message: 'Payment saved', showButton: true, doNotShowCancel:true, doSmthIfOk: ()=>history.push('/payment/list') } })
                    }
                    )
                }
            );
        }
    }

    return (

        <div >
            <Header
                title="Add new payment"
                iconLeft={
                    <ArrowBackIcon onClick={() => history.push('/payment/list')}></ArrowBackIcon>
                }
                
            >
            </Header>
            <div className={classes.root}>
                <Invoice__Add__CustomerSearch
                    customer={customer}
                    setCustomer={setCustomer}
                    selectedCustomer={selectedCustomer}
                    setSelectedCustomer={setSelectedCustomer}
                    customerError={customerError}
                    editId={editId}
                ></Invoice__Add__CustomerSearch>
                <MyDatePicker date={paymentDate} setDate={setPaymentDate} label={'Payment date'}></MyDatePicker>
                <TextField id="notes-tb" value={notes} onChange={(e) => setNotes(e.target.value)} label="Notes"></TextField>
                <TextField id="payment-amount-tb" helperText={totalError} error={totalError != "" ? true : false} type="number" value={total} onChange={(e) => setTotal(e.target.value)} label="Payment amount"></TextField>
                <div className={classes.saveButtonWrapper}>
                    <MyButton id="save-button" onClick={() => submit()} > Save</MyButton>
                </div>
                {
                    editId != "-1" ?
                        <React.Fragment>
                            <OrDiv></OrDiv>
                            <Button className={classes.deleteButton}
                                onClick={() => globalContext.dispatchMethod({ type: 'SET_MESSAGE', value: { message: 'Do you really want to delete the payment?', showButton: true, doSmthIfOk: deletePayment, } })}
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
    },
    deleteButton:{
        marginTop: '20px',
    }

});