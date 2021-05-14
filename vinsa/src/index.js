import React from 'react';
import ReactDOM from 'react-dom';
import App from './controller/App';
import firebase from "./model/firebase"

console.log(firebase)

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
