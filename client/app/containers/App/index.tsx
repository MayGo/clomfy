/**
 *
 * App.react.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import * as React from 'react';

// Import the CSS reset, which HtmlWebpackPlugin transfers to the build folder
import 'sanitize.css/sanitize.css';

import MenuBar from './MenuBar';
import Footer from 'app/components/Footer';

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

export default App;
