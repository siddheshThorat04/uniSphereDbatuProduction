import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ChatContextProvider } from './context/ChatContext';
import { BrowserRouter } from 'react-router-dom';
import { AuthContextProvider } from './context/authContext.jsx';
import { DarkThemeContextProvider } from './context/DarkTheme.jsx';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ChatContextProvider>
      <BrowserRouter>
        <AuthContextProvider>
          <DarkThemeContextProvider>

            <App />
          </DarkThemeContextProvider>
        </AuthContextProvider>
      </BrowserRouter>
    </ChatContextProvider >
  </React.StrictMode>
);

