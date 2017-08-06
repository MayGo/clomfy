import { fork } from 'redux-saga/effects';

import loginSaga from './containers/Login/sagas';
import appsSaga from './containers/AppsPage/sagas';
import notificationsSaga from './containers/Notifications/sagas';

const sagas = [loginSaga, notificationsSaga, appsSaga];

export default function* root() {
  yield sagas.map(saga => fork(saga));
}
