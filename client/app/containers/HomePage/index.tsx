/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import * as React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import { createStructuredSelector } from 'reselect';

import {
  selectRepos,
  selectLoading,
  selectError,
} from 'app/containers/App/selectors';

import { selectUsername } from './selectors';

import { changeUsername } from './actions';
import { loadRepos } from '../App/actions';
import { makeQueryApps } from 'app/containers/AppsPage/selectors';

interface IHomePageProps {
  changeRoute?: (route: string) => void;
  loading?: boolean;
  error?: Error | false;
  apps?: any[];
}

export class HomePage extends React.Component<IHomePageProps, {}> {
  public render() {
    const { apps } = this.props;

    return (
      <article>
        <div>
          asdasd
          <section>{apps}</section>
        </div>
      </article>
    );
  }
}

export function mapDispatchToProps(dispatch) {
  return {
    changeRoute: url => dispatch(push(url)),
    dispatch,
  };
}

const mapStateToProps = createStructuredSelector({
  apps: makeQueryApps(),
  loading: selectLoading(),
  error: selectError(),
});

// Wrap the component to inject dispatch and state into it
export default connect<{}, {}, IHomePageProps>(
  mapStateToProps,
  mapDispatchToProps,
)(HomePage);
