import React, { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import Home from '../src/Component/Home/Home'
import { Provider } from 'react-redux'
import store from './Component/redux/store'
import { createBrowserHistory } from 'history'
import Login from '../src/Component/auth/Login'
import { notification } from 'antd'
import Product from '../src/Component/Layout/Product'
import 'antd/dist/antd.css';
import { getData } from './utils/getUser'

function App(props) {
  const [IdDetail, setIdDetail] = useState()


  useEffect(() => {
  }, [])
  const history = createBrowserHistory()
  const redirecting = () => {
    if (!sessionStorage.getItem('token') || sessionStorage.getItem('token') === undefined || sessionStorage.getItem('token') === "undefined" || sessionStorage.getItem('token') === null) {
      return (
        <Redirect path="/" to={"/login"} />
      )
    }
  }
  return (
    <Provider store={store}>
      <Router
        // @ts-ignore
        history={history}>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/" component={Home} setIdDetail={setIdDetail} />
        </Switch>
        {/* {redirecting()} */}
        {sessionStorage.getItem("ID") ? null : <Redirect from='/' to="/login" />}
      </Router>
    </Provider>
  );
}

export default App;
