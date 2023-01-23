import React from 'react';
// import { Route } from 'react-router-dom';
// import NewsPage from './pages/NewsPage';
import ColorBox from './components/ColorBox';
import ColorContext from './contexts/color';

const App = () => {
  // return <Route path="/:category?" component={NewsPage} />;
  <ColorContext.Provider value={{ color: 'red ' }}>
    <div>
      <ColorBox />
    </div>
    ;
  </ColorContext.Provider>;
};

export default App;
