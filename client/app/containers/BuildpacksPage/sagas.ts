import { AuthError } from '../../services/auth-error';
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
import { LOAD_BUILDPACKS } from './constants';
import { buildpacksLoaded, buildpacksLoadingError } from './actions';

import { makeQueryBuildpacks } from './selectors';
import { fetchLogout } from 'app/containers/Login/routines';

/**
 * CF buildpacks request/response handler
 */
export function* getBuildpacks(): IterableIterator<any> {
  // Select username from store
  const username = yield select(makeQueryBuildpacks());
  try {
    // Call our request helper (see 'utils/request')
    const repos = yield call(CfApi.request, 'v2/buildpacks');
    console.log(repos);
    yield put(buildpacksLoaded(repos.resources));
  } catch (err) {
    if (err instanceof AuthError) {
      console.error('Auth error, logging out and redirecting to login');
      yield put(fetchLogout.trigger());
    } else {
      console.error('Error loading buildpacks:', err);
      yield put(buildpacksLoadingError(err));
    }
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
export default [buildpacksData];
