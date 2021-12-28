import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { configureAppStore } from './store/configureStore';
import { HelmetProvider } from 'react-helmet-async';

interface Props {
  Component: typeof App
}


const store = configureAppStore();
const MOUNT_NODE = document.getElementById('root') as HTMLElement;

const ConnectedApp = ({ Component }: Props) => {
  return (<Provider store={store}>
    <HelmetProvider>
      <Component />
    </HelmetProvider>
  </Provider>)
}

const render = (Component: typeof App) => {
  ReactDOM.render(<ConnectedApp Component={Component} />, MOUNT_NODE);
};

if (module.hot) {
  // Hot reloadable translation json files and app
  // modules.hot.accept does not accept dynamic dependencies,
  // have to be constants at compile-time
 
}
render(App);


