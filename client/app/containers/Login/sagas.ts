// This file contains the sagas used for async actions in our app. It's divided into
// "effects" that the sagas call (`authorize` and `logout`) and the actual sagas themselves,
// which listen for actions.

// Sagas help us gather all our side effects (network requests in this case) in one place

import { browserHistory } from 'react-router';
import { take, call, put, fork, race, select } from 'redux-saga/effects';
import auth from '../../auth';
import { fetchLogin, fetchLogout } from './routines';

import { Path } from 'history';
import { push } from 'react-router-redux';

/**
 * Effect to handle authorization
 * @param  {string} username               The username of the user
 * @param  {string} password               The password of the user
 */
export function* authorize({ username, password }) {
  yield put(fetchLogin.request());

  try {
    console.log('Authorizing user:', username);
    if (username && password) {
      let data = yield call(auth.login, username, password);
      yield put(fetchLogin.success(data));
    } else {
      console.error('No username and password');
    }
  } catch (error) {
    console.error('Authorizing error:', error.message);
    yield put(fetchLogin.failure(error.error));
  } finally {
    yield put(fetchLogin.fulfill());
    return true;
  }
}

/**
 * Effect to handle logging out
 */
export function* logout() {
  yield put(fetchLogout.request());

  try {
    console.info('Logging out.');
    yield call(auth.logout);
    yield put(fetchLogout.success());
  } catch (error) {
    console.error('Logout error:', error.message);
    yield put(fetchLogout.error(error.message));
  } finally {
    yield put(fetchLogout.fulfill());
    console.log('Fulfill');
    return true;
  }
}

/**
 * Log in saga
 */
export function* loginFlow() {
  while (true) {
    let { payload } = yield take(fetchLogin.TRIGGER);
    let { username, password } = payload;

    // A `LOGOUT` action may happen while the `authorize` effect is going on, which may
    // lead to a race condition. This is unlikely, but just in case, we call `race` which
    // returns the "winner", i.e. the one that finished first
    let winner = yield race({
      auth: call(authorize, { username, password }),
      logout: take(fetchLogout.SUCCESS),
    });

    // If `authorize` was the winner...
    if (winner.auth) {
      let url: Path = '/';

      console.log('Redirecting to:', url);
      yield put(push(url));

      // ...we send Redux appropiate actions
      // yield put({ type: CHANGE_FORM, newFormState: { username: '', password: '' } }) // Clear form
    } else {
      console.log('Logout was before Auth');
    }
  }
}

/**
 * Log out saga
 * This is basically the same as the `if (winner.logout)` of above, just written
 * as a saga that is always listening to `LOGOUT` actions
 */
export function* logoutFlow() {
  while (true) {
    yield take(fetchLogout.TRIGGER);

    yield call(logout);
    let url: Path = '/login';

    console.log('Redirecting to:', url);
    yield put(push(url));
  }
}

// The root saga is what we actually send to Redux's middleware. In here we fork
// each saga so that they are all "active" and listening.
// Sagas are fired once at the start of an app and can be thought of as processes running
// in the background, watching actions dispatched to the store.
export function* root() {
  yield fork(loginFlow);
  yield fork(logoutFlow);
}

// Bootstrap sagas
export default root;

// Little helper function to abstract going to different pages
function forwardTo(location) {
  console.log('forwardTo:', location);
  browserHistory.push(location);
}
