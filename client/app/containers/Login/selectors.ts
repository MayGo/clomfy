/**
 * Buildpacks selectors
 */

import { createSelector } from 'reselect';

const selectLoginState = () => (state) => state.get('login');

const makeQueryFormState = () => createSelector(
  selectLoginState(),
  (loginState) => loginState.get('formState').toObject()
);

const makeQueryCurrentlySending = () => createSelector(
  selectLoginState(),
  (loginState) => loginState.get('currentlySending')
);

export {
  selectLoginState,
  makeQueryFormState,
  makeQueryCurrentlySending
};
