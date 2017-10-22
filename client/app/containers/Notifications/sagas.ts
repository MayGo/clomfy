import { AuthError } from '../../services/auth-error';
import { fetchLogout } from '../Login/routines';
import { LoginRoute } from '../../RoutePaths';
import { default as CfApi } from '../../services/cfApi';
import {
  take,
  call,
  put,
  select,
  cancel,
  takeLatest,
  fork,
  race,
  cancelled,
} from 'redux-saga/effects';
import { LOCATION_CHANGE, push } from 'react-router-redux';

import { fetchNotifications } from './routines';

import { makeQueryNotifications } from './selectors';
import { delay } from 'redux-saga';
import * as withQuery from 'with-query';

import * as moment from 'moment';
import { fetchLogin } from 'app/containers/Login/routines';

const localStorage = window.localStorage;

function* bgSync() {
  let lastTimestamp; // = moment().toISOString();
  const delayMs = 5000;
  try {
    while (true) {
      yield call(delay, delayMs);
      yield put(fetchNotifications.request());

      let query = '';
      if (lastTimestamp) {
        query = 'timestamp>' + lastTimestamp;
      }

      const events = yield call(
        CfApi.request,
        withQuery('v2/events', {
          'order-direction': 'desc',
          q: query,
        }),
      );

      if (events.resources.length > 0) {
        const itemCreatedDate = events.resources[0].metadata.created_at;
        const isFirstLoad = !lastTimestamp;
        yield put(fetchNotifications.success({ events, isFirstLoad }));
        //Add some time, so this resource would not be in next query result
        lastTimestamp = moment(itemCreatedDate)
          .add(delayMs, 'milliseconds')
          .toISOString();
        console.log('Changing lastTimestamp to:', lastTimestamp);
      }

      console.log('Loaded notifications:', events);
    }
  } catch (err) {
    if (err instanceof AuthError) {
      console.error('Auth error, logging out and redirecting to login');
      yield put(fetchLogout());
    } else {
      console.error('Error loading notifications:', err);
      yield put(fetchNotifications.failure(err.error));
    }
  } finally {
    if (yield cancelled()) {
      console.info('Loading notifications canceled.');
      yield put(fetchNotifications.failure('Sync cancelled!'));
    }
  }
}

function* main() {
  while (yield take(fetchLogin.SUCCESS)) {
    // starts the task in the background
    const bgSyncTask = yield fork(bgSync);

    // wait for the user stop action
    yield take(fetchLogout.SUCCESS);
    // user clicked stop. cancel the background task
    // this will cause the forked bgSync task to jump into its finally block
    yield cancel(bgSyncTask);
  }
}

// Bootstrap sagas
export default main;
