import { createSelector } from 'reselect';

const selectApps = state => state.get('apps');
const selectLoading = () =>
  createSelector(selectApps, appsState => appsState.get('loading'));

const selectError = () =>
  createSelector(selectApps, appsState => appsState.get('error'));

const selectPage = () =>
  createSelector(selectApps, appsState => appsState.get('page'));

const selectTotal = () =>
  createSelector(selectApps, appsState => appsState.get('total'));

const makeQueryApps = () =>
  createSelector(selectApps, appsState => appsState.get('apps'));

const selectOrderBy = () =>
  createSelector(selectApps, appsState => appsState.get('orderBy'));

const selectOrderDirection = () =>
  createSelector(selectApps, appsState => appsState.get('orderDirection'));

export {
  selectApps,
  makeQueryApps,
  selectLoading,
  selectError,
  selectPage,
  selectTotal,
  selectOrderBy,
  selectOrderDirection,
};
