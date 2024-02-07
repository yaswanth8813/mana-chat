import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Authcontextprovider } from './contex/Auth';
import { ChatContextProvider } from './contex/chatcontext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Authcontextprovider>
    <ChatContextProvider>
      <App></App>
    </ChatContextProvider>
  </Authcontextprovider>
  </React.StrictMode>
);