import { CHANGE_PAGE, ORDER } from './constants';
import { fetchEvents } from './routines';
import { fromJS } from 'immutable';
import { order } from 'app/containers/EventsPage/actions';

// The initial state of the App
const initialState = fromJS({
  loading: false,
  error: false,
  total: 0,
  orderBy: 'timestamp',
  orderDirection: 'desc',
  page: 1,
  events: null,
});

function eventsReducer(state = initialState, action) {
  switch (action.type) {
    case ORDER:
      return state
        .set('orderBy', action.payload.orderBy)
        .set('orderDirection', action.payload.orderDirection);

    case CHANGE_PAGE:
      return state.set('page', action.payload.page);
    case fetchEvents.TRIGGER:
      return state.set('loading', true);
    case fetchEvents.SUCCESS:
      return state
        .set('events', action.payload.resources)
        .set('total', action.payload.total_pages);
    case fetchEvents.FAILURE:
      return state.set('error', action.payload);
    case fetchEvents.FULFILL:
      return state.set('loading', false);

    default:
      return state;
  }
}

export default eventsReducer;
