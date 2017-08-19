/**
 * app.js
 *
 * This is the entry file for the application, only setup and boilerplate
 * code.
 */

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
import { applyRouterMiddleware, Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import * as FontFaceObserver from 'fontfaceobserver';
import { useScroll } from 'react-router-scroll';
import configureStore from './store';

import * as OfflinePluginRuntime from 'offline-plugin/runtime';

import 'typeface-berkshire-swash';
import 'balloon-css/balloon.css';

// Create redux store with history
// this uses the singleton browserHistory provided by react-router
// Optionally, this could be changed to leverage a created history
// e.g. `const browserHistory = useRouterHistory(createBrowserHistory)();`
const initialState = {};
const store = configureStore(initialState, browserHistory);

// Sync history and store, as the react-router-redux reducer
// is under the non-default key ("routing"), selectLocationState
// must be provided for resolving how to retrieve the "route" in the state
import { selectLocationState } from 'app/containers/App/selectors';
const history = syncHistoryWithStore(browserHistory, store, {
  selectLocationState: selectLocationState(),
});

// Set up the router, wrapping all Routes in the App component
import App from 'app/containers/App';
import { i18nInstance } from './utils/i18n';

import createRoutes from './routes';
const rootRoute = {
  component: App,
  childRoutes: createRoutes(store),
};

export default class Root extends React.Component<any, any> {
  render() {
    return (
      <Provider store={store}>
        <MuiThemeProvider theme={muiTheme}>
          <I18nextProvider i18n={i18nInstance}>
            <Router
              history={history}
              routes={rootRoute}
              render={applyRouterMiddleware(useScroll())}
            />
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
