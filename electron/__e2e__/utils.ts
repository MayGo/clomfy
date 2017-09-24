import { resolve, join } from 'path';
import { Application } from 'spectron';

const os = require('os');

export const LONG_TIMEOUT = 60000;

export function getElectronPath() {
  const extension = process.platform === 'win32' ? '.cmd' : '';
  return `node_modules/.bin/electron${extension}`;
}

export function createApplication(options?: any) {
  return new Application(
    Object.assign(
      {
        path: exports.getElectronPath(),
        args: ['./dist'],
      },
      options,
    ),
  );
}

export function startApplication(app: Application) {
  if (!app || app.isRunning()) {
    return;
  }
  console.log('Starting application');
  return app.start();
}

export function stopApplication(app: Application) {
  if (!app || !app.isRunning()) {
    return;
  }
  console.log('Stopping application');
  return app.stop();
}
