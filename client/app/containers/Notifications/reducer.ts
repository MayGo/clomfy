import { fromJS } from 'immutable';

import {
  LOAD_NOTIFICATIONS, LOAD_NOTIFICATIONS_ERROR, LOAD_NOTIFICATIONS_SUCCESS,
} from './constants';

// The initial state of the App
const initialState = fromJS({
  list: [],
});

function notificationsReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_NOTIFICATIONS:
      return state
        .set('loading', true)
        .set('error', false)
        .set('list', []);
    case LOAD_NOTIFICATIONS_SUCCESS:

      return state
        .set('list', action.list)
        .set('loading', false)
    case LOAD_NOTIFICATIONS_ERROR:
      return state
        .set('error', action.error)
        .set('loading', false);
    default:
      return state;
  }
}

export default notificationsReducer;
