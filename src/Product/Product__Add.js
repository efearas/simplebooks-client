import React, { useEffect, useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { GlobalContext } from '../GlobalContext';
import MyModal from '../Components/MyModal';
import TextField from '@material-ui/core/TextField';
import MyButton from '../Components/MyButton';
import OrDiv from '../Components/OrDiv';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';
import useFetch from '../CustomHooks/useFetch';

export default function Product__Add(props) {
    const globalContext = useContext(GlobalContext);
    const classes = useStyles();
    const [productName, setProductName] = useState('');
    const [productNameError, setProductNameError] = useState('');
    const [price, setPrice] = useState(0);
    const [priceError, setPriceError] = useState('');
    const history = useHistory();
    const myFetch = useFetch();

    useEffect(
        () => {
            if (props.productInfo) {
                setProductName(props.productInfo.name);
                setPrice(props.productInfo.price);

            }
            else {
                setPrice('');
            }
        }, []
    )

    const deleteProduct = () => {
        let url = "https://3r3fjjde27.execute-api.us-east-1.amazonaws.com/products";


        let data = {
            productId: props.productInfo.id,
        }
        myFetch(url, data, 'DELETE').then(
            response => {
                console.log(response);

                if (response.status == 409) {
                    globalContext.dispatchMethod({ type: 'SET_MESSAGE', value: { message: 'This product has an invoice. You first need to delete product\'s invoices', showButton: true } });
                }
                else {
                    globalContext.dispatchMethod(
                        {
                            type: 'SET_MESSAGE',
                            value: {
                                message: 'Product deleted.',
                                showButton: true,
                                doSmthIfOk: props.closeForm(
                                    {
                                        id: props.productInfo.id,
                                        operation: 'DELETE',
                                    }
                                ),
                            }
                        });
                }
            }
        );


    }


    const validate = () => {
        if (productName == "") {
            setProductNameError("Please enter product name");
            return false;
        }
        else {
            setProductNameError("");
        }


        if (price == "") {
            setPriceError("Please enter price");
            return false;
        }
        else {
            setPriceError("");
        }
        return true;
    }

    const submit = () => {
        if (!validate()) {
            return false;
        }

        //sending product to server


        let url = "https://3r3fjjde27.execute-api.us-east-1.amazonaws.com/products";
        let data = {
            productName: productName,
            productPrice: parseFloat(price),
        }

        if (!props.productInfo) {
            myFetch(url, data, 'POST').then(
                response => {
                    if (response.status == 409) {
                        globalContext.dispatchMethod({ type: 'SET_MESSAGE', value: { message: 'This product has been added before.', showButton: true } });
                    }
                    else {
                        response.json().then(dataFromServer => {
                            //console.log(data);
                            props.closeForm(dataFromServer);
                        }
                        )
                    }
                }
            );
        }
        else {
            data.productId = props.productInfo.id;
            myFetch(url, data, 'PUT').then(
                response => {
                    if (response.status == 409) {
                        globalContext.dispatchMethod({ type: 'SET_MESSAGE', value: { message: 'There is a product with the same name.', showButton: true } });
                    }
                    else {
                        response.json().then(dataFromServer => {
                            //console.log(data);
                            props.closeForm({
                                id: props.productInfo.id,
                                name: productName,
                                price: price,
                                operation: 'UPDATE',
                            });
                        }
                        )
                    }
                }
            );
        }

    }


    return (
        <MyModal outsideClick={props.closeForm}>
            <div className={classes.root}>
                <TextField id="product-name" error={productNameError.length > 0 ? true : false} helperText={productNameError} label="New product name" onChange={(e) => setProductName(e.target.value)} value={productName}></TextField>
                <TextField id="product-price" type="number" error={priceError.length > 0 ? true : false} helperText={priceError} label="Price" onChange={(e) => setPrice(e.target.value)} value={price}></TextField>

                {!props.productInfo ?
                    <MyButton id="add-product-button" onClick={() => submit()} >Add product</MyButton>
                    : null
                }
                {props.productInfo ?
                    <React.Fragment>
                        <MyButton onClick={() => submit()} >Save</MyButton>
                        <OrDiv></OrDiv>
                        <Button className={classes.signUpButton}
                            onClick={() => globalContext.dispatchMethod({ type: 'SET_MESSAGE', value: { message: 'Do you really want to delete the product?', showButton: true, doSmthIfOk: deleteProduct, } })}
                            variant="outlined" color="primary">
                            Delete product
                        </Button>
                    </React.Fragment>
                    : null
                }
            </div>
        </MyModal>

    )
}

const useStyles = makeStyles({
    root: {
        display: 'flex',
        flexDirection: 'column',
        '&>*': {
            marginTop: '30px',
        }
    }
});