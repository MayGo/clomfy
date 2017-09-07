import { AppAction } from '../../containers/AppsPage/AppActionEnum';

import * as React from 'react';

import ReactJson from 'react-json-view';

import { withStyles } from 'material-ui/styles';
import Card, { CardContent } from 'material-ui/Card';
import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';
import IconButton from 'material-ui/IconButton';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';

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
import { AppState } from 'app/containers/AppsPage/AppStateEnum';
import { Link } from 'react-router';

import AppBar from 'material-ui/AppBar';
import Tabs, { Tab } from 'material-ui/Tabs';

const styleSheet = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: 16,
    textAlign: 'center',
  },
  card: {
    display: 'flex',
  },

  header: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  filler: {
    flex: 1,
  },
  controls: {
    flexBasis: 'initial',
  },
  controlsBtn: {
    height: 30,
  },
  restageWrapper: {
    position: 'relative',
    display: 'inline-flex',
  },
  restageProgress: {
    position: 'absolute',
    top: 0,
    left: 8,
  },

  details: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
  content: {
    flex: '1 0 auto',
  },
  data: {
    display: 'flex',
    flexDirection: 'row',
  },
  dataItem: {
    paddingRight: 5,
  },
  imageContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  appIcon: {
    width: 20,
    height: 20,
    marginRight: 4,
  },

  icon: {
    height: 25,
    width: 25,
  },
  miniIcon: {
    height: 17,
    width: 17,
    paddingBottom: 3,
  },
  colorGreen: {
    color: green[300],
  },
  colorRed: {
    color: red[300],
  },
  green: {
    background: green[300],
  },
  red: {
    background: red[300],
  },
  instances: {
    display: 'flex',
    justifyContent: 'flex-end',
  },

  instanceItem: {
    width: 20,
    height: 20,
    display: 'flex',
    flexWrap: 'wrap',
    fontSize: 12,
    alignItems: 'center',
    borderRadius: '50%',
    alignContent: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
});

interface IListProps {
  loading?: boolean;
  error?: Error | boolean;
  app?: any;
  page?: number;
  classes?: any;
  total?: number;
  orderDirection: string;
  orderBy: string;
  changePage: any;
  changeRoute: any;
  onRequestSort: any;
  restageApp: any;
  startApp: any;
  stopApp: any;
}

interface IListState {
  value: number;
}

function TabContainer(props) {
  return (
    <div style={{ padding: 20 }}>
      {props.children}
    </div>
  );
}

class AppBoard extends React.Component<IListProps, IListState> {
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  public render() {
    const {
      loading,
      error,
      app,
      orderDirection,
      orderBy,
      classes,
      restageApp,
      startApp,
      stopApp,
      changeRoute,
    } = this.props;

    const { value } = this.state;

    if (loading) {
      return <LinearProgress mode="indeterminate" />;
    }

    if (!app) {
      return <p>No app</p>;
    }

    return (
      <div className={classes.root}>
        <div>
          <div>
            <Typography type="headline">
              {app.entity.name}
            </Typography>
          </div>
          <Tabs value={value} onChange={this.handleChange}>
            <Tab label="View" />
            <Tab label="Json" />
            <Tab label="Item Three" />
          </Tabs>
        </div>
        {value === 0 &&
          <TabContainer>
            {'Item one'}
          </TabContainer>}
        {value === 1 &&
          <TabContainer>
            <ReactJson src={app} />
          </TabContainer>}
        {value === 2 &&
          <TabContainer>
            {'Item Three'}
          </TabContainer>}
      </div>
    );
  }
}

export default withStyles(styleSheet)(AppBoard);
