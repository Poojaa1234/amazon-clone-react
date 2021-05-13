import React, {useEffect} from 'react';
import Header from './Header';
import Home from './Home';
import Checkout from './Checkout';
import {BrowserRouter,Route,Switch} from 'react-router-dom';
import Login from './Login';
import { auth } from './firebase';
import { useStateValue } from './StateProvider';


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
    </Switch>
    </div>
    </BrowserRouter>
    </>
    
  );
}

export default App;
