/**
 * Notifications selectors
 */

import { createSelector } from 'reselect';

const selectNotifications = state => state.get('notifications');
const selectLoading = () =>
  createSelector(selectNotifications, notificationsState =>
    notificationsState.get('loading'),
  );

const selectError = () =>
  createSelector(selectNotifications, notificationsState =>
    notificationsState.get('error'),
  );

const makeQueryNotifications = () =>
  createSelector(selectNotifications, notificationsState =>
    notificationsState.get('list').toJS(),
  );

export {
  selectNotifications,
  makeQueryNotifications,
  selectLoading,
  selectError,
};
