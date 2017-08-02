import * as React from 'react';

import Table, {
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from 'material-ui/Table';

import { LinearProgress } from 'material-ui/Progress';
import CheckBoxIcon from 'material-ui-icons/CheckBox';
import CheckBoxIconOutline from 'material-ui-icons/CheckBoxOutlineBlank';

import TimeAgo from 'timeago-react';

interface IListProps {
  loading?: boolean;
  error?: Error | boolean;
  apps?: any[];
}

class AppsList extends React.Component<IListProps, {}> {
  public render() {
    const { loading, error, apps } = this.props;
    if (loading) {
      return <LinearProgress mode="indeterminate" />;
    }

    if (error !== false) {
      return <p>Something went wrong, please try again!</p>;
    }
    if (!apps) {
      return <p>No apps</p>;
    }

    console.log(apps);

    const enabledIcon = enabled =>
      enabled ? <CheckBoxIcon /> : <CheckBoxIconOutline />;

    const listItems = apps.map(item =>
      <TableRow key={item.metadata.guid}>
        <TableCell>
          {item.entity.state}
        </TableCell>
        <TableCell>
          {item.entity.name}
        </TableCell>
        <TableCell>
          {item.entity.instances}
        </TableCell>
        <TableCell>
          {item.entity.memory}
        </TableCell>
        <TableCell>
          <TimeAgo datetime={item.entity.package_updated_at} />
        </TableCell>
      </TableRow>,
    );

    return (
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>State</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Instances</TableCell>
            <TableCell>Memory</TableCell>
            <TableCell>Last push</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {listItems}
        </TableBody>
      </Table>
    );
  }
}

export default AppsList;
