import React, { useEffect, useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { GlobalContext } from '../GlobalContext';
import Header from '../Header';
import Footer from '../Footer';
import DescriptionOutlinedIcon from '@material-ui/icons/DescriptionOutlined';
import { useHistory } from 'react-router-dom';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import TextField from '@material-ui/core/TextField';
import MyButton from '../Components/MyButton';
import Invoice__Add__CustomerSearch from './Invoice__Add__CustomerSearch';
import MyDatePicker from '../Components/MyDatePicker';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Product__List__InnerList from '../Product/Product__List__InnerList';
import EditIcon from '@material-ui/icons/Edit';
import Product__EditBeforeInvoiceAdd from '../Product/Product__EditBeforeInvoiceAdd';
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import { Typography } from '@material-ui/core';
import { formatDate, formatTime } from '../Util/DateFunctions';
import OrDiv from '../Components/OrDiv';
import Button from '@material-ui/core/Button';
import Email__Form from './Email__Form';
import useFetch from '../CustomHooks/useFetch';
import DateFnsAdapter  from '@date-io/date-fns';
//import isValid from 'date-fns-util/is_valid';

export default function Invoice__Add(props) {
    const globalContext = useContext(GlobalContext);
    const classes = useStyles();
    const history = useHistory();
    const [invoiceDate, setInvoiceDate] = React.useState(new Date());
    const [dueOn, setDueOn] = React.useState(new Date());
    const [customer, setCustomer] = useState('');
    const [customerError, setCustomerError] = useState('');
    const [selectedCustomer, setSelectedCustomer] = useState({});
    //const [addItemScreenOn, setAddItemScreenOn] = useState(false);
    const [state, setState] = useState("default");
    const [editProduct, setEditProduct] = useState({});
    const [notes, setNotes] = useState("");

    const [items, setItems] = useState([]); //fatura satirlari
    const [tax, setTax] = useState(0);
    const [editId, setEditId] = useState("-1");
    const [customerInfo, setCustomerInfo] = useState({});
    const [displayEmailForm, setDisplayEmailForm] = useState(false);
    const myFetch = useFetch();
    const dateFns = new DateFnsAdapter();




    useEffect(
        () => {
            const params = new URLSearchParams(window.location.search);
            if (params.has('id')) {
                let invoiceId = params.get('id');
                setEditId(invoiceId);
                //console.log(params.get('id'));


                let url = `https://3r3fjjde27.execute-api.us-east-1.amazonaws.com/invoices/${invoiceId}`

                myFetch(url, null, 'GET').then(
                    response => {

                        response.json().then(data => {
                            console.log(data);

                            setCustomer(data.invoice.customerName);
                            setSelectedCustomer({
                                id: data.invoice.customerId,
                                name: data.invoice.customerName,
                            });
                            setInvoiceDate(data.invoice.invoiceDate);
                            setDueOn(data.invoice.dueOn);
                            setNotes(data.invoice.notes);
                            setTax(data.invoice.taxRate);
                            let lineArr = [];
                            data.invoice.lines.map(
                                line =>
                                    lineArr.push({
                                        id: line.productId,
                                        name: line.productName,
                                        price: line.productPrice,
                                        quantity: line.productQuantity,
                                    })
                            )
                            setItems(lineArr);
                        }
                        )
                    }
                );
            }

        }, []
    )


    const addInvoiceLine = (item) => {
        console.log(item);
        let tempArr = [...items];
        tempArr.push(item);
        setItems(tempArr);
    }


    const updateLine = (product) => {
        let tempArr = [...items];
        tempArr.map(
            item => {
                if (item.id == product.id) {
                    item.quantity = product.quantity;
                    item.price = product.price;

                }
            }
        )
        setItems(tempArr);
    }

    const deleteLine = (productId) => {
        let tempArr = [...items];
        tempArr = tempArr.filter(item => item.id != productId);
        setItems(tempArr);
        setState('default');
    }


    const getTotal = () => {
        let total = 0;
        items.map(
            item => {
                total += parseFloat(item.price) * parseFloat(item.quantity)
            }
        )
        total = total + (total / 100 * tax);
        return total;
    }

    const deleteInvoice = () => {
        console.log('delete inv');
        let url = "https://3r3fjjde27.execute-api.us-east-1.amazonaws.com/invoices";
        if (editId != "-1") {

            let data = {
                invoiceId: editId
            }
            myFetch(url, data, 'DELETE').then(
                response => {

                    response.json().then(dataFromServer => {
                        globalContext.dispatchMethod({ type: 'SET_MESSAGE', value: { message: 'Invoice deleted', showButton: true, doNotShowCancel: true, doSmthIfOk: () => history.push('/invoice/list') } })
                    }
                    )
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

        
        if (!dateFns.isValid(dueOn)){
            return false;
        }

        if (!dateFns.isValid(invoiceDate)){
            return false;
        }

        if (items.length == 0) {
            globalContext.dispatchMethod({ type: 'SET_MESSAGE', value: { message: 'You have to add at least 1 item.', showButton: true } });
            return false;
        }
        return true;
    }

    const emailCheck = () => {
        let url = `https://3r3fjjde27.execute-api.us-east-1.amazonaws.com/customers/${selectedCustomer.id}`

        myFetch(url, null, 'GET').then(
            response => {

                response.json().then(data => {
                    console.log(data);
                    if (data.customer.email && data.customer.email != "") {
                        //setCustomerInfo(data.customer);
                        sendToServer(true);

                    }
                    else {
                        //show email form
                        setDisplayEmailForm(true);
                    }

                }
                )
            }
        );
    }


    const submit = () => {

        if (validate() == false) {
            return false;
        }

        emailCheck();
        return;
    }


    const sendToServer = (sendEmail) => {



        let url = "https://3r3fjjde27.execute-api.us-east-1.amazonaws.com/invoices";
        let data = {
            customerId: selectedCustomer.id,
            invoiceDate: formatDate(invoiceDate),
            dueOn: formatDate(dueOn),
            taxRate: parseFloat(tax),
            total: parseFloat(getTotal().toFixed(2)),
            createdOn: formatDate(new Date()) + ' ' + formatTime(new Date()),
            notes: notes,
            customerName: selectedCustomer.name,
            sendInvoiceMail: sendEmail,
            lines: [],
        }

        items.map(
            item => {
                let newLine = {
                    productId: item.id,
                    productPrice: parseFloat(item.price),
                    lineTotal: item.price * item.quantity,
                    productQuantity: parseFloat(item.quantity),
                    productName: item.name,
                }
                data.lines.push(newLine);
            }
        )

        console.log(data);




        if (editId == "-1") {
            let message = 'Invoice saved ' + (sendEmail ? ' and sent to customer' : '');
            myFetch(url, data, 'POST').then(
                response => {

                    response.json().then(dataFromServer => {
                        console.log(dataFromServer);
                        //props.closeForm(data);
                        globalContext.dispatchMethod({ type: 'SET_MESSAGE', value: { message: message, showButton: true, doNotShowCancel: true, doSmthIfOk: () => history.push('/invoice/list') } })
                    }
                    )
                }
            );
        }
        else {
            data.invoiceId = editId;
            myFetch(url, data, 'PUT').then(
                response => {

                    response.json().then(dataFromServer => {
                        console.log(dataFromServer);
                        //props.closeForm(data);
                        globalContext.dispatchMethod({ type: 'SET_MESSAGE', value: { message: 'Invoice saved', showButton: true, doNotShowCancel: true, doSmthIfOk: () => history.push('/invoice/list') } })
                    }
                    )
                }
            );
        }

    }


    return (
        <React.Fragment>
            {
                state == "default" ?
                    <div >
                        <Header
                            title="Add new invoice"
                            iconLeft={
                                <ArrowBackIcon onClick={() => history.push('/invoice/list')}></ArrowBackIcon>
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
                            <MyDatePicker date={invoiceDate} setDate={setInvoiceDate} label={'Invoice date'}></MyDatePicker>
                            <MyDatePicker date={dueOn} setDate={setDueOn} label={'Due on'}></MyDatePicker>
                            <TextField id="notes" value={notes} onChange={(e) => setNotes(e.target.value)} label="Notes"></TextField>
                            <div className={classes.lines}>
                                {
                                    items.map(
                                        item =>
                                            <div key={item.id} onClick={() => { setState("edit line"); setEditProduct(item) }} className={classes.line}>
                                                <div className={classes.firstLine}>
                                                    <span>{item.name}</span>
                                                    <span>{(Number.parseFloat(item.price) * Number.parseFloat(item.quantity)).toFixed(2)}</span>
                                                </div>
                                                <div onClick={() => setState()} className={classes.secondLine}>
                                                    <span>{item.quantity}x  £{Number.parseFloat(item.price).toFixed(2)} for each</span>
                                                    <span><EditIcon></EditIcon></span>
                                                </div>
                                            </div>
                                    )
                                }

                            </div>
                            <div id="add-item-div" onClick={() => setState("add line")} className={classes.addItem}>
                                <AddCircleIcon></AddCircleIcon>
                                <span>Add item</span>
                            </div>
                            <div className={classes.taxDiv}>
                                <FormControl>
                                    <InputLabel htmlFor="standard-adornment-tax">Tax</InputLabel>
                                    <Input
                                        className={classes.taxInput}
                                        id="tax"
                                        value={tax}
                                        onChange={(e) => setTax(e.target.value)}
                                        endAdornment={<InputAdornment position="end">%</InputAdornment>}

                                    />
                                </FormControl>
                            </div>
                            <div className={classes.totalDiv}>
                                <Typography id="total-text" variant="h6">
                                    Total:{' '} 
                                </Typography>
                                <Typography id="total-value" variant="h6">
                                    {getTotal().toFixed(2)}
                                </Typography>
                            </div>
                            <div className={classes.saveButtonWrapper}>
                                <MyButton id="save-button" onClick={() => submit()} > Save</MyButton>
                            </div>
                            {
                                editId != "-1" ?
                                    <React.Fragment>
                                        <OrDiv></OrDiv>
                                        <Button className={classes.signUpButton}
                                            onClick={() => globalContext.dispatchMethod({ type: 'SET_MESSAGE', value: { message: 'Do you really want to delete the invoice?', showButton: true, doSmthIfOk: deleteInvoice, } })}
                                            variant="outlined" color="primary">
                                            Delete
                                    </Button>
                                    </React.Fragment>
                                    : null
                            }



                        </div>
                    </div>
                    : null
            }
            {
                state == "add line" ?

                    <div >

                        <div className={classes.productList}>
                            <Product__List__InnerList
                                addToInvoice={addInvoiceLine}
                                leftIconAction={() => setState("default")}>

                            </Product__List__InnerList>
                        </div>
                    </div>
                    : null
            }
            {
                state == "edit line" ?

                    <div >

                        <div className={classes.productList}>
                            <Product__EditBeforeInvoiceAdd
                                updateLine={updateLine}
                                deleteLine={deleteLine}
                                product={editProduct}
                                closeForm={() => setState("default")}
                            />


                        </div>
                    </div>
                    : null
            }
            {
                displayEmailForm ?
                    <Email__Form outsideClick={() => setDisplayEmailForm(false)} customerId={selectedCustomer.id} sendToServer={sendToServer} ></Email__Form>
                    : null
            }

        </React.Fragment>

    )
}

const useStyles = makeStyles({
    root: {
        marginTop: '70px',
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
    }
    ,

    signUpButton: {
        fontWeight: 600,
        marginTop: '20px',
    }
});