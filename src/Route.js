import React, { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Redirect, useHistory } from 'react-router-dom'
import Login from '../src/Component/auth/Login'
import Home from '../src/Component/Home/Home'
import { Provider } from 'react-redux'
import store from './Component/redux/store'
import 'antd/dist/antd.css';

const { REACT_APP_API_URL } = process.env

function RouteIn(props) {
    const parseJwt = (token) => {
        let base64Url = token.split('.')[1];
        let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        let jsonPayload = base64 ? decodeURIComponent(atob(base64).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join('')) : null;

        return JSON.parse(jsonPayload);
    };
    const tokenId = sessionStorage.getItem("token") ? parseJwt(sessionStorage.getItem("token")).id : 'tidak valid'

    const redirecting = () => {
        if (!sessionStorage.getItem('token') || sessionStorage.getItem('token') === undefined || sessionStorage.getItem('token') === "undefined" || sessionStorage.getItem('token') === null) {
            return (
                <Redirect path="/user/" to={"/login"} />
            )
        } else {
            return (
                <Redirect path="/user/" to={"/user/" + tokenId} />
            )
        }
    }
    return (
        <Provider store={store}>
            <Router>
                <Switch>
                    <Route exact path="/user/:id" component={Home} />
                    <Route path="/login" component={Login} />
                </Switch>
                {redirecting()}
            </Router>
        </Provider>
    );
}

export default RouteIn;
