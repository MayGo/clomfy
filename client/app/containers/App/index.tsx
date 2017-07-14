/**
 *
 * App.react.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import * as React from 'react';
import Helmet from 'react-helmet';

// Import the CSS reset, which HtmlWebpackPlugin transfers to the build folder
import 'sanitize.css/sanitize.css';

import Img from 'app/components/Img';
import MenuBar from './MenuBar';
import Footer from 'app/components/Footer';
import A from 'app/components/A';

const styles = require('./styles.css');


import * as injectTapEventPlugin from 'react-tap-event-plugin';

interface IAppProps {
  children?: React.ReactNode;
}

injectTapEventPlugin(); 

class App extends React.Component<IAppProps, {}> {
  public render() {
    return (
      <div className={styles.wrapper}>
        <Helmet
          titleTemplate="%s - React.js Boilerplate"
        >
          <meta name="description" content="A React.js Boilerplate application" />
        </Helmet>
        <MenuBar title='Title'/>
        {this.props.children}
        <Footer />
      </div>
    );
  }
}

export default App;
