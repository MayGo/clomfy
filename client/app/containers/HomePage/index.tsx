/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import * as React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import Helmet from 'react-helmet';

import { createStructuredSelector } from 'reselect';

import {
  selectRepos,
  selectLoading,
  selectError,
} from 'app/containers/App/selectors';

import {
  selectUsername,
} from './selectors';

import { changeUsername } from './actions';
import { loadRepos } from '../App/actions';

import RepoListItem from 'app/containers/RepoListItem';
import Button from 'app/components/Button';
import H2 from 'app/components/H2';
import LoadingIndicator from 'app/components/LoadingIndicator';

const styles = require('./styles.css');

interface IHomePageProps {
  changeRoute?: (route: string) => void;
  loading?: boolean;
  error?: Error | false;
  repos?: any[];
  onSubmitForm?: () => React.EventHandler<React.FormEvent<any>>;
  username?: string;
  onChangeUsername?: () => React.EventHandler<React.FormEvent<any>>;
}

export class HomePage extends React.Component<IHomePageProps, {}> {
  /**
   * when initial state username is not null, submit the form to load repos
   */
  public componentDidMount() {
    if (this.props.username && this.props.username.trim().length > 0) {
      this.props.onSubmitForm();
    }
  }

  /**
   * Changes the route
   *
   * @param  {string} route The route we want to go to
   */
  private openRoute = (route) => {
    this.props.changeRoute(route);
  }

  /**
   * Changed route to '/features'
   */
  private openFeaturesPage = () => {
    this.openRoute('/features');
  }

  private openBuildpacksPage = () => {
    this.openRoute('/buildpacks');
  }

  public render() {
    let mainContent = null;

    // Show a loading indicator when we're loading
    if (this.props.loading) {
      mainContent = (<div>Loading</div>);

      // Show an error if there is one
    } else if (this.props.error !== false) {
       mainContent = (<div>Something went wrong, please try again!</div>);

      // If we're not loading, don't have an error and there are repos, show the repos
    } 

    return (
      <article>
        <Helmet>
          <title>Home Page</title>
          <meta name="description" content="A React.js Boilerplate application homepage" />
        </Helmet>
        <div>
          <section className={`${styles.textSection} ${styles.centered}`}>
           {mainContent}
          </section>
        
        </div>
      </article>
    );
  }
}

export function mapDispatchToProps(dispatch) {
  return {
    onChangeUsername: (evt) => dispatch(changeUsername(evt.target.value)),
    changeRoute: (url) => dispatch(push(url)),
    onSubmitForm: (evt) => {
      if (evt !== undefined && evt.preventDefault) { evt.preventDefault(); }
      dispatch(loadRepos());
    },

    dispatch,
  };
}

const mapStateToProps = createStructuredSelector({
  repos: selectRepos(),
  username: selectUsername(),
  loading: selectLoading(),
  error: selectError(),
});

// Wrap the component to inject dispatch and state into it
export default connect<{}, {}, IHomePageProps>(mapStateToProps, mapDispatchToProps)(HomePage);
