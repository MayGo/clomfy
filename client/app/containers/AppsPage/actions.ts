/*
 * App Actions
 *
 * Actions change things in your application
 * Since this boilerplate uses a uni-directional data flow, specifically redux,
 * we have these actions which are the only way your application interacts with
 * your application state. This guarantees that your state is up to date and nobody
 * messes it up weirdly somewhere.
 *
 * To add a new Action:
 * 1) Import your constant
 * 2) Add a function like this:
 *    export function yourAction(var) {
 *        return { type: YOUR_ACTION_CONSTANT, var: var }
 *    }
 */

import {
  LOAD_APPS,
  LOAD_APPS_SUCCESS,
  LOAD_APPS_ERROR,
} from './constants';

/**
 * Load the repositories, this action starts the request saga
 *
 * @return {object} An action object with a type of LOAD_REPOS
 */
export function loadApps() {
  return {
    type: LOAD_APPS,
  };
}

export function appsLoaded(apps) {
  return {
    type: LOAD_APPS_SUCCESS,
    apps
  };
}

export function appsLoadingError(error) {
  return {
    type: LOAD_APPS_ERROR,
    error,
  };
}
