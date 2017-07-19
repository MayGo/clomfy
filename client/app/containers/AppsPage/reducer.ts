import {fromJS} from 'immutable';

import {
  LOAD_APPS, LOAD_APPS_ERROR, LOAD_APPS_SUCCESS,
} from './constants';

// The initial state of the App
const initialState = fromJS({
  buildpacks: false,
});

function buildpacksReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_APPS:
      return state
        .set('loading', true)
        .set('error', false)
        .set('apps', false);
    case LOAD_APPS_SUCCESS:
      return state
        .set('apps', action.apps)
        .set('loading', false)
    case LOAD_APPS_ERROR:
      return state
        .set('error', action.error)
        .set('loading', false);
    default:
      return state;
  }
}

export default buildpacksReducer;
