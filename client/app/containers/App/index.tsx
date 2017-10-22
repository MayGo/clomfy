/**
 *
 * App.react.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import * as React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Switch, Route } from 'react-router-dom';

// Import the CSS reset, which HtmlWebpackPlugin transfers to the build folder
import 'sanitize.css/sanitize.css';

import MenuBar from './MenuBar';
import Footer from 'app/components/Footer';
import { LoginRoute } from 'app/RoutePaths';
import Login from '../Login';
import NotFoundPage from '../NotFoundPage';
import HomePage from 'app/containers/HomePage';
import AppPage from 'app/containers/AppPage';

interface IAppProps {
  children?: React.ReactNode;
}

class App extends React.Component<IAppProps, {}> {
  public render() {
    return (
      <div>
        <MenuBar />
        {this.props.children}
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path={LoginRoute} component={Login} />

          <Route path="/" component={NotFoundPage} />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default connect<{}, {}, IAppProps>(undefined, undefined)(App);
