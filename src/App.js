import React, {useReducer} from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import SignUp from './Login/SignUp';
import MaterialThemeProvider from './MaterialThemeProvider';
import MessageBox from './MessageBox';
import reducer from './Reducer';
import { GlobalContext } from './GlobalContext';
import Login from './Login/Login';
import Invoice__List from './Invoice/Invoice__List';
import Invoice__Add from './Invoice/Invoice__Add';
import Payment__List from './Payment/Payment__List';
import Payment__Add from './Payment/Payment__Add';
import Verify from './Login/Verify';
import Customer__List from './Customer/Customer__List';
import Product__List from './Product/Product__List';
import Customer__Add from './Customer/Customer__Add';
import Dashboard from './Dashboard/Dashboard';
import ForgotPassword from './Login/ForgotPassword';
import ResetPassword from './Login/ResetPassword';
import Company__Edit from './Company/Company__Edit';
import Support from './Support/Support';

function App() {
  const [globalState, dispatch] = useReducer(reducer,
    {
      menuLocation: { a: 1, b: 1 },
      messageOptions: { message: '', showButton: true },
      email: '',
      alias: '',
      customerSettings: {},
      userInteractedWithTheDocument: false,
      selectedGuiLanguage: 'en',
      oneSignalInitialized: false,
      ver: '2209201124',
    }
  );

  return (
    <div className="App">
      <GlobalContext.Provider value={{ globalState: globalState, dispatchMethod: dispatch }}>
        <MaterialThemeProvider>
          <BrowserRouter>
            <Switch>
              <Route path="/sign-up" component={SignUp} />
              <Route path="/login" component={Login} />
              <Route path="/invoice/list" component={Invoice__List} />
              <Route path="/invoice/add" component={Invoice__Add} />
              <Route path="/payment/list" component={Payment__List} />
              <Route path="/payment/add" component={Payment__Add} />
              <Route path="/verify" component={Verify} />
              <Route path="/customer/list" component={Customer__List} />
              <Route path="/customer/add" component={Customer__Add} />
              <Route path="/company/edit" component={Company__Edit} />
              <Route path="/product/list" component={Product__List} />
              <Route path="/dashboard" component={Dashboard} />
              <Route path="/forgot-password" component={ForgotPassword} />
              <Route path="/reset-password" component={ResetPassword} />
              <Route path="/support/support" component={Support} />
              <Route path="/" component={Login} />
            </Switch>
          </BrowserRouter>
          <MessageBox></MessageBox>
        </MaterialThemeProvider>
      </GlobalContext.Provider>
    </div>
  );
}

export default App;
