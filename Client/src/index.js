import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import ProjectConfigurationHolder from './project-config/ProjectConfigurationHolder';
import SessionConfigurationHolder from './session-config/SessionConfigurationHolder';
import CanBusConfigurationHolder from './can-bus-config/CanBusConfigurationHolder';
import SplitView from './split-view/SplitView';
import App from './App';
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
