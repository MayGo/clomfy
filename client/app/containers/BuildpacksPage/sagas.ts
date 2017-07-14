/**
 * Gets the repositories of the user from Github
 */

import { take, call, put, select, cancel, takeLatest } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import { LOAD_BUILDPACKS } from './constants';
import { buildpacksLoaded, buildpacksLoadingError } from './actions';

import { requestCf } from '../../utils/request';
import { makeQueryBuildpacks } from './selectors';

/**
 * CF buildpacks request/response handler
 */
export function* getBuildpacks(): IterableIterator<any> {
  // Select username from store
  const username = yield select(makeQueryBuildpacks());
  const requestURL = 'https://api.run.pivotal.io/v2/buildpacks';

  try {
    // Call our request helper (see 'utils/request')
    const repos = yield call(requestCf, requestURL);
    console.log(repos)
    yield put(buildpacksLoaded(repos.resources));
  } catch (err) {
    yield put(buildpacksLoadingError(err));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export function* buildpacksData(): IterableIterator<any> {
  // Watches for LOAD_REPOS actions and calls getRepos when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  const watcher = yield takeLatest(LOAD_BUILDPACKS, getBuildpacks);

  // Suspend execution until location changes
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

// Bootstrap sagas
export default [
  buildpacksData,
];
