import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ChakraProvider } from '@chakra-ui/react'
import './dist/fonts/fonts.css'
import { Provider } from 'react-redux'
import store from './lib/store'
import { BrowserRouter as Router } from 'react-router-dom'

ReactDOM.render(
    <ChakraProvider>
      <Provider store={store}>
        <Router>
          <App />
        </Router>

      </Provider>
    </ChakraProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
