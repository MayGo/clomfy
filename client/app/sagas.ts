import { fork } from 'redux-saga/effects';

import loginSaga from './containers/Login/sagas';
import notificationsSaga from './containers/Notifications/sagas';

const sagas = [
  loginSaga, notificationsSaga
];

export default function* root() {
  yield sagas.map(saga => fork(saga));
}
