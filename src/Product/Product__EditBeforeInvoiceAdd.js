import React, { useEffect, useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { GlobalContext } from '../GlobalContext';
import MyModal from '../Components/MyModal';
import TextField from '@material-ui/core/TextField';
import MyButton from '../Components/MyButton';
import useFetch from '../CustomHooks/useFetch';

export default function Product__EditBeforeInvoiceAdd(props) {
    const globalContext = useContext(GlobalContext);
    const classes = useStyles();
    const [price, setPrice] = useState(0);
    const [priceError, setPriceError] = useState('');
    const [quantity, setQuantity] = useState("1");
    const [quantityError, setQuantityError] = useState('');
    const myFetch = useFetch();

    const validate = () => {

        if (quantity == "") {
            setQuantityError("Please enter quantity");
            return false;
        }
        else {
            setQuantityError("");
        }

        
        if(price == null || (typeof(price)=="string" && price.length==0)){
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

        if (!props.updateLine) {
            props.addToInvoice({
                id: props.product.id,
                name: props.product.name,
                price: parseFloat(price),
                quantity: parseFloat(quantity),
            }
            )
            props.submit();
        }
        else {
            props.updateLine({
                id: props.product.id,
                name: props.product.name,
                price: parseFloat(price),
                quantity: parseFloat(quantity),
            }
            )
            props.closeForm();
        }

        
    }

    useEffect(
        () => {
            if(props.product.price){
                setPrice(props.product.price);
            }
            
            if(props.product.quantity){
                setQuantity(props.product.quantity);
            }
        }, []
    )

    return (
        <MyModal outsideClick={props.closeForm}>
            <div className={classes.root}>
                <span>
                    {props.product.name.substring(0,25)+ (props.product.name.length>25 ? '...' :'')}
                </span>
                <TextField id="product-price" type="number" error={priceError.length > 0 ? true : false} helperText={priceError} label="Price" onChange={(e) => setPrice(e.target.value)} value={price}></TextField>
                <TextField id="product-quantity" type="number" error={quantityError.length > 0 ? true : false} helperText={quantityError} label="Quantity" onChange={(e) => setQuantity(e.target.value)} value={quantity}></TextField>
                <MyButton id="add-product-line-button" onClick={() => submit()} >
                    {
                        props.updateLine ? 'Update line' : 'Add to invoice'
                    }
                </MyButton>
                {
                    props.deleteLine
                        ?
                        <MyButton onClick={() => props.deleteLine(props.product.id)} variant="outlined">Delete line</MyButton>
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