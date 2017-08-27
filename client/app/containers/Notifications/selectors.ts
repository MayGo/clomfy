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

const unreadNotificationsSize = () =>
  createSelector(
    selectNotifications,
    notificationsState =>
      notificationsState.get('list').filter(item => !item.get('isRead')).size,
  );

export {
  selectNotifications,
  makeQueryNotifications,
  selectLoading,
  selectError,
  unreadNotificationsSize,
};
