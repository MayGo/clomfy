import {fromJS} from 'immutable';

import {
  LOAD_BUILDPACKS, LOAD_BUILDPACKS_ERROR, LOAD_BUILDPACKS_SUCCESS,
} from './constants';

// The initial state of the App
const initialState = fromJS({
  buildpacks: false,
});

function buildpacksReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_BUILDPACKS:
      return state
        .set('loading', true)
        .set('error', false)
        .set('buildpacks', false);
    case LOAD_BUILDPACKS_SUCCESS:
      return state
        .set('buildpacks', action.buildpacks)
        .set('loading', false)
    case LOAD_BUILDPACKS_ERROR:
      return state
        .set('error', action.error)
        .set('loading', false);
    default:
      return state;
  }
}

export default buildpacksReducer;
