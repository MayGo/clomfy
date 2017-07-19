import * as React from 'react';

import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

import LinearProgress from 'material-ui/LinearProgress';
import CheckBoxIcon from 'material-ui/svg-icons/toggle/check-box';
import CheckBoxIconOutline from 'material-ui/svg-icons/toggle/check-box-outline-blank';

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

    console.log(apps)

    const enabledIcon = (enabled) => (enabled) ? <CheckBoxIcon /> : <CheckBoxIconOutline />

    const listItems = apps.map((item) =>
      <TableRow key={item.metadata.guid}>
        <TableRowColumn>{item.entity.state}</TableRowColumn>
        <TableRowColumn>{item.entity.name}</TableRowColumn>
        <TableRowColumn>{item.entity.instances}</TableRowColumn>
        <TableRowColumn>{item.entity.memory}</TableRowColumn>
        <TableRowColumn>
          <TimeAgo
            datetime={item.entity.package_updated_at} />
        </TableRowColumn>
      </TableRow>
    );


    return <Table>
      <TableHeader>
        <TableRow>
          <TableHeaderColumn>State</TableHeaderColumn>
          <TableHeaderColumn>Name</TableHeaderColumn>
          <TableHeaderColumn>Instances</TableHeaderColumn>
          <TableHeaderColumn>Memory</TableHeaderColumn>
          <TableHeaderColumn>Last push</TableHeaderColumn>
        </TableRow>
      </TableHeader><TableBody>{listItems}</TableBody>
    </Table>;

  }
}


export default AppsList;
