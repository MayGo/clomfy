/**
 * Create the store with dynamic reducers
 */

import { createStore, applyMiddleware, compose } from 'redux';
import { fromJS } from 'immutable';
import { routerMiddleware } from 'react-router-redux';
import createSagaMiddleware, { Task, SagaIterator } from 'redux-saga';
import createReducer from './reducers';

import Sagas from './sagas';

const sagaMiddleware = createSagaMiddleware();

export interface IStore<T> extends Redux.Store<T> {
  runSaga?: (saga: (...args: any[]) => SagaIterator, ...args: any[]) => Task; // TODO: cleanup
  asyncReducers?: Redux.ReducersMapObject;
  injectedReducers?: Redux.ReducersMapObject;
  injectedSagas?: any;
}
interface IWindow extends Window {
  __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: typeof compose;
}
declare const window: IWindow;

export default function configureStore<T>(
  initialState: object = {},
  history: any,
): IStore<T> {
  console.log('Configuring store.');
  // Create the store with two middlewares
  // 1. sagaMiddleware: Makes redux-sagas work
  // 2. routerMiddleware: Syncs the location/URL path to the state
  const middlewares = [sagaMiddleware, routerMiddleware(history)];

  const enhancers = [applyMiddleware(...middlewares)];

  // If Redux DevTools Extension is installed use it, otherwise use Redux compose
  /* eslint-disable no-underscore-dangle */
  const composeEnhancers =
    process.env.NODE_ENV !== 'production' &&
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      ? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
          // TODO Try to remove when `react-router-redux` is out of beta,
          // LOCATION_CHANGE should not be fired more than once after hot reloading
          // Prevent recomputing reducers for `replaceReducer`
          shouldHotReload: false,
        })
      : compose;
  /* eslint-enable */

  const store: IStore<T> = createStore(
    createReducer(),
    fromJS(initialState),
    composeEnhancers(...enhancers),
  );

  sagaMiddleware.run(Sagas);

  // Extensions
  store.runSaga = sagaMiddleware.run;
  store.injectedReducers = {}; // Reducer registry
  store.injectedSagas = {}; // Saga registry

  // Make reducers hot reloadable, see http://mxs.is/googmo
  /* istanbul ignore next */
  if (module.hot) {
    module.hot.accept('./reducers', () => {
      store.replaceReducer(createReducer(store.injectedReducers));
    });
  }

  return store;
}
