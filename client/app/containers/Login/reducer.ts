/*
 * The reducer takes care of state changes in our app through actions
 */

import { CHANGE_FORM } from './constants';

import auth from '../../auth';
import { fetchLogin, fetchLogout } from './routines';

import { fromJS } from 'immutable';

// The initial state of the App
const loginState = fromJS({
  loading: false,
  error: false,
  data: null,
  formState: {
    username: auth.getSavedUsername(),
    password: auth.getSavedPassword(),
  },
  isAuthenticated: auth.isAuthenticated(),
});

function loginReducer(state = loginState, action) {
  switch (action.type) {
    case CHANGE_FORM:
      return state.set(
        'formState',
        state.get('formState').merge(action.newFormState),
      );

    case fetchLogin.TRIGGER:
      return state.set('loading', true);
    case fetchLogin.SUCCESS:
      return state.set('data', action.payload).set('isAuthenticated', true);
    case fetchLogin.FAILURE:
      return state.set('error', action.payload);
    case fetchLogin.FULFILL:
      return state.set('loading', false);

    case CHANGE_FORM:
      return state.set(
        'formState',
        state.get('formState').merge(action.newFormState),
      );

    case fetchLogout.SUCCESS:
      return state.set('isAuthenticated', false);

    default:
      return state;
  }
}

export default loginReducer;
