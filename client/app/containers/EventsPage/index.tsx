import { changePage } from './actions';

import { bindRoutineCreators } from 'redux-saga-routines';
import { fetchEvents } from './routines';

import * as React from 'react';
import EventsList from 'app/components/EventsList';

import {
  makeQueryEvents,
  selectLoading,
  selectError,
  selectTotal
} from './selectors';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

interface IEventsPageProps {
  fetchEvents: any;
  loading?: boolean;
  error?: Error | false;
  page: number;
  total: number;
  events?: any[];
  onSubmitForm?: () => React.EventHandler<React.FormEvent<any>>;
}

export class EventsPage extends React.Component<IEventsPageProps, {}> {

  constructor(props) {
    super(props);
    this.changePage.bind(this);
  }
  public componentDidMount() {
    console.log("Load initial events")
    this.changePage(1);
  }

  public changePage(page) {
    console.log("Changing page to:", page);
    this.props.fetchEvents.trigger({ page });
  }

  public render() {
    const { loading, error, page, events, total } = this.props;

    const eventsListProps = {
      loading,
      error,
      events,
      page,
      total
    };

    return (
      <div>
        <EventsList {...eventsListProps} changePage={(page) => this.changePage(page)} />
      </div>
    );
  }
}

export function mapDispatchToProps(dispatch) {
  return {
    ...bindRoutineCreators({ fetchEvents }, dispatch),
  };
}

const mapStateToProps = createStructuredSelector({

  loading: selectLoading(),
  error: selectError(),
  events: makeQueryEvents(),
  total: selectTotal(),
});

// Wrap the component to inject dispatch and state into it
export default connect<{}, {}, IEventsPageProps>(mapStateToProps, mapDispatchToProps)(EventsPage);
