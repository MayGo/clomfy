import loginReducer from './containers/Login/reducer';
import notificationsReducer from './containers/Notifications/reducer';
import appsReducer from './containers/AppsPage/reducer';
/**
 * Combine all reducers in this file and export the combined reducers.
 * If we were to do this in store.js, reducers wouldn't be hot reloadable.
 */

import { fromJS } from 'immutable';
import { combineReducers } from 'redux-immutable';
import { LOCATION_CHANGE } from 'react-router-redux';
import Redux from 'redux';

import globalReducer from 'app/containers/App/reducer';

/*
 * routeReducer
 *
 * The reducer merges route location changes into our immutable state.
 * The change is necessitated by moving to react-router-redux@4
 *
 */

// Initial routing state
const routeInitialState = fromJS({
  locationBeforeTransitions: null,
});

/**
 * Merge route into the global application state
 */
function routeReducer(state = routeInitialState, action) {
  switch (action.type) {
    /* istanbul ignore next */
    case LOCATION_CHANGE:
      const mergeState = state.merge({
        locationBeforeTransitions: action.payload,
      });
      console.log('LOCATION_CHANGE', action.payload.pathname);
      if (window.swUpdate) {
        console.log('Reoading:swUpdate ');
        window.location.reload();
      }
      return mergeState;
    default:
      return state;
  }
}

/**
 * Creates the main reducer with the asynchronously loaded ones
 */
export default function createReducer(
  asyncReducers: Redux.ReducersMapObject = {},
): Redux.Reducer<any> {
  const reducers = {
    route: routeReducer,
    login: loginReducer,
    notifications: notificationsReducer,
    global: globalReducer,
    apps: appsReducer,
    // language: languageProviderReducer,
    ...asyncReducers,
  };

  return combineReducers(reducers);
}
