import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBL8XCIJU-VGDSuq4HPCIPea_b5003QMOU",
  authDomain: "reliancecardamom-e87da.firebaseapp.com",
  projectId: "reliancecardamom-e87da",
  storageBucket: "reliancecardamom-e87da.appspot.com",
  messagingSenderId: "1065473669221",
  appId: "1:1065473669221:web:37a193250829afcbd26e8c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
