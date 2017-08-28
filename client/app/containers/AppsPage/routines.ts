import { createRoutine } from 'redux-saga-routines';

export const fetchApps = createRoutine('APPS');
export const fetchAppInstances = createRoutine('APPS_INSTANCES');
export const changeAppState = createRoutine('DO_APP_ACTION');
export const newEventsForApps = createRoutine('EVENTS_FOR_APPS');
export const terminateInstance = createRoutine('APP_TERMINATE_INSTANCE');
