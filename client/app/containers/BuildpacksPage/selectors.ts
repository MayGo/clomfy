/**
 * Buildpacks selectors
 */

import { createSelector } from 'reselect';

const selectBuildpacks = (state) => state.get('buildpacks');
const selectLoading = () => createSelector(
  selectBuildpacks,
  (buildpacksState) => buildpacksState.get('loading'),
);

const selectError = () => createSelector(
  selectBuildpacks,
  (buildpacksState) => buildpacksState.get('error'),
);


const makeQueryBuildpacks = () => createSelector(
  selectBuildpacks,
  (buildpacksState) => buildpacksState.get('buildpacks')
);

export {
  selectBuildpacks,
  makeQueryBuildpacks,
  selectLoading,
  selectError
};
