import React from 'react';
import ReactDOM from 'react-dom/client';

import Home from './components/templates/home';
import './styles/global-styles.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Home />
  </React.StrictMode>
);
