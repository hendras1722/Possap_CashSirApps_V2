import React, { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Redirect, useHistory } from 'react-router-dom'
import Home from '../src/Component/Home/Home'
import { Provider } from 'react-redux'
import store from './Component/redux/store'
import CobaLagi from './Component/img/cobalagi'
import Category from '../src/Component/Home/Category'
import Login from '../src/Component/auth/Login'
import Product from '../src/Component/Layout/Product'
import axios from 'axios'
import { setUser, getUser } from './utils/getUser'
import 'antd/dist/antd.css';

const { REACT_APP_API_URL } = process.env

function App(props) {

  useEffect(() => {
    // getDatas()
  }, [])
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path="/user/:id" component={Home} />
          <Route path="/1" component={CobaLagi} />
          <Route path="/settings" component={Category} />
          <Route path="/login" component={Login} />
          <Route path="/?name=" component={Product} />
        </Switch>
        <Redirect path="/" to={"/user/" + localStorage.getItem('user-id')} />
      </Router>
    </Provider>
  );
}

export default App;
