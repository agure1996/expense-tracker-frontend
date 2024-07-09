import React from 'react';
import './App.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Home from './components/Home';
import Category from './components/category-page/Category';
import Expense from './components/expense-page/Expense'
import NotFound from './components/NotFound';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/categories' element={<Category />} />
        <Route path='/expenses' element={<Expense />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </Router>
  );

}
export default App;