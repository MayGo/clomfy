import AppsPage from './containers/AppsPage';
import auth from './auth';
import {
  AppsRoute,
  BuildpacksRoute,
  HomeRoute,
  LoginRoute,
  EventsRoute,
} from './RoutePaths';
// These are the pages you can go to.
// They are all wrapped in the App component, which should contain the navbar etc
// See http://blog.mxstbr.com/2016/01/react-apps-with-pages for more information
// about the code splitting business
import { getAsyncInjectors } from './utils/asyncInjectors';
import { Route, RouteProps } from 'react-router';
import Login from './containers/Login';
import { HomePage } from 'app/containers/HomePage';

const errorLoading = err => {
  console.error('Dynamic page loading failed', err); // eslint-disable-line no-console
};

const loadModule = cb => componentModule => {
  cb(null, componentModule.default);
};

export interface IExtendedRouteProps extends RouteProps {
  name?: string;
  getComponent?: any;
}

function requireAuth(nextState, replace, callback) {
  if (!auth.isAuthenticated()) {
    console.log('ON_ENTER: redirecting to login');
    replace('/login');
  }
  return callback();
}

export default function createRoutes(store): IExtendedRouteProps[] {
  // create reusable async injectors using getAsyncInjectors factory
  const { injectReducer, injectSagas } = getAsyncInjectors(store);

  return [
    {
      path: LoginRoute,
      name: 'login',
      component: Login,
    },
    {
      path: '*index.html',
      name: 'login',
      component: Login,
    },

    {
      path: HomeRoute,
      name: 'home',
      onEnter: requireAuth,
      component: HomePage,
    },
    {
      path: BuildpacksRoute,
      name: 'buildpacks',
      onEnter: requireAuth,
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          System.import('app/containers/BuildpacksPage/reducer'),
          System.import('app/containers/BuildpacksPage/sagas'),
          System.import('app/containers/BuildpacksPage'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('buildpacks', reducer.default);
          injectSagas(sagas.default);

          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    },
    {
      path: AppsRoute,
      name: 'apps',
      component: AppsPage,
    },
    {
      path: EventsRoute,
      name: 'events',
      onEnter: requireAuth,
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          System.import('app/containers/EventsPage/reducer'),
          System.import('app/containers/EventsPage/sagas'),
          System.import('app/containers/EventsPage'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('events', reducer.default);
          injectSagas(sagas.default);

          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    },
    {
      path: '*',
      name: 'notfound',
      getComponent(nextState, cb) {
        System.import('app/containers/NotFoundPage')
          .then(loadModule(cb))
          .catch(errorLoading);
      },
    },
  ];
}
