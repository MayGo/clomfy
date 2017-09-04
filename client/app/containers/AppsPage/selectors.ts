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

const loadApp = () => (state, props) => {
  const guid = props.params.guid;

  const app = selectApps(state).get('apps').find(item => {
    return item.getIn(['metadata', 'guid']) === guid;
  });
  return app;
};

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
  loadApp,
  selectTotal,
  selectOrderBy,
  selectOrderDirection,
};
