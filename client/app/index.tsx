import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import Root from './Root';
import * as injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

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
  module.hot.accept('./Root', () => render(Root));
}
