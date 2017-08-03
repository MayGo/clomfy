import * as React from 'react';

import Table, {
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
} from 'material-ui/Table';

import { LinearProgress } from 'material-ui/Progress';
import CheckBoxIcon from 'material-ui-icons/CheckBox';
import CheckBoxIconOutline from 'material-ui-icons/CheckBoxOutlineBlank';

import TimeAgo from 'timeago-react';
import Pagination from '../Pagination';

interface IListProps {
  loading?: boolean;
  error?: Error | boolean;
  events?: any[];
  page?: number;
  total?: number;
  orderDirection: string;
  orderBy: string;
  changePage: any;
  onRequestSort: any;
}
interface IListState {
  display: number;
}

class EventsList extends React.Component<IListProps, IListState> {
  constructor(props: any) {
    super(props);
    this.state = {
      display: 7,
    };
  }

  createSortHandler = (orderBy: string, orderDirection: string) => event => {
    console.log('Sorting events:', orderBy, orderDirection);
    this.props.onRequestSort(
      orderBy,
      orderDirection === 'desc' ? 'asc' : 'desc',
    );
  };

  public render() {
    const { loading, error, events, orderDirection, orderBy } = this.props;
    if (loading) {
      return <LinearProgress mode="indeterminate" />;
    }

    if (error !== false) {
      return <p>Something went wrong, please try again!</p>;
    }
    if (!events) {
      return <p>No events</p>;
    }

    console.log(events);

    const enabledIcon = enabled =>
      enabled ? <CheckBoxIcon /> : <CheckBoxIconOutline />;

    const listItems = events.map(item =>
      <TableRow key={item.metadata.guid}>
        <TableCell>
          {item.entity.type}
        </TableCell>
        <TableCell>
          {item.entity.actor_type}
        </TableCell>
        <TableCell>
          {item.entity.actor_name}
        </TableCell>
        <TableCell>
          {item.entity.actee_type}
        </TableCell>
        <TableCell>
          {item.entity.actee_name}
        </TableCell>
        <TableCell>
          <TimeAgo datetime={item.entity.timestamp} />
        </TableCell>
      </TableRow>,
    );

    return (
      <div>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Type</TableCell>
              <TableCell>Actor type</TableCell>
              <TableCell>Actor name</TableCell>
              <TableCell>Actee type</TableCell>
              <TableCell>Actee name</TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'timestamp'}
                  direction={orderDirection}
                  onClick={this.createSortHandler('timestamp', orderDirection)}
                >
                  Last push
                </TableSortLabel>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {listItems}
          </TableBody>
        </Table>
        <Pagination
          total={this.props.total}
          current={this.props.page}
          display={this.state.display}
          onChange={page => this.props.changePage(page)}
        />
      </div>
    );
  }
}

export default EventsList;
