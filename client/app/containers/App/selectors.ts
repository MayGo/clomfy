/**
 * The global state selectors
 */

import { createSelector } from 'reselect';

const selectGlobal = () => (state) => state.get('global');

const selectCurrentUser = () => createSelector(
  selectGlobal(),
  (globalState) => globalState.get('currentUser'),
);

const selectRedirectUrl = () => createSelector(
  selectGlobal(),
  (loginState) => loginState.get('redirectUrl')
);

const selectLoading = () => createSelector(
  selectGlobal(),
  (globalState) => globalState.get('loading'),
);

const selectError = () => createSelector(
  selectGlobal(),
  (globalState) => globalState.get('error'),
);

const selectRepos = () => createSelector(
  selectGlobal(),
  (globalState) => globalState.getIn(['userData', 'repositories']),
);

const selectLocationState = () => {
  let prevRoutingState;
  let prevRoutingStateJS;

  return (state) => {
    const routingState = state.get('route'); // or state.route

    if (!routingState.equals(prevRoutingState)) {
      prevRoutingState = routingState;
      prevRoutingStateJS = routingState.toJS();
    }

    return prevRoutingStateJS;
  };
};

export {
  selectGlobal,
  selectCurrentUser,
  selectLoading,
  selectError,
  selectRepos,
  selectLocationState,
  selectRedirectUrl,
};
