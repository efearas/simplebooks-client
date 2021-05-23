import React, { useEffect, useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { GlobalContext } from '../GlobalContext';
import Header from '../Header';
import { useHistory } from 'react-router-dom';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import TextField from '@material-ui/core/TextField';
import MyButton from '../Components/MyButton';
import useFetch from '../CustomHooks/useFetch';
import Footer from '../Footer';



export default function Company__Edit(props) {
    const globalContext = useContext(GlobalContext);
    const classes = useStyles();
    const history = useHistory();
    const [companyName, setCompanyName] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");
    const myFetch = useFetch();
    const [companyNameError, setCompanyNameError] = useState('');



    useEffect(
        () => {
            let url = `https://3r3fjjde27.execute-api.us-east-1.amazonaws.com/companies`

            myFetch(url, null, 'GET').then(
                response => {

                    response.json().then(data => {
                        console.log(data);

                        setCompanyName(data.company.name);
                        setPhone(data.company.phone);
                        setAddress(data.company.address);

                    }
                    )
                }
            );
        }, []
    )
    const validate = () => {
        if (companyName == "") {
            setCompanyNameError('Please enter company name');
            return false;
        }
        else {
            setCompanyNameError('');
        }
        return true;
    }

    const submit = () => {
        if (validate() == false) {
            return false;
        }


        let url = "https://3r3fjjde27.execute-api.us-east-1.amazonaws.com/companies";
        let data = {
            companyName: companyName,
            phone: phone,
            address: address,
        }


        console.log(data);


        myFetch(url, data, 'PUT').then(
            response => {

                response.json().then(dataFromServer => {
                    console.log(dataFromServer);
                    globalContext.dispatchMethod({ type: 'SET_MESSAGE', value: { message: 'Company data saved', showButton: true, doNotShowCancel: true, } })
                }
                )
            }
        );


    }

    return (

        <div >
            <Header
                title="Edit company info"
                iconLeft={
                    <ArrowBackIcon onClick={() => history.goBack()}></ArrowBackIcon>
                }

            >
            </Header>
            <div className={classes.root}>
                <TextField helperText={companyNameError} error={companyNameError != "" ? true : false} value={companyName} onChange={(e) => setCompanyName(e.target.value)} label="Company name"></TextField>
                <TextField value={phone} onChange={(e) => setPhone(e.target.value)} label="Phone"></TextField>
                <TextField multiline rows={4} value={address} onChange={(e) => setAddress(e.target.value)} label="Adress"></TextField>

                <div className={classes.saveButtonWrapper}>
                    <MyButton onClick={() => submit()} > Save</MyButton>
                </div>

            </div>
            <Footer></Footer>
        </div>


    )
}

const useStyles = makeStyles({
    root: {
        marginTop: '80px',
        marginBottom: '70px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        '&>*': {
            width: '90%',
            marginBottom: '30px',
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
    deleteButton: {
        marginTop: '20px',
    }

});