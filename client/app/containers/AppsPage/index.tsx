/*
 * AppsPage
 *
 * List all the features
 */
import * as React from 'react';

import {
  selectRepos
} from 'app/containers/App/selectors';

import AppsList from 'app/components/AppsList';

import { loadApps } from './actions';

import { makeQueryApps,
  selectLoading,
  selectError, } from './selectors';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

interface IAppsPageProps {
  changeRoute?: (route: string) => void;
  loading?: boolean;
  error?: Error | false;
  apps?: any[];
  onSubmitForm?: () => React.EventHandler<React.FormEvent<any>>;
}

export class AppsPage extends React.Component<IAppsPageProps, {}> { // eslint-disable-line react/prefer-stateless-function

  public componentDidMount() {
    this.props.onSubmitForm();
  }

  public render() {
    const { loading, error, apps } = this.props;
    const appsListProps = {
      loading,
      error,
      apps,
    };

    return (
      <div>
        <AppsList {...appsListProps} />
      </div>
    );
  }
}

export function mapDispatchToProps(dispatch) {
  return {

    onSubmitForm: (evt) => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(loadApps());
    },
  };
}

const mapStateToProps = createStructuredSelector({

  loading: selectLoading(),
  error: selectError(),
  apps: makeQueryApps(),
});

// Wrap the component to inject dispatch and state into it
export default connect<{}, {}, IAppsPageProps>(mapStateToProps, mapDispatchToProps)(AppsPage);
