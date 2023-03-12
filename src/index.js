import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import App from './App';
import Dashboard from './routes/dashboard';
import RegisterUsername from './routes/registerUsername';
import { ThemeContextProvider } from './context/themeContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ThemeContextProvider>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />} />
        <Route path='dashboard' element={<Dashboard />} />
        <Route path='Register-username' element={<RegisterUsername />} />
      </Routes>
    </BrowserRouter>
  </ThemeContextProvider>
);
