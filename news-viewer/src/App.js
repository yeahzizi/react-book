import React from 'react';
import { Route } from 'react-router-dom';
// import Categories from './components/Categories';
// import axios from 'axios';
import NewsPage from './pages/NewsPage';
const App = () => {
  return <Route path="/:category?" component={NewsPage} />;
};

export default App;
