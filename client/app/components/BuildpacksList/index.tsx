import * as React from 'react';

import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

import CheckBoxIcon from 'material-ui/svg-icons/toggle/check-box';
import CheckBoxIconOutline from 'material-ui/svg-icons/toggle/check-box-outline-blank';

interface IListProps {
  loading?: boolean;
  error?: Error | boolean;
  buildpacks?: any[];
}

class BuildpacksList extends React.Component<IListProps, {}> {
  public render() {
    const { loading, error, buildpacks } = this.props;
    if (loading) {
      return <div>Loading</div>;
    }

    if (error !== false) {

      return <div>Something went wrong, please try again!</div>;
    }
    if (!buildpacks) {
      return <div>No buildpacks</div>;
    }
    console.log(buildpacks)
    const enabledIcon = (enabled) => (enabled) ? <CheckBoxIcon /> : <CheckBoxIconOutline />

    const listItems = buildpacks.map((item) =>
      <TableRow>
        <TableRowColumn>{item.entity.position}</TableRowColumn>
        <TableRowColumn>{item.entity.name}</TableRowColumn>
        <TableRowColumn>{item.entity.filename}</TableRowColumn>
        <TableRowColumn>{enabledIcon(item.entity.enabled)}</TableRowColumn>
        <TableRowColumn>{enabledIcon(item.entity.locked)}</TableRowColumn>
      </TableRow>
    );


    return <Table>
      <TableHeader>
        <TableRow>
          <TableHeaderColumn>ID</TableHeaderColumn>
          <TableHeaderColumn>Name</TableHeaderColumn>
          <TableHeaderColumn>Filename</TableHeaderColumn>
          <TableHeaderColumn>Enabled</TableHeaderColumn>
          <TableHeaderColumn>Locked</TableHeaderColumn>
        </TableRow>
      </TableHeader><TableBody>{listItems}</TableBody>
    </Table>;

  }
}


export default BuildpacksList;
