import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';           // ← must point at your App.tsx

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')      // ← index.html needs <div id="root"></div>
);
