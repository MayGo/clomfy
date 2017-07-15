/*
 * BuildpacksPage
 *
 * List all the features
 */
import * as React from 'react';

import Helmet from 'react-helmet';

import {
  selectRepos,
  selectLoading,
  selectError,
} from 'app/containers/App/selectors';

import BuildpacksList from 'app/components/BuildpacksList';

import { loadBuildpacks } from './actions';

import { makeQueryBuildpacks } from './selectors';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

interface IBuildpacksPageProps {
  changeRoute?: (route: string) => void;
  loading?: boolean;
  error?: Error | false;
  buildpacks?: any[];
  onSubmitForm?: () => React.EventHandler<React.FormEvent<any>>;
}

export class BuildpacksPage extends React.Component<IBuildpacksPageProps, {}> { // eslint-disable-line react/prefer-stateless-function

  public componentDidMount() {
    this.props.onSubmitForm();
  }

  public render() {
    const { loading, error, buildpacks } = this.props;
    const buildpacksListProps = {
      loading,
      error,
      buildpacks,
    };

    return (
      <div>
        <Helmet
          title="Buildpacks"
          meta={[
            { name: 'description', content: 'Buildpacks' }
          ]}
        />

        <BuildpacksList {...buildpacksListProps} />
      </div>
    );
  }
}

export function mapDispatchToProps(dispatch) {
  return {

    onSubmitForm: (evt) => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(loadBuildpacks());
    },
  };
}

const mapStateToProps = createStructuredSelector({

  loading: selectLoading(),
  error: selectError(),
  buildpacks: makeQueryBuildpacks(),
});

// Wrap the component to inject dispatch and state into it
export default connect<{}, {}, IBuildpacksPageProps>(mapStateToProps, mapDispatchToProps)(BuildpacksPage);
