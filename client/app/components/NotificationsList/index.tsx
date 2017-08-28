import * as React from 'react';

import { withStyles } from 'material-ui/styles';
import Card, { CardContent } from 'material-ui/Card';
import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';
import IconButton from 'material-ui/IconButton';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';

import List, {
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
} from 'material-ui/List';

import Avatar from 'material-ui/Avatar';
import CodeIcon from 'material-ui-icons/Code';
import CloseIcon from 'material-ui-icons/Close';

import { CircularProgress } from 'material-ui/Progress';

import PlayArrowIcon from 'material-ui-icons/PlayArrow';
import StopIcon from 'material-ui-icons/Stop';
import ReplayIcon from 'material-ui-icons/Replay';
import MemoryIcon from 'material-ui-icons/Memory';
import ComputerIcon from 'material-ui-icons/Computer';
import TimerIcon from 'material-ui-icons/Timer';

import { red, green } from 'material-ui/colors';

import Badge from 'material-ui/Badge';

import { LinearProgress } from 'material-ui/Progress';

import * as bootImage from '../../resources/boot.png';

import TimeAgo from 'timeago-react';

import * as classnames from 'classnames';

const styleSheet = theme => ({
  timeAgo: {
    fontSize: 11,
  },
  timestamp: {
    fontSize: 11,
    paddingRight: 5,
    color: 'rgba(0, 0, 0, 0.54)',
  },
  list: {
    display: 'flex',
    flexDirection: 'column',
  },
  itemBlock: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
  },
  timeBlock: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
  },
});

interface IListProps {
  loading?: boolean;
  error?: Error | boolean;
  events?: any[];
  classes?: any;
  t?: any;
}

interface IListState {
  display: number;
}

class NotificationsList extends React.Component<IListProps, IListState> {
  iconForType: any = {
    'app.crash': <CloseIcon color="error" />,
    'audit.app.process.crash': <CloseIcon color="error" />,
  };

  public render() {
    const { events, t, classes } = this.props;

    const listItems = events.map(item => {
      const metadata = item.metadata;
      const entity = item.entity;
      return (
        <ListItem dense button key={metadata.guid} className={classes.list}>
          <div className={classes.itemBlock}>
            <Avatar>
              {this.iconForType[entity.type]
                ? this.iconForType[entity.type]
                : <CodeIcon />}
            </Avatar>
            <ListItemText primary={entity.actee_name} secondary={entity.type} />
          </div>
          <div className={classes.timeBlock}>
            <span className={classes.timestamp}>
              {t('dateTime', { date: new Date(entity.timestamp) })}
            </span>
            <TimeAgo datetime={entity.timestamp} className={classes.timeAgo} />
          </div>
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

export default withStyles(styleSheet)(NotificationsList);
