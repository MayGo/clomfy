import { refreshApp } from './actions';
import { fetchNotifications } from '../Notifications/routines';
import { AuthError } from '../../services/auth-error';
import { CHANGE_PAGE, ORDER, REFRESH_APP } from './constants';
import { fetchLogout } from '../Login/routines';
import { LoginRoute } from '../../RoutePaths';
import { default as CfApi } from '../../services/cfApi';

import * as withQuery from 'with-query';

import { delay } from 'redux-saga';

import {
  call,
  cancel,
  fork,
  put,
  select,
  take,
  takeLatest,
  cancelled,
  takeEvery,
} from 'redux-saga/effects';

import { LOCATION_CHANGE, push } from 'react-router-redux';

import {
  makeQueryApps,
  selectPage,
  selectOrderBy,
  selectOrderDirection,
  selectApps,
} from './selectors';

import { fetchAppInstances, fetchApps, changeAppState } from './routines';
import { List, fromJS } from 'immutable';
import { AppAction } from './AppActionEnum';

/**
 * CF apps request/response handler
 */
export function* getApps(): IterableIterator<any> {
  console.log('getting apps');
  yield put(fetchApps.request());

  const page = yield select(selectPage());
  const orderBy = yield select(selectOrderBy());
  const orderDirection = yield select(selectOrderDirection());

  try {
    const apps = yield call(
      CfApi.request,
      withQuery('apps', {
        page,
        'order-direction': orderDirection,
      }),
    );

    console.log('Apps requested:', apps);
    yield put(fetchApps.success(apps));
    return true;
  } catch (error) {
    if (error instanceof AuthError) {
      console.error('Auth error, logging out and redirecting to login');
      yield put(fetchLogout.trigger());
    } else {
      console.error('Error loading apps:', error);
      yield put(fetchApps.failure(error.error));
    }
  } finally {
    yield put(fetchApps.fulfill());
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export function* appsData(): IterableIterator<any> {
  while (true) {
    const watcher = yield takeLatest(fetchApps.TRIGGER, getApps);

    // Suspend execution until location changes
    yield take(LOCATION_CHANGE);
    yield cancel(watcher);
  }
}

export function* watchForSort(): IterableIterator<any> {
  while (true) {
    yield take(ORDER);

    yield put(fetchApps.trigger());
  }
}

export function* watchForPage(): IterableIterator<any> {
  while (true) {
    yield take(CHANGE_PAGE);
    yield put(fetchApps.trigger());
  }
}

export function* watchForAppState(obj): IterableIterator<any> {
  console.log('watchForAppState', obj.payload);

  let action = obj.payload.action;
  let guids = obj.payload.guids;

  if (guids.length === 0) {
    console.error('No apps to change state');
    return;
  }

  let updatedGuids = [];

  for (let guid of guids) {
    console.log(`Changing app ${guid} state to ${action}`);
    let url;
    if (action == AppAction.RESTAGE) {
      url = `apps/${guid}/restage`;
    } else if (action == AppAction.STOP) {
      url = `apps/${guid}/actions/stop`;
    } else if (action == AppAction.START) {
      url = `apps/${guid}/actions/start`;
    } else {
      console.error('Unknown appAction');
      return;
    }
    yield call(CfApi.request, url, {}, { method: 'POST' });

    updatedGuids.push(guid);
    // console.log('Loaded instances:', instances);
  }
  yield put(changeAppState.success({ guids: updatedGuids, action }));
}

/*
* Sync each app instances
*/

function* bgSyncApps() {
  const delayMs = 15000;
  try {
    while (true) {
      const apps: Array<any> = yield select(makeQueryApps());
      //console.log('Loading instances for apps', apps);
      for (let app of apps) {
        // console.log('Loading for app', app);

        const guid = app.getIn(['metadata', 'guid']);
        const instances = yield call(CfApi.request, `apps/${guid}/instances`);
        // console.log('Loaded instances:', instances);
        yield put(fetchAppInstances.success({ guid, instances }));
      }
      yield call(delay, delayMs);
    }
  } catch (err) {
    if (err instanceof AuthError) {
      console.error('Auth error, logging out and redirecting to login');
      yield put(fetchLogout.trigger());
    } else {
      console.error('Error loading apps instances:', err);
    }
  } finally {
    if (yield cancelled()) {
      console.info('Loading apps instances canceled.');
    }
  }
}

function* bgSyncAppsMain() {
  while (yield take(fetchApps.SUCCESS)) {
    // starts the task in the background
    const bgSyncTask = yield fork(bgSyncApps);

    // wait for the user stop action
    yield take(fetchLogout.SUCCESS);
    // user clicked stop. cancel the background task
    // this will cause the forked bgSync task to jump into its finally block
    yield cancel(bgSyncTask);
  }
}

/*
* Watch for events and refresh app data
*/

function* bgWatchForEvents(action) {
  try {
    if (action.payload.isFirstLoad) {
      console.log('First load. Not refreshing apps');
      return;
    }
    const appGuids = fromJS(action.payload.events.resources)
      .filter(event => event.getIn(['entity', 'actee_type']) === 'app')
      .map(event => event.getIn(['entity', 'actee']))
      .toSet()
      .toList();

    console.log('appGuids to update:', appGuids);
    for (let guid of appGuids) {
      const app = yield call(CfApi.request, `apps/${guid}`);
      yield put(refreshApp({ app: fromJS(app) }));
    }
  } catch (err) {
    console.error('Error loading apps instances:', err);
  } finally {
    if (yield cancelled()) {
      console.info('Watching events for apps  canceled.');
    }
  }
}

// Fork all sagas
export function* root() {
  yield fork(bgSyncAppsMain);
  yield takeEvery(fetchNotifications.SUCCESS, bgWatchForEvents);
  yield fork(appsData);
  yield fork(watchForSort);
  yield fork(watchForPage);
  yield takeEvery(changeAppState.TRIGGER, watchForAppState);
}

// Bootstrap sagas
export default root;
