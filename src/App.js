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
  const [nameUserNya, setNameUser] = useState()
  const [IdDetail, setIdDetail] = useState()

  const NameUser = async () => {
    console.log(IdDetail, 'inididet')

    // const split = pathname.split('/')
    // const result = split[split.length - 1]
    // console.log(result)
    // const { data } = await getData(`/user?detail=${result}`)
    // setNameUser(data.result)
  }
  useEffect(() => {
    NameUser()
  }, [])
  const redirecting = () => {
    if (!sessionStorage.getItem('token') || sessionStorage.getItem('token') === undefined || sessionStorage.getItem('token') === "undefined" || sessionStorage.getItem('token') === null) {
      return (
        <Redirect path="/" to={"/login"} />
      )
    } else {
      return (
        <Redirect path="/" to={"/user/:id"} />
      )
    }
  }
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path="/user/:id" component={Home} setIdDetail={setIdDetail} />
          <Route path="/1" component={CobaLagi} />
          <Route path="/settings" component={Category} />
          <Route path="/login" component={Login} />
          <Route path="/?name=" component={Product} />
        </Switch>
        {redirecting()}
      </Router>
    </Provider>
  );
}

export default App;
