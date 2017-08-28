import { AppAction } from './AppActionEnum';
import { AppState } from './AppStateEnum';
import { CHANGE_PAGE, ORDER, REFRESH_APP } from './constants';
import { fetchApps, fetchAppInstances, changeAppState } from './routines';
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

function updateApp(apps, guid, instances) {
  const indexOfApp = apps.findIndex(apps => {
    return apps.getIn('metadata.guid') === guid;
  });

  const app = apps.get(indexOfApp);
  const newApp = app.setIn(['instances'], instances);
  const newApps = apps.update(indexOfApp, val => newApp);
  return newApps;
}

function refreshApp(apps, app) {
  const indexOfApp = apps.findIndex(apps => {
    return apps.getIn('metadata.guid') === app.getIn('metadata.guid');
  });

  const newApps = apps.update(indexOfApp, val => app);
  return newApps;
}

function restageApps(apps, guids, action, isTriggered) {
  let newApps = apps;

  guids.forEach(guid => {
    const indexOfApp = newApps.findIndex(apps => {
      return apps.getIn('metadata.guid') === guid;
    });

    const app = apps.get(indexOfApp);
    let state;
    if (action == AppAction.RESTAGE) {
      state = isTriggered ? AppState.RESTAGE_TRIGGERED : AppState.RESTAGING;
    } else if (action == AppAction.STOP) {
      state = isTriggered ? AppState.STOP_TRIGGERED : AppState.STOPPING;
    } else if (action == AppAction.START) {
      state = isTriggered ? AppState.START_TRIGGERED : AppState.STARTING;
    }

    const newApp = app.setIn(['entity', 'state'], state);
    newApps = newApps.update(indexOfApp, val => newApp);
  });

  return newApps;
}

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
        .set('apps', fromJS(action.payload.resources))
        .set('total', action.payload.total_pages);
    case fetchAppInstances.SUCCESS:
      return state.set(
        'apps',
        updateApp(
          state.get('apps'),
          action.payload.guid,
          fromJS(action.payload.instances),
        ),
      );
    case REFRESH_APP:
      return state.set(
        'apps',
        refreshApp(state.get('apps'), action.payload.app),
      );
    case fetchApps.FAILURE:
      return state.set('error', action.payload);
    case fetchApps.FULFILL:
      return state.set('loading', false);
    case changeAppState.TRIGGER:
      return state.set(
        'apps',
        restageApps(
          state.get('apps'),
          action.payload.guids,
          action.payload.action,
          true,
        ),
      );
    case changeAppState.SUCCESS:
      return state.set(
        'apps',
        restageApps(
          state.get('apps'),
          action.payload.guids,
          action.payload.action,
          false,
        ),
      );

    default:
      return state;
  }
}

export default appsReducer;
