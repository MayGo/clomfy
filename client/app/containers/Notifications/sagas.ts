import { fetchLogout } from '../Login/routines';
import { LoginRoute } from '../../RoutePaths';
import { AuthError, default as CfApi } from '../../services/cfApi';
import { take, call, put, select, cancel, takeLatest, fork, race, cancelled } from 'redux-saga/effects';
import { LOCATION_CHANGE, push } from 'react-router-redux';
import { LOAD_NOTIFICATIONS, LOAD_NOTIFICATIONS_SUCCESS, LOAD_NOTIFICATIONS_ERROR } from './constants';
import { loadNotifications, notificationsLoaded, notificationsLoadingError } from './actions';

import { makeQueryNotifications } from './selectors';
import { delay } from "redux-saga";
import * as withQuery from 'with-query';

import * as moment from 'moment';
import { fetchLogin } from "app/containers/Login/routines";

let localStorage = window.localStorage;

function* bgSync() {

  let lastTimestamp = moment().toISOString();
  let delayMs = 5000;
  try {
    while (true) {

      yield call(delay, delayMs);
      yield put(loadNotifications());
      //  lastTimestamp = moment().subtract(delayMs, 'milliseconds').toISOString();
      const events = yield call(CfApi.request, withQuery('events', {
        "order-direction": "desc", "q": "timestamp>" + lastTimestamp
      }));
      if (events.resources.length > 0) {
        lastTimestamp = events.resources[0].metadata.created_at;
        console.log("Changing lastTimestamp to:", lastTimestamp);
      }
      console.log("Loaded notifications:", events);

      yield put(notificationsLoaded(events.resources));

    }
  } catch (err) {
    if (err instanceof AuthError) {
      console.error("Auth error, logging out and redirecting to login")
      yield put(fetchLogout.trigger());
    } else {
      console.error("Error loading notifications:", err);
      yield put(notificationsLoadingError(err));
    }
  } finally {
    if (yield cancelled()) {
      console.info("Loading notifications canceled.");
      yield put(notificationsLoadingError('Sync cancelled!'));
    }
  }
}

function* main() {
  while (yield take(fetchLogin.SUCCESS)) {
    // starts the task in the background
    const bgSyncTask = yield fork(bgSync)

    // wait for the user stop action
    yield take(fetchLogout.SUCCESS)
    // user clicked stop. cancel the background task
    // this will cause the forked bgSync task to jump into its finally block
    yield cancel(bgSyncTask)
  }
}

// Bootstrap sagas
export default main;

