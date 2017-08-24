import { CHANGE_PAGE, ORDER, REFRESH_APP } from './constants';

export function order(payload: any) {
  return {
    type: ORDER,
    payload,
  };
}

export function changePage(payload: any) {
  return {
    type: CHANGE_PAGE,
    payload,
  };
}

export function refreshApp(payload: any) {
  return {
    type: REFRESH_APP,
    payload,
  };
}
