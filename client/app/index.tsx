import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import Root from './Root';
const rootEl = document.getElementById('root');
const render = Component =>
  ReactDOM.render(
    <AppContainer>
      <Component />
    </AppContainer>,
    rootEl,
  );

render(Root);
// Hot Module Replacement API
if (module.hot) {
  console.log('Hot reloading enabled in index');
  module.hot.accept('./Root', () => {
    const NextRoot = require('./Root').default;

    console.log('Hot reloading Root');
    render(NextRoot);
  });
}
