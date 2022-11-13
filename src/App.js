//import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './Components/Home/Home';
import NoMatch from './Components/NoMatch/NoMatch';
import PrivateRoute from './Components/PrivateRoute/PrivateRoute';
//import createContext from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import React, { createContext, useState } from 'react';
import Result from './Components/Result/Result';
import LoginPage from './Components/LoginPage/LoginPage';
import Payment from './Components/Payment/Payment';

export const UserContext = createContext('');


function App() {
  const [loggedinUser, setLoggedinUser] = useState({});
  return (
    <UserContext.Provider value={[loggedinUser, setLoggedinUser]}>
      <Router>
        <Switch>

          <Route exact path="/home">
            <Home />
          </Route>

          <PrivateRoute path="/result/:rideId">
            <Result></Result>
          </PrivateRoute>

          <Route path="/login">
            <LoginPage></LoginPage>
          </Route>

          <Route path="/payment">
            <Payment></Payment>
          </Route>

         <Route path="/">
           <Home></Home>
         </Route>

          <Route path="*">
            <NoMatch></NoMatch>
          </Route>

        </Switch>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
