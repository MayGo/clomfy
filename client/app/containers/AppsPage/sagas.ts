import { AuthError } from '../../services/auth-error';
import { fetchLogout } from '../Login/routines';
import { default as CfApi } from '../../services/cfApi';
/**
 * Gets the repositories of the user from Github
 */

import {
  take,
  call,
  put,
  select,
  cancel,
  takeLatest,
} from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import { LOAD_APPS } from './constants';
import { appsLoaded, appsLoadingError } from './actions';

import { makeQueryApps } from './selectors';

/**
 * CF apps request/response handler
 */
export function* getApps(): IterableIterator<any> {
  // Select username from store
  const username = yield select(makeQueryApps());
  try {
    // Call our request helper (see 'utils/request')
    const repos = yield call(CfApi.request, 'apps');
    console.log(repos);
    yield put(appsLoaded(repos.resources));
  } catch (err) {
    if (err instanceof AuthError) {
      console.error('Auth error, logging out and redirecting to login');
      yield put(fetchLogout.trigger());
    } else {
      console.error('Error loading apps:', err);
      yield put(appsLoadingError(err));
    }
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export function* appsData(): IterableIterator<any> {
  // Watches for LOAD_REPOS actions and calls getRepos when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  const watcher = yield takeLatest(LOAD_APPS, getApps);

  // Suspend execution until location changes
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

// Bootstrap sagas
export default [appsData];
