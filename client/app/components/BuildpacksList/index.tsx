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

interface IListProps {
  loading?: boolean;
  error?: Error | boolean;
  buildpacks?: any[];
}

class BuildpacksList extends React.Component<IListProps, {}> {
  public render() {
    const { loading, error, buildpacks } = this.props;
    if (loading) {
      return <LinearProgress mode="indeterminate" />;
    }

    if (error !== false) {
      return <p>Something went wrong, please try again!</p>;
    }
    if (!buildpacks) {
      return <p>No buildpacks</p>;
    }
    console.log(buildpacks);
    const enabledIcon = enabled =>
      enabled ? <CheckBoxIcon /> : <CheckBoxIconOutline />;

    const listItems = buildpacks.map(item =>
      <TableRow key={item.metadata.guid}>
        <TableCell>
          {item.entity.position}
        </TableCell>
        <TableCell>
          {item.entity.name}
        </TableCell>
        <TableCell>
          {item.entity.filename}
        </TableCell>
        <TableCell>
          {enabledIcon(item.entity.enabled)}
        </TableCell>
        <TableCell>
          {enabledIcon(item.entity.locked)}
        </TableCell>
      </TableRow>,
    );

    return (
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Filename</TableCell>
            <TableCell>Enabled</TableCell>
            <TableCell>Locked</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {listItems}
        </TableBody>
      </Table>
    );
  }
}

export default BuildpacksList;
