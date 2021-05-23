import React, { useEffect, useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { GlobalContext } from '../GlobalContext';
import Header from '../Header';
import DescriptionOutlinedIcon from '@material-ui/icons/DescriptionOutlined';
import Footer from '../Footer';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { useHistory } from 'react-router-dom';
//import { myFetch } from '../Util/MyFetch';
import Product__List__InnerList from './Product__List__InnerList';
import useFetch from '../CustomHooks/useFetch';


export default function Product__List(props) {
    const globalContext = useContext(GlobalContext);
    const classes = useStyles();
    const history = useHistory();
    const [displayAddProductForm, setDisplayAddProductForm] = useState(false);
    const myFetch = useFetch();

    return (
        <div>
            <Header
                title="Products"
                iconLeft={<DescriptionOutlinedIcon></DescriptionOutlinedIcon>}
                iconRight={<AddCircleIcon id="add-product-icon" onClick={() => setDisplayAddProductForm(true)}></AddCircleIcon>}
            >
            </Header>
            <Product__List__InnerList from={'productList'} 
            displayAddProductForm={displayAddProductForm}
            setDisplayAddProductForm={setDisplayAddProductForm}
            doNotDisplayHeader></Product__List__InnerList>
            <Footer></Footer>
        </div>
    )
}

const useStyles = makeStyles({
    invoiceLines: {
        marginTop: '120px',
        marginBottom: '150px',

    }
});