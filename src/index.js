import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './context/auth.context';
import { PositionPairWrapper } from './context/positionPair.context';
import { ChakraProvider, theme } from '@chakra-ui/react'


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // TODO el strict mode con los markers cacota
  //<React.StrictMode>
  <Router>
    <AuthProvider>
      <ChakraProvider theme={theme}>
        <PositionPairWrapper>
          <App />
        </PositionPairWrapper>
      </ChakraProvider>
    </AuthProvider>
  </Router>
  //</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
