import React from 'react'
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Homescreen from "./Components/Homescreen.js"
import SignUp from "./Components/SignUp"
import SignIn from "./Components/SignIn"
import ProductScreen from "./Components/ProductScreen.js"
import PaiementScreen from "./Components/PaiementScreen.js"
import ProfileScreen from "./Components/ProfileScreen.js"
import ProfileUpdateScreen from './Components/ProfileUpdateScreen.js';
import SellScreen from "./Components/SellScreen.js"
import ResultScreen from "./Components/ResultScreen.js"
import token from './reducers/Token.reducer.js'
import machin from './reducers/userInfo.reducer.js'
import product from './reducers/Article.reducer.js'
import subcat from './reducers/Filtre.reducer.js'
import Navigation from './Components/Nav.js'
import { Provider } from 'react-redux'

import { createStore, combineReducers } from 'redux';

const store = createStore(combineReducers({ token, product, subcat, machin }));

function App() {

  return (
    <Provider store={store}>
      <Router>
        <Switch>

          <Route component={Homescreen} path="/" exact />
          <Route component={ProductScreen} path="/productscreen" exact />
          <Route component={PaiementScreen} path="/paiementscreen" exact />
          <Route component={SignUp} path="/signup" exact />
          <Route component={SignIn} path="/signin" exact />
          <Route component={ProfileScreen} path="/profilescreen" exact />
          <Route component={ProfileUpdateScreen} path="/profileupdatescreen" exact />
          <Route component={SellScreen} path="/sellscreen" exact />
          <Route component={ResultScreen} path="/resultscreen" exact />

        </Switch>
      </Router>
    </Provider>
  );
}


export default App;
