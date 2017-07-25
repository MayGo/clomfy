
import { LOGOUT, LOGIN_REQUEST, SET_AUTH } from '../Login/constants';
import { LoginRoute } from '../../RoutePaths';
import { AuthError, default as CfApi } from '../../services/cfApi';
import { take, call, put, select, cancel, takeLatest, fork, race, cancelled } from 'redux-saga/effects';
import { LOCATION_CHANGE, push } from 'react-router-redux';
import { LOAD_NOTIFICATIONS, LOAD_NOTIFICATIONS_SUCCESS, LOAD_NOTIFICATIONS_ERROR } from './constants';
import { loadNotifications, notificationsLoaded, notificationsLoadingError } from './actions';

import { makeQueryNotifications } from './selectors';
import { logout } from "app/containers/Login/actions";
import { delay } from "redux-saga";
import * as withQuery from 'with-query';

import * as moment from 'moment';

let localStorage = window.localStorage;

function* bgSync() {

  let lastTimestamp;
  let delayMs = 5000;
  try {
    while (true) {

      yield call(delay, delayMs);
      yield put(loadNotifications());
      lastTimestamp = moment().subtract(delayMs, 'milliseconds').toISOString();
      const events = yield call(CfApi.request, withQuery('events', {
        "order-direction": "desc", "q": "timestamp>" + lastTimestamp
      }));
      console.log("Loaded notifications:", events);

      yield put(notificationsLoaded(events.resources));

    }
  } catch (err) {
    if (err instanceof AuthError) {
      console.error("Auth error, logging out and redirecting to login")
      yield put(logout());
    } else {
      console.error("Error loading notifications:", err);
      yield put(notificationsLoadingError(err));
    }
  } finally {
    if (yield cancelled()) {
      console.error("Error loading notifications.");
      yield put(notificationsLoadingError('Sync cancelled!'));
    }
  }
}

function* main() {
  while (yield take(SET_AUTH)) {
    // starts the task in the background
    const bgSyncTask = yield fork(bgSync)

    // wait for the user stop action
    yield take(LOGOUT)
    // user clicked stop. cancel the background task
    // this will cause the forked bgSync task to jump into its finally block
    yield cancel(bgSyncTask)
  }
}

// Bootstrap sagas
export default main;

