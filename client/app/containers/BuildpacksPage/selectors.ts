/**
 * Buildpacks selectors
 */

import { createSelector } from 'reselect';

const selectBuildpacks = (state) => state.get('buildpacks');

const makeQueryBuildpacks = () => createSelector(
  selectBuildpacks,
  (buildpacksState) => buildpacksState.get('buildpacks')
);

export {
  selectBuildpacks,
  makeQueryBuildpacks,
};
