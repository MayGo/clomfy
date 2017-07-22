/*
 * EventsPage
 *
 * List all the features
 */
import * as React from 'react';

import {
  selectRepos
} from 'app/containers/App/selectors';

import EventsList from 'app/components/EventsList';

import { loadEvents } from './actions';

import { makeQueryEvents,
  selectLoading,
  selectError, } from './selectors';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

interface IEventsPageProps {
  changeRoute?: (route: string) => void;
  loading?: boolean;
  error?: Error | false;
  events?: any[];
  onSubmitForm?: () => React.EventHandler<React.FormEvent<any>>;
}

export class EventsPage extends React.Component<IEventsPageProps, {}> { // eslint-disable-line react/prefer-stateless-function

  public componentDidMount() {
    this.props.onSubmitForm();
  }

  public render() {
    const { loading, error, events } = this.props;
    const eventsListProps = {
      loading,
      error,
      events,
    };

    return (
      <div>
        <EventsList {...eventsListProps} />
      </div>
    );
  }
}

export function mapDispatchToProps(dispatch) {
  return {

    onSubmitForm: (evt) => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(loadEvents());
    },
  };
}

const mapStateToProps = createStructuredSelector({

  loading: selectLoading(),
  error: selectError(),
  events: makeQueryEvents(),
});

// Wrap the component to inject dispatch and state into it
export default connect<{}, {}, IEventsPageProps>(mapStateToProps, mapDispatchToProps)(EventsPage);
