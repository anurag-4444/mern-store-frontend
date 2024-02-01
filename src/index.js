import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import store from './store';
import { Provider } from 'react-redux'
// import { GoogleOAuthProvider } from 'react-oauth-google';
import { CookiesProvider } from 'react-cookie';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  // <GoogleOAuthProvider clientId="925614397797-26b4kar6gtbjt8lcoi0oj6bjqfo7jmej.apps.googleusercontent.com">
  <CookiesProvider defaultSetOptions={{ path: '/' }}>
    <Provider store={store}>
      <App />
    </Provider>
  </CookiesProvider>
  // </GoogleOAuthProvider>
  // </React.StrictMode>
);

