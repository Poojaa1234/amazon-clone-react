import React, {useEffect} from 'react';
import Header from './Header';
import Home from './Home';
import Checkout from './Checkout';
import {BrowserRouter,Route,Switch} from 'react-router-dom';
import Login from './Login';
import { auth } from './firebase';
import { useStateValue } from './StateProvider';
import Payment from './Payment';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js'
import Orders from './Orders';

const promise = loadStripe('pk_test_51IqgItSJC3ZBNQN5PRAANjHM2aP3ZJRwk4ay5zhpZ0t6FkUu13OMbXSxCCnNypf451K4Gb3ZWaN1ioBHAbBn7Cj900SfPEH3Pi');

function App() {

  const [{},dispatch]=useStateValue();

  useEffect(() => {
    
    auth.onAuthStateChanged(authUser => {
      console.log("The user is ",authUser);

      if(authUser){
        // The user just logged in / The user was logged in
        dispatch({
          type:'SET_USER',
          user: authUser
        })

      }else{
        //The user is logged out
        dispatch({
          type:'SET_USER',
          user: null
        })
      }
    })
  }, [])

  return (
    <>
    {/* Header */}
    {/* Homw */}
    <BrowserRouter>
    
    <div className="app">
    
    <Switch>
    <Route exact path="/">
    <Header/>
    <Home />
    </Route>
    <Route exact path="/login">
    <Login />
    </Route>
    <Route path="/checkout">
    <Header/>
    <Checkout />
    </Route>
    <Route path="/payment">
    <Header/>
    <Elements stripe={promise}>
      <Payment />
    </Elements>
    </Route>
    <Route path="/orders">
    <Header/>
    <Orders/>
    </Route>
    </Switch>
    </div>
    </BrowserRouter>
    </>
    
  );
}

export default App;
