import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Home from '../src/Component/Home/Home'
import { Provider } from 'react-redux'
import store from './Component/redux/store'

// import modalBook from './Component/modal/Category';
import HomeAdm from './Component/Home/HomeAdm'
import Category from '../src/Component/Home/Category'

function App() {
  return (
    <Provider store={store}>

      <Router>
        <Route exact path="/" component={Home} />
        <Route path="/Cashier" component={HomeAdm} />
        <Route path="/Table" component={Category} />
        {/* <Route path="/AdminCategory" component={modalBook} /> */}
      </Router>

    </Provider>
  );
}

export default App;
