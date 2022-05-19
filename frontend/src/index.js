import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './ui/components/App/App';
import NewEvemtForm from './ui/components/NewEventForm'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <NewEvemtForm />
  </React.StrictMode>
);
