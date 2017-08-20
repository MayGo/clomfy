import { createRoutine } from 'redux-saga-routines';

export const fetchApps = createRoutine('APPS');
export const fetchAppInstances = createRoutine('APPS_INSTANCES');
export const restageApp = createRoutine('APP_RESTAGE');
export const terminateInstance = createRoutine('APP_TERMINATE_INSTANCE');
