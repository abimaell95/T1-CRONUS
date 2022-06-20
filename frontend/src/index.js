import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import CreateOrder from './ui/components/CreateOrder';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <CreateOrder />
  </React.StrictMode>
);
