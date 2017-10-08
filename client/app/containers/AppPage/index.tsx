import { changePage, order } from '../AppsPage/actions';

import * as React from 'react';
import toJS from 'app/components/ToJs';

import { loadApp } from '../AppsPage/selectors';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { AppAction } from 'app/containers/AppsPage/AppActionEnum';
import AppBoard from 'app/components/AppBoard';

interface IPageProps {
  app?: any;
}

class AppPage extends React.Component<IPageProps, {}> {
  public render() {
    const { app } = this.props;
    const appProps = { app };
    return (
      <div>
        <AppBoard {...appProps} />
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  app: loadApp(),
});

export default connect<{}, {}, IPageProps>(mapStateToProps, undefined)(
  toJS(AppPage),
);
