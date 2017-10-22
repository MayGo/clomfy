/**
 * app.js
 *
 * This is the entry file for the application, only setup and boilerplate
 * code.
 */
import { LoginRoute } from './RoutePaths';
import { HomePage } from './containers/HomePage';

// Needed for redux-saga es6 generator support
import 'babel-polyfill';

/* eslint-disable import/no-unresolved */
// Load the favicon, the manifest.json file and the .htaccess file
import 'file-loader?name=[name].[ext]!./favicon.ico';
import '!file-loader?name=[name].[ext]!./manifest.json';
import 'file-loader?name=[name].[ext]!./.htaccess';
/* eslint-enable import/no-unresolved */

import { I18nextProvider } from 'react-i18next';

import { MuiThemeProvider } from 'material-ui/styles';
import muiTheme from './muiTheme';

// Import all the third party stuff
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Switch, Route } from 'react-router';
import { ConnectedRouter } from 'react-router-redux';
import * as FontFaceObserver from 'fontfaceobserver';
import { useScroll } from 'react-router-scroll';

import createHistory from 'history/createBrowserHistory';
import configureStore from './configureStore';

import * as OfflinePluginRuntime from 'offline-plugin/runtime';

import 'typeface-berkshire-swash';
import 'balloon-css/balloon.css';

// Create redux store with history
const initialState = {};
const history = createHistory();
const store = configureStore(initialState, history);

// Set up the router, wrapping all Routes in the App component
import App from 'app/containers/App';
import { i18nInstance } from './utils/i18n';

import Login from './containers/Login';
import NotFoundPage from './containers/NotFoundPage';

export default class Root extends React.Component<any, any> {
  render() {
    return (
      <Provider store={store}>
        <MuiThemeProvider theme={muiTheme}>
          <I18nextProvider i18n={i18nInstance}>
            <ConnectedRouter history={history}>
              <App />
            </ConnectedRouter>
          </I18nextProvider>
        </MuiThemeProvider>
      </Provider>
    );
  }
}

// Install ServiceWorker and AppCache in the end since
// it's not most important operation and if main code fails,
// we do not want it installed
/*if (process.env.NODE_ENV === 'production') {
  OfflinePluginRuntime.install({
    onUpdating: () => {
      console.log('SW Event:', 'onUpdating');
    },
    onUpdateReady: () => {
      console.log('SW Event:', 'onUpdateReady');
      return OfflinePluginRuntime.applyUpdate();
    },
    onUpdated: () => {
      console.log('SW Event:', 'onUpdated');
      window.swUpdate = true;
    },
  });
}*/
