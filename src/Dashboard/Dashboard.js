import React, { useEffect, useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { GlobalContext } from '../GlobalContext';
import Header from '../Header';
import DescriptionOutlinedIcon from '@material-ui/icons/DescriptionOutlined';
import Invoice__Search from '../Invoice/Invoice__Search';
import Footer from '../Footer';
import List__Line from '../Components/List__Line';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { useHistory } from 'react-router-dom';
//import { myFetch } from '../Util/MyFetch';
import useFetch from '../CustomHooks/useFetch';
import useScript from '../CustomHooks/useScript';
import NoDataImage from '../Components/NoDataImage';

export default function Dashboard(props) {
    const globalContext = useContext(GlobalContext);
    const classes = useStyles();
    const history = useHistory();
    const loadScript = useScript();
    const [invoiceTotal, setInvoiceTotal] = useState(0);
    const [paymentPercentage, setPaymentPercentage] = useState('0%');
    const myFetch = useFetch();
    let dataArr = [];

    useEffect(
        () => {

            let url = "https://3r3fjjde27.execute-api.us-east-1.amazonaws.com/dashboard/product-by-revenue";

            myFetch(url, null, 'GET').then(
                response => {

                    response.json().then(data => {
                        //console.log(data);
                        let tempArr = [['Task', 'Hours per Day'],];
                        data.result.map(
                            product =>
                                tempArr.push(
                                    [
                                        product.productName, parseFloat(product.productRevenue)
                                    ],
                                )
                        )

                        dataArr = [...tempArr];
                        runChart();
                    }
                    )
                }
            );
        }, []
    )

    useEffect(
        () => {

            let url = "https://3r3fjjde27.execute-api.us-east-1.amazonaws.com/dashboard/invoice-payment-totals";

            myFetch(url, null, 'GET').then(
                response => {

                    response.json().then(data => {
                        console.log(data);
                        if (data.result.invoiceTotal) {
                            setInvoiceTotal(data.result.invoiceTotal);
                            if (data.result.paymentTotal && data.result.invoiceTotal) {
                                let percentage = parseFloat(data.result.paymentTotal) / parseFloat(data.result.invoiceTotal) * 100;
                                console.log(percentage);
                                setPaymentPercentage(percentage.toFixed(0) + '%');
                            }
                        }
                    }
                    )
                }
            );
        }, []
    )


    const runChart = () => {
        loadScript('https://www.gstatic.com/charts/loader.js');

        let intervalId = setInterval(() => {
            if (window.google && window.google.charts) {
                clearInterval(intervalId);
                window.google.charts.load('current', { 'packages': ['corechart'] });
                window.google.charts.setOnLoadCallback(drawChart);
            }
            //console.log('in interval');
        }, 50);
    }



    function drawChart() {

        var data = window.google.visualization.arrayToDataTable(dataArr);

        var options = {
            //title: 'My Daily Activities',
            legend: {
                position: 'bottom',
                maxLines: 2,
                alignment: 'start',
            },
            //height: 400,
            //width: 375,
            is3D: true,
            chartArea: {
                left: 0,
                top: 0,
                width: '100%',
                height: '80%',
            },
            //colors: ['#2d572a', '#356832', '#3e793b', '#478a43', '#509c4c', '#59ad54',],
            colors: ['#185456', '#217678', '#2a979b', '#44b1b4', '#6dc2c5', '#97d4d6',],
        };

        var chart = new window.google.visualization.PieChart(document.getElementById('piechart'));

        chart.draw(data, options);
    }

    return (
        <div>
            <Header
                title="Dashboard"
                iconLeft={<DescriptionOutlinedIcon></DescriptionOutlinedIcon>}
                //iconRight={<AddCircleIcon onClick={() => history.push('/customer/add')}></AddCircleIcon>}
            >
            </Header>

            {
                invoiceTotal == 0 ?

                    <NoDataImage
                        message="Looks like no invoice yet! You will see your dashboard here after your first invoice."
                        svgImage={svgDashboard}></NoDataImage>
                    :
                    <React.Fragment>
                        <div className={classes.subTitle} style={{ marginTop: '70px' }}>
                            Invoices
            </div>
                        <div style={{ padding: '10px' }}>
                            <div className={classes.horizontalBarChart}>
                                <div id="payment-percentage" style={{ backgroundColor: '#44b1b4', width: paymentPercentage, display: 'flex', alignItems: 'center' }}>{paymentPercentage}</div>
                                <div style={{ flexGrow: 1, textAlign: 'right', whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                                    <div>
                                        £ {invoiceTotal}
                                    </div>
                                </div>
                            </div>
                            <div style={{ width: '90%', border: '0px solid', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px', }}>
                                <div style={{ backgroundColor: 'white', display: 'flex', alignItems: 'center', justifyContent: 'start' }}>
                                    <div style={{ backgroundColor: '#44b1b4', width: '30px', height: '5px', minHeight: '15px', border: '1px grey solid' }}>

                                    </div>
                                </div>
                                <div style={{ marginLeft: '20px' }}>
                                    Collected
                    </div>
                                <div style={{ marginLeft: '40px', backgroundColor: 'white', width: '30px', height: '5px', minHeight: '15px', border: '1px grey solid' }}>

                                </div>

                                <div style={{ marginLeft: '20px', textAlign: 'right' }}>
                                    Receivables
                    </div>



                            </div>

                        </div>

                        <div className={classes.subTitle}>
                            Products
            </div>
                        <div style={{ marginBottom: '100px', display: 'flex', justifyContent: 'center', width: '100%', }}>
                            <div id="piechart" style={{ width: '80%', height: '400px', border: '0px solid' }}></div>
                        </div>
                    </React.Fragment>
            }
            <Footer></Footer>
        </div >
    )
}

const useStyles = makeStyles({
    invoiceLines: {
        marginTop: '120px',
        marginBottom: '70px',

    },
    subTitle: {
        fontSize: '1.2rem',
        fontFamily: 'Open Sans',
        margin: '5px 0',
        marginTop: '20px',
        marginLeft: '10px',
        fontWeight: 600,
        color: '#757575',
    },
    horizontalBarChart: {
        width: '90%',
        border: '0px solid',
        display: 'flex',
        marginBottom: '10px',
        border: '1px solid #dadada',
        minHeight: '30px',
        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
        borderTop: 0,
        fontSize: '0.9rem',
    }
});

const svgDashboard = <svg id="ba525f3b-7565-476d-a1a9-f6eeabefee00" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" width="90%" viewBox="0 0 706.53539 428.76001"><path d="M862.452,235.62h-607a8.72766,8.72766,0,0,0-8.71972,8.72V655.66a8.72766,8.72766,0,0,0,8.71972,8.72h607a8.71244,8.71244,0,0,0,6.63037-3.06,2.0459,2.0459,0,0,0,.18995-.24,8.1667,8.1667,0,0,0,1.25-2.11005,8.50722,8.50722,0,0,0,.65966-3.31V244.34A8.72953,8.72953,0,0,0,862.452,235.62Zm6.24024,420.04a6.17527,6.17527,0,0,1-1.03028,3.42,6.44588,6.44588,0,0,1-2.35986,2.12,6.1843,6.1843,0,0,1-2.8501.69h-607a6.23757,6.23757,0,0,1-6.23-6.23V244.34a6.23757,6.23757,0,0,1,6.23-6.23h607a6.23944,6.23944,0,0,1,6.24024,6.23Z" transform="translate(-246.73231 -235.62)" fill="#3f3d56" /><rect x="1.24265" y="34.94921" width="621.95676" height="2.49281" fill="#3f3d56" /><circle cx="22.43155" cy="18.6961" r="7.47844" fill="#3f3d56" /><circle cx="43.93206" cy="18.6961" r="7.47844" fill="#3f3d56" /><circle cx="65.43257" cy="18.6961" r="7.47844" fill="#3f3d56" /><path d="M321.78393,427.36614h-22a4.505,4.505,0,0,1-4.5-4.5v-22a4.505,4.505,0,0,1,4.5-4.5h22a4.505,4.505,0,0,1,4.5,4.5v22A4.505,4.505,0,0,1,321.78393,427.36614Z" transform="translate(-246.73231 -235.62)" fill="#59ad54" /><path d="M321.78393,484.36614h-22a4.505,4.505,0,0,1-4.5-4.5v-22a4.505,4.505,0,0,1,4.5-4.5h22a4.505,4.505,0,0,1,4.5,4.5v22A4.505,4.505,0,0,1,321.78393,484.36614Z" transform="translate(-246.73231 -235.62)" fill="#3f3d56" /><path d="M321.78393,541.36614h-22a4.505,4.505,0,0,1-4.5-4.5v-22a4.505,4.505,0,0,1,4.5-4.5h22a4.505,4.505,0,0,1,4.5,4.5v22A4.505,4.505,0,0,1,321.78393,541.36614Z" transform="translate(-246.73231 -235.62)" fill="#ccc" /><path d="M465.78393,416.36614h-106a4.5,4.5,0,1,1,0-9h106a4.5,4.5,0,0,1,0,9Z" transform="translate(-246.73231 -235.62)" fill="#ccc" /><path d="M465.78393,473.36614h-106a4.5,4.5,0,1,1,0-9h106a4.5,4.5,0,0,1,0,9Z" transform="translate(-246.73231 -235.62)" fill="#ccc" /><path d="M465.78393,530.36614h-106a4.5,4.5,0,1,1,0-9h106a4.5,4.5,0,0,1,0,9Z" transform="translate(-246.73231 -235.62)" fill="#ccc" /><path d="M829.55378,407.43591a10.09326,10.09326,0,0,1,1.41075.78731l44.8523-19.1432,1.60093-11.81526,17.92157-.10956-1.05874,27.0982-59.19986,15.65584a10.60791,10.60791,0,0,1-.44749,1.20835,10.2346,10.2346,0,1,1-5.07946-13.68168Z" transform="translate(-246.73231 -235.62)" fill="#ffb8b8" /><polygon points="655.125 417.376 642.865 417.375 637.033 370.087 655.127 370.088 655.125 417.376" fill="#ffb8b8" /><path d="M634.10773,413.87226H657.7516a0,0,0,0,1,0,0v14.88687a0,0,0,0,1,0,0H619.22087a0,0,0,0,1,0,0v0A14.88686,14.88686,0,0,1,634.10773,413.87226Z" fill="#2f2e41" /><polygon points="702.805 413.911 690.604 415.113 680.163 368.625 698.17 366.851 702.805 413.911" fill="#ffb8b8" /><path d="M928.987,647.64055h23.64387a0,0,0,0,1,0,0v14.88687a0,0,0,0,1,0,0H914.10012a0,0,0,0,1,0,0v0A14.88686,14.88686,0,0,1,928.987,647.64055Z" transform="translate(-306.45017 -140.97479) rotate(-5.62529)" fill="#2f2e41" /><circle cx="658.53741" cy="66.92823" r="24.56103" fill="#ffb8b8" /><path d="M886.85757,643.43243a4.47086,4.47086,0,0,1-4.415-3.69726c-6.34571-35.22559-27.0879-150.40528-27.584-153.5957a1.427,1.427,0,0,1-.01562-.22168v-8.5879a1.489,1.489,0,0,1,.27929-.87207l2.74024-3.83789a1.47848,1.47848,0,0,1,1.14355-.625c15.62207-.73242,66.78418-2.8789,69.25586.209h0c2.48242,3.10351,1.60547,12.50683,1.4043,14.36035l.00976.19336,22.98536,146.99512a4.51239,4.51239,0,0,1-3.71485,5.13476L934.59,641.25275a4.52127,4.52127,0,0,1-5.02539-3.09278c-4.44043-14.18847-19.32911-61.918-24.48926-80.38672a.49922.49922,0,0,0-.98047.13868c.25781,17.60546.88086,62.52343,1.0957,78.03711l.02344,1.67089a4.51811,4.51811,0,0,1-4.09277,4.53614l-13.84375,1.25781C887.13687,643.42657,886.99625,643.43243,886.85757,643.43243Z" transform="translate(-246.73231 -235.62)" fill="#2f2e41" /><path id="e15ec395-f7cd-4347-89a2-a03d95a452a7" data-name="Path 99" d="M889.68211,336.76678c-4.28634,2.548-6.85116,7.23043-8.32276,11.9951a113.681,113.681,0,0,0-4.88444,27.15943l-1.55553,27.60021-19.25508,73.1699c16.6887,14.1207,26.31542,10.91153,48.78049-.63879S929.477,479.9038,929.477,479.9038l4.49235-62.25839,6.41838-68.03232a30.16418,30.16418,0,0,0-4.86143-4.67415,49.65848,49.65848,0,0,0-42.44229-8.99538Z" transform="translate(-246.73231 -235.62)" fill="#b3b3b3" /><path d="M883.42783,422.21345a10.52612,10.52612,0,0,1,1.50061.70389l44.34832-22.1972.736-12.02551,18.2938-1.26127.9804,27.4126-59.26586,19.59937a10.4958,10.4958,0,1,1-6.59329-12.23188Z" transform="translate(-246.73231 -235.62)" fill="#ffb8b8" /><path id="bf6aefed-5d84-44a4-8c4e-9d1f3daa58d8" data-name="Path 101" d="M940.06674,349.92449c10.91151,3.85117,12.83354,45.57369,12.83354,45.57369-12.83671-7.06036-28.24139,4.49318-28.24139,4.49318s-3.20917-10.91153-7.06034-25.03223a24.52987,24.52987,0,0,1,5.13436-23.10625S929.15523,346.07093,940.06674,349.92449Z" transform="translate(-246.73231 -235.62)" fill="#b3b3b3" /><path id="f516f9fe-dc87-4aac-a802-2e179304beb7" data-name="Path 102" d="M927.29244,309.0435c-3.06-2.44837-7.23517,2.00173-7.23517,2.00173l-2.4484-22.03349s-15.301,1.83291-25.0935-.61161-11.32255,8.87513-11.32255,8.87513a78.58075,78.58075,0,0,1-.30583-13.77092c.61159-5.50838,8.56839-11.01675,22.6451-14.68932S924.953,281.056,924.953,281.056C934.74664,285.95175,930.35243,311.49189,927.29244,309.0435Z" transform="translate(-246.73231 -235.62)" fill="#2f2e41" /><path d="M834.53589,470.86614c.1582-2.64728.248-5.31293.248-8a132.00012,132.00012,0,0,0-132-132v140Z" transform="translate(-246.73231 -235.62)" fill="#59ad54" /><path d="M692.78393,482.86614v-140a132,132,0,1,0,131.752,140Z" transform="translate(-246.73231 -235.62)" fill="#3f3d56" /></svg>
