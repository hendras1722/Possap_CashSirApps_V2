import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Home from '../src/Component/Home/Home'
import { Provider } from 'react-redux'
import store from './Component/redux/store'

function App() {
  return (
    <Provider store={store}>

      <Router>

        <Route exact path="/" component={Home} />

      </Router>

    </Provider>
  );
}

export default App;
