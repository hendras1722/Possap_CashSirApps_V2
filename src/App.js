import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Home from '../src/Component/Home/Home'
import { Provider } from 'react-redux'
import store from './Component/redux/store'

// import modalBook from './Component/modal/Category';
import CobaLagi from './Component/img/cobalagi'
import Category from '../src/Component/Home/Category'
import Login from '../src/Component/auth/Login'

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Route exact path="/" component={Home} />
        <Route path="/1" component={CobaLagi} />
        <Route path="/settings" component={Category} />
        <Route path="/login" component={Login} />
      </Router>

    </Provider>
  );
}

export default App;
