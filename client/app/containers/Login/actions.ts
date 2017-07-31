/*
 * Actions describe changes of state in your application
 */

// We import constants to name our actions' type
import {
  CHANGE_FORM
} from './constants';


/**
 * Sets the form state
 * @param  {object} newFormState          The new state of the form
 * @param  {string} newFormState.username The new text of the username input field of the form
 * @param  {string} newFormState.password The new text of the password input field of the form
 */
export function changeForm(newFormState) {
  return { type: CHANGE_FORM, newFormState }
}