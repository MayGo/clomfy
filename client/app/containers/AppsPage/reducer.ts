import { CHANGE_PAGE, ORDER } from './constants';
import { fetchApps } from './routines';
import { fromJS } from 'immutable';
import { order } from 'app/containers/AppsPage/actions';

// The initial state of the App
const initialState = fromJS({
  loading: false,
  error: false,
  total: 0,
  orderBy: 'timestamp',
  orderDirection: 'desc',
  page: 1,
  apps: null,
});

function appsReducer(state = initialState, action) {
  switch (action.type) {
    case ORDER:
      return state
        .set('orderBy', action.payload.orderBy)
        .set('orderDirection', action.payload.orderDirection);

    case CHANGE_PAGE:
      console.log('Changing page:', action.payload.page);
      return state.set('page', action.payload.page);
    case fetchApps.TRIGGER:
      return state.set('loading', true);
    case fetchApps.SUCCESS:
      return state
        .set('apps', action.payload.resources)
        .set('total', action.payload.total_pages);
    case fetchApps.FAILURE:
      return state.set('error', action.payload);
    case fetchApps.FULFILL:
      return state.set('loading', false);

    default:
      return state;
  }
}

export default appsReducer;
