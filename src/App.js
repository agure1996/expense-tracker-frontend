import React, {Component} from 'react';
import './App.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Home from './components/Home';
import Category from './components/Category';
import Expense from './components/Expense'

export default class App extends Component {
  state = {

  }
  render(){
    return (
      <Router>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='*' element={<Home/>} />
          <Route path='/categories' element={<Category/>} />
          <Route path='/expenses' element={<Expense/>} />
        </Routes>
      </Router>
      
  );
}
}


