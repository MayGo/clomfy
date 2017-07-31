/**
 * Buildpacks selectors
 */

import { createSelector } from 'reselect';

const selectLoginState = () => (state) => state.get('login');

const makeQueryFormState = () => createSelector(
  selectLoginState(),
  (loginState) => loginState.get('formState').toObject()
);


const selectIsAuthenticated = () => createSelector(
  selectLoginState(),
  (loginState) => loginState.get('isAuthenticated')
);

const selectError = () => createSelector(
  selectLoginState(),
  (loginState) => loginState.get('error'),
);

const selectLoading = () => createSelector(
  selectLoginState(),
  (loginState) => loginState.get('loading'),
);

export {
  selectLoginState,
  selectIsAuthenticated,
  makeQueryFormState,

  selectLoading,
  selectError,
};
