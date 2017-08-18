import * as React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import compose from 'recompose/compose';

import { cyan500, pinkA200, red900, deepOrange500 } from 'material-ui/colors';

import { translate } from 'react-i18next';

import List, {
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
} from 'material-ui/List';

import Avatar from 'material-ui/Avatar';
import CodeIcon from 'material-ui-icons/Code';
import CloseIcon from 'material-ui-icons/Close';
import {
  selectError,
  makeQueryNotifications,
  selectLoading,
} from './selectors';

import Message from 'material-ui-icons/Message';

import ReactMaterialUiNotifications from 'react-materialui-notifications';

import * as moment from 'moment';

import TimeAgo from 'timeago-react';

interface IProps {
  events?: any[];

  t?: any;
}

class Notifications extends React.Component<IProps, {}> {
  iconForType: any = {
    'app.crash': <CloseIcon color="error" />,
    'audit.app.process.crash': <CloseIcon color="error" />,
  };
  state: any = {
    count: 0,
  };

  constructor(props: any) {
    super(props);
  }

  componentWillReceiveProps(nextProps: any) {
    const events: any[] = nextProps.events;
    console.log('New props:', events);

    if (events && events.length > 0) {
      events.forEach(event => this.showNotification(event.entity));
    }
  }

  showNotification = (entity: any) => {
    ReactMaterialUiNotifications.showNotification({
      title: entity.type,
      additionalText: `${entity.actee_type} ${entity.actee_name}`,
      icon: <Message />,
      iconBadgeColor: deepOrange500,
      timestamp: moment().format('h:mm A'),
    });
    // update notifications count
    this.setState({
      count: ++this.state.count,
    });
  };

  public render() {
    const { events } = this.props;

    const listItems = events.map(item => {
      const metadata = item.metadata;
      const entity = item.entity;
      return (
        <ListItem dense button key={metadata.guid}>
          <Avatar>
            {this.iconForType[entity.type]
              ? this.iconForType[entity.type]
              : <CodeIcon />}
          </Avatar>
          <ListItemText primary={entity.actee_name} secondary={entity.type} />
          <TimeAgo datetime={entity.timestamp} />
        </ListItem>
      );
    });
    return (
      <div>
        <List>
          {listItems}
        </List>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  events: makeQueryNotifications(),
});

export default connect<{}, {}, IProps>(mapStateToProps, undefined)(
  translate()(Notifications),
);
