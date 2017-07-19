/*
 * The reducer takes care of state changes in our app through actions
 */

import { CHANGE_FORM, CHANGE_USERNAME, CLEAR_ERROR, REQUEST_ERROR, SENDING_REQUEST, SET_AUTH } from './constants';

import auth from '../../auth';

import { fromJS } from 'immutable';

// The initial state of the App
const loginState = fromJS({
  formState: {
    username: '',
    password: ''
  },
  loggedIn: auth.loggedIn()
});

function loginReducer(state = loginState, action) {
  switch (action.type) {

    case CHANGE_FORM:
      return state
        .set('formState', state.get('formState').merge(action.newFormState));
    case SET_AUTH:
      return state
        .set('loading', true)
        .set('error', false)
        .set('loggedIn', action.newAuthState);
    case SENDING_REQUEST:
      return state
        .set('loading', true)
        .set('error', false);
    case REQUEST_ERROR:
      return state
        .set('error', action.error)
        .set('loading', false);
    case CLEAR_ERROR:
      return state
        .set('error', '');

    default:
      return state
  }
}

export default loginReducer;