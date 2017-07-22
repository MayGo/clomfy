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
  events?: any[];
}

class EventsList extends React.Component<IListProps, {}> {
  public render() {
    const { loading, error, events } = this.props;
    if (loading) {
      return <LinearProgress mode="indeterminate" />;
    }

    if (error !== false) {

      return <p>Something went wrong, please try again!</p>;
    }
    if (!events) {
      return <p>No events</p>;
    }

    console.log(events)

    const enabledIcon = (enabled) => (enabled) ? <CheckBoxIcon /> : <CheckBoxIconOutline />

    const listItems = events.map((item) =>
      <TableRow key={item.metadata.guid}>
        <TableRowColumn>{item.entity.type}</TableRowColumn>
        <TableRowColumn>{item.entity.actor_type}</TableRowColumn>
        <TableRowColumn>{item.entity.actor_name}</TableRowColumn>
        <TableRowColumn>{item.entity.actee_type}</TableRowColumn>
        <TableRowColumn>{item.entity.actee_name}</TableRowColumn>
        <TableRowColumn>
          <TimeAgo
            datetime={item.entity.timestamp} />
        </TableRowColumn>
      </TableRow>
    );


    return <Table>
      <TableHeader>
        <TableRow>
          <TableHeaderColumn>Type</TableHeaderColumn>
          <TableHeaderColumn>Actor type</TableHeaderColumn>
          <TableHeaderColumn>Actor name</TableHeaderColumn>
          <TableHeaderColumn>Actee type</TableHeaderColumn>
          <TableHeaderColumn>Actee name</TableHeaderColumn>
          <TableHeaderColumn>Last push</TableHeaderColumn>
        </TableRow>
      </TableHeader><TableBody>{listItems}</TableBody>
    </Table>;

  }
}


export default EventsList;
