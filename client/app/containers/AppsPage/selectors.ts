/**
 * Apps selectors
 */

import { createSelector } from 'reselect';

const selectApps = (state) => state.get('apps');
const selectLoading = () => createSelector(
  selectApps,
  (appsState) => appsState.get('loading'),
);

const selectError = () => createSelector(
  selectApps,
  (appsState) => appsState.get('error'),
);


const makeQueryApps = () => createSelector(
  selectApps,
  (appsState) => appsState.get('apps')
);

export {
  selectApps,
  makeQueryApps,
  selectLoading,
  selectError
};
