import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Navigation from './navigation';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
    <Navigation />
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();
