import { createRoutine } from 'redux-saga-routines';

export const fetchApps = createRoutine('APPS');
export const fetchAppInstances = createRoutine('APPS_INSTANCES');
