import { MARK_AS_READ } from './constants';

export function markNotificationsAsRead(payload) {
  return { type: MARK_AS_READ, payload };
}
