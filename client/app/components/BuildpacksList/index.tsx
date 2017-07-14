import * as React from 'react';

import List from 'app/components/List';
import ListItem from 'app/components/ListItem';
import LoadingIndicator from 'app/components/LoadingIndicator';
import { BuildpackListItem } from '../BuildpackListItem';

interface IListProps {
  loading?: boolean;
  error?: Error | boolean;
  buildpacks?: any[];
}

class BuildpacksList extends React.Component<IListProps, {}> {
  public render() {
    const { loading, error, buildpacks } = this.props;
    if (loading) {
      return <List component={LoadingIndicator} />;
    }

    if (error !== false) {
      const ErrorComponent = () => (
        <ListItem item={'Something went wrong, please try again!'} />
      );
      return <List component={ErrorComponent} />;
    }
    console.log(buildpacks);

    if (buildpacks) {
      return <List items={buildpacks} component={BuildpackListItem} />;
    }

    return null;
  }
}


export default BuildpacksList;
