
import * as React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import compose from 'recompose/compose';

import { cyan500, pinkA200, red900, deepOrange500 } from 'material-ui/styles/colors';

import { translate } from 'react-i18next';

import { selectError, makeQueryNotifications, selectLoading } from "./selectors";

import Message from 'material-ui/svg-icons/communication/message';

import ReactMaterialUiNotifications from 'react-materialui-notifications';

import * as moment from 'moment';

interface IProps {

  events?: Array<any>,
  t?: any;
}

class Notifications extends React.Component<IProps, {}>  {
  constructor(props) {
    super(props)
  }

  componentWillReceiveProps(nextProps) {
    let events: Array<any> = nextProps.events;
    console.log("New props:", events);
    if (events && events.length > 0) {
      events.forEach((event) => this.showNotification(event.entity));
    }

  }

  state = {
    count: 0
  }

  showNotification = (entity: any) => {
    ReactMaterialUiNotifications.showNotification({
      title: entity.type,
      additionalText: `${entity.actee_type} ${entity.actee_name}`,
      icon: <Message />,
      iconBadgeColor: deepOrange500,
      timestamp: moment().format('h:mm A')
    })
    // update notifications count
    this.setState({
      count: ++this.state.count
    })
  }
  public render() {
    return <ReactMaterialUiNotifications
      desktop={true}
      transitionName={{
        leave: 'dummy',
        leaveActive: 'fadeOut',
        appear: 'dummy',
        appearActive: 'zoomInUp'
      }}
      transitionAppear={true}
      transitionLeave={true} />;
  }

}

const mapStateToProps = createStructuredSelector({
  events: makeQueryNotifications(),
});

export default connect<{}, {}, IProps>(mapStateToProps, undefined)(translate()(Notifications));
