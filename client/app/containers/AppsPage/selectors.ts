import { RESTAGING_APP } from './constants';
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

const makeQueryApps = (): any =>
  createSelector(selectApps, appsState => appsState.get('apps'));

const makeQueryRestagingApps = (): any =>
  createSelector(selectApps, appsState =>
    appsState
      .get('apps')
      .filter(item => item.getIn(['entity.state']) === RESTAGING_APP),
  );

const selectOrderBy = () =>
  createSelector(selectApps, appsState => appsState.get('orderBy'));

const selectOrderDirection = () =>
  createSelector(selectApps, appsState => appsState.get('orderDirection'));

export {
  selectApps,
  makeQueryApps,
  makeQueryRestagingApps,
  selectLoading,
  selectError,
  selectPage,
  selectTotal,
  selectOrderBy,
  selectOrderDirection,
};
