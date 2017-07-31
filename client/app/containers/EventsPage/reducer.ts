import { fetchEvents } from './routines';
import { fromJS } from 'immutable';
import { changePage } from "app/containers/EventsPage/actions";

// The initial state of the App
const initialState = fromJS({
  loading: false,
  error: false,
  total: 0, 
  page: 1,
  events: null
});

function eventsReducer(state = initialState, action) {
  switch (action.type) {

    case fetchEvents.TRIGGER:
      return state
        .set('loading', true)
        .set('page', action.payload.page)
    case fetchEvents.SUCCESS:
      return state
        .set('events', action.payload.resources)
        .set('total', action.payload.total_pages)
    case fetchEvents.FAILURE:
      return state
        .set('error', action.payload);
    case fetchEvents.FULFILL:
      return state
        .set('loading', false)

    default:
      return state;
  }
}

export default eventsReducer;
