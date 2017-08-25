import { fromJS } from 'immutable';

import { fetchNotifications } from './routines';

// The initial state of the App
const initialState = fromJS({
  list: [],
  loading: false,
  error: false,
});

function notificationsReducer(state: any = initialState, action: any) {
  switch (action.type) {
    case fetchNotifications.TRIGGER:
      return state.set('loading', true);
    case fetchNotifications.SUCCESS:
      if (action.payload.events.resources.length > 0) {
        const newList = state
          .get('list')
          .merge(action.payload.events.resources);
        return state.set('list', newList);
      }
      return state;
    case fetchNotifications.FAILURE:
      return state.set('error', action.payload);
    case fetchNotifications.FULFILL:
      return state.set('loading', false);
    default:
      return state;
  }
}

export default notificationsReducer;
