import { changePage, order } from './actions';

import { fetchEvents } from './routines';

import * as React from 'react';
import EventsList from 'app/components/EventsList';

import {
  makeQueryEvents,
  selectLoading,
  selectError,
  selectTotal,
  selectOrderBy,
  selectOrderDirection,
  selectPage,
} from './selectors';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { bindActionCreators } from 'redux';

interface IEventsPageProps {
  fetchEvents: any;
  loading?: boolean;
  error?: Error | false;
  page: number;
  total: number;
  orderDirection: 'desc' | 'asc';
  orderBy: string;
  events?: any[];
  onRequestSort: any;
  changePage: any;
}

export class EventsPage extends React.Component<IEventsPageProps, {}> {
  constructor(props: any) {
    super(props);
  }
  public componentDidMount() {
    console.log('Load initial events');
    this.props.changePage(1);
  }

  public render() {
    const {
      loading,
      error,
      page,
      events,
      total,
      orderDirection,
      orderBy,
      onRequestSort,
    } = this.props;

    const eventsListProps = {
      loading,
      error,
      events,
      page,
      total,
      orderDirection,
      orderBy,
      onRequestSort,
    };

    return (
      <div>
        <EventsList
          {...eventsListProps}
          changePage={currentPage => this.props.changePage(currentPage)}
        />
      </div>
    );
  }
}

export function mapDispatchToProps(dispatch: any) {
  return {
    fetchEvents: bindActionCreators(fetchEvents, dispatch),
    onRequestSort: (orderBy: string, orderDirection: string) =>
      dispatch(order({ orderBy, orderDirection })),
    changePage: (page: number) => dispatch(changePage({ page })),
  };
}

const mapStateToProps = createStructuredSelector({
  loading: selectLoading(),
  error: selectError(),
  events: makeQueryEvents(),
  total: selectTotal(),
  orderBy: selectOrderBy(),
  page: selectPage(),
  orderDirection: selectOrderDirection(),
});

// Wrap the component to inject dispatch and state into it
export default connect<{}, {}, IEventsPageProps>(
  mapStateToProps,
  mapDispatchToProps,
)(EventsPage);
