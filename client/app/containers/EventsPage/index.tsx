import { changePage, order } from './actions';

import { bindRoutineCreators } from 'redux-saga-routines';
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
} from './selectors';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

interface IEventsPageProps {
  fetchEvents: any;
  loading?: boolean;
  error?: Error | false;
  page: number;
  total: number;
  orderDirection: string;
  orderBy: string;
  events?: any[];
  onRequestSort: any;
  onSubmitForm?: () => React.EventHandler<React.FormEvent<any>>;
}

export class EventsPage extends React.Component<IEventsPageProps, {}> {
  constructor(props) {
    super(props);
    this.changePage.bind(this);
  }
  public componentDidMount() {
    console.log('Load initial events');
    this.changePage(1);
  }

  public changePage(page) {
    console.log('Changing page to:', page);
    this.props.fetchEvents.trigger({ page });
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
          changePage={currentPage => this.changePage(currentPage)}
        />
      </div>
    );
  }
}

export function mapDispatchToProps(dispatch) {
  return {
    ...bindRoutineCreators({ fetchEvents }, dispatch),
    onRequestSort: (orderBy: string, orderDirection: string) =>
      dispatch(order({ orderBy, orderDirection })),
  };
}

const mapStateToProps = createStructuredSelector({
  loading: selectLoading(),
  error: selectError(),
  events: makeQueryEvents(),
  total: selectTotal(),
  orderBy: selectOrderBy(),
  orderDirection: selectOrderDirection(),
});

// Wrap the component to inject dispatch and state into it
export default connect<{}, {}, IEventsPageProps>(
  mapStateToProps,
  mapDispatchToProps,
)(EventsPage);
