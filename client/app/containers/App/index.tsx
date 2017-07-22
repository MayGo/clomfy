
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

// Import the CSS reset, which HtmlWebpackPlugin transfers to the build folder
import 'sanitize.css/sanitize.css';

import MenuBar from './MenuBar';
import Footer from 'app/components/Footer';

import { browserHistory } from 'react-router';

import { selectRedirectUrl } from "app/containers/App/selectors";

const styles = require('./styles.css');

interface IAppProps {
  children?: React.ReactNode;
}

class App extends React.Component<IAppProps, {}> {

  public render() {
    return (
      <div className={styles.wrapper}>
        <MenuBar />
        {this.props.children}
        <Footer />
      </div>
    );
  }
}

export default connect<{}, {}, IAppProps>(undefined, undefined)(App);
