import { fetchLogout } from '../Login/routines';
import { LoginRoute } from '../../RoutePaths';
import { AuthError, default as CfApi } from '../../services/cfApi';
/**
 * Gets the repositories of the user from Github
 */

import { take, call, put, select, cancel, takeLatest } from 'redux-saga/effects';
import { LOCATION_CHANGE, push } from 'react-router-redux';

import {  selectPage } from './selectors';
import { fetchEvents } from "app/containers/EventsPage/routines";

/**
 * CF events request/response handler
 */
export function* getEvents(): IterableIterator<any> {
  yield put(fetchEvents.request());

  const page = yield select(selectPage());

  try {
    const events = yield call(CfApi.request, 'events', { page });
    console.log("Events requested:", events)
    yield put(fetchEvents.success(events));
  } catch (error) {
    if (error instanceof AuthError) {
      console.error("Auth error, logging out and redirecting to login")
      yield put(fetchLogout.trigger())
    } else {
      console.error("Error loading events:", error);
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

// Bootstrap sagas
export default [
  eventsData,
];
