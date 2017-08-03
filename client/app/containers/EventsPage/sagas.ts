import { AuthError } from '../../services/auth-error';
import { CHANGE_PAGE, ORDER } from './constants';
import { fetchLogout } from '../Login/routines';
import { LoginRoute } from '../../RoutePaths';
import { default as CfApi } from '../../services/cfApi';

import * as withQuery from 'with-query';

import {
  take,
  call,
  put,
  select,
  cancel,
  takeLatest,
} from 'redux-saga/effects';
import { LOCATION_CHANGE, push } from 'react-router-redux';

import { selectPage, selectOrderBy, selectOrderDirection } from './selectors';
import { fetchEvents } from 'app/containers/EventsPage/routines';

/**
 * CF events request/response handler
 */
export function* getEvents(): IterableIterator<any> {
  yield put(fetchEvents.request());

  const page = yield select(selectPage());
  const orderBy = yield select(selectOrderBy());
  const orderDirection = yield select(selectOrderDirection());

  try {
    const events = yield call(
      CfApi.request,
      withQuery('events', {
        page,
        'order-direction': orderDirection,
        'order-by': orderBy,
      }),
    );

    console.log('Events requested:', events);
    yield put(fetchEvents.success(events));
  } catch (error) {
    if (error instanceof AuthError) {
      console.error('Auth error, logging out and redirecting to login');
      yield put(fetchLogout.trigger());
    } else {
      console.error('Error loading events:', error);
      yield put(fetchEvents.failure(error.error));
    }
  } finally {
    yield put(fetchEvents.fulfill());
    return true;
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export function* eventsData(): IterableIterator<any> {
  const watcher = yield takeLatest(fetchEvents.TRIGGER, getEvents);

  // Suspend execution until location changes
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export function* watchForSort(): IterableIterator<any> {
  while (true) {
    yield take(ORDER);

    yield put(fetchEvents.trigger());
  }
}
export function* watchForPage(): IterableIterator<any> {
  while (true) {
    yield take(CHANGE_PAGE);

    yield put(fetchEvents.trigger());
  }
}

// Bootstrap sagas
export default [eventsData, watchForSort, watchForPage];
