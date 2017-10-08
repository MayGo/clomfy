import { AppAction } from '../../containers/AppsPage/AppActionEnum';

import * as React from 'react';

import { withStyles, StyleRules } from 'material-ui/styles';
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
import { Link } from 'react-router-dom';

const styles: StyleRules = {
  root: {
    flexGrow: 1,
    marginTop: 30,
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
};

interface IListProps {
  loading?: boolean;
  error?: Error | boolean;
  apps?: any[];
  page?: number;
  classes?: any;
  total?: number;
  orderDirection: string;
  orderBy: string;
  changePage: any;
  onRequestSort: any;
  restageApp: any;
  startApp: any;
  stopApp: any;
  changeRoute?: (route: string) => void;
}

interface IListState {
  display: number;
}

class AppsBoard extends React.Component<IListProps, IListState> {
  public render() {
    const {
      loading,
      error,
      apps,
      orderDirection,
      orderBy,
      classes,
      restageApp,
      startApp,
      stopApp,
      changeRoute,
    } = this.props;

    if (loading) {
      return <LinearProgress mode="indeterminate" />;
    }

    if (error !== false) {
      return <p>Something went wrong, please try again!</p>;
    }
    if (!apps) {
      return <p>No apps</p>;
    }

    const instancesItems = app => {
      if (!app.instances) {
        return <div>...</div>;
      }

      return Object.entries(app.instances).map(([key, item]) => {
        const isRunning = item.state === 'RUNNING';
        const tooltipText = `State: ${item.state} | Uptime: ${item.uptime} | Since: ${item.since}`;

        return (
          <div
            key={key}
            data-balloon={tooltipText}
            data-balloon-pos="right"
            className={classnames(
              classes.instanceItem,
              isRunning ? classes.green : classes.red,
            )}
          >
            {parseInt(key) + 1}
          </div>
        );
      });
    };

    const controls = item => {
      let startStopBtn;
      if (item.entity.state === 'STOPPED') {
        startStopBtn = (
          <IconButton
            aria-label="Start"
            className={classes.controlsBtn}
            onClick={() => startApp(item.metadata.guid)}
          >
            <PlayArrowIcon className={classes.icon} />
          </IconButton>
        );
      } else {
        startStopBtn = (
          <IconButton
            aria-label="Stop"
            className={classes.controlsBtn}
            onClick={() => stopApp(item.metadata.guid)}
          >
            <StopIcon className={classes.icon} />
          </IconButton>
        );
      }

      let isRestageTriggered = item.entity.state === AppState.RESTAGE_TRIGGERED;
      let isRestaging =
        item.entity.state === AppState.RESTAGING || isRestageTriggered;

      return (
        <div className={classes.controls}>
          {startStopBtn}
          <div className={classes.restageWrapper}>
            <IconButton
              aria-label="Restage"
              className={classes.controlsBtn}
              onClick={() => restageApp(item.metadata.guid)}
            >
              <ReplayIcon className={classes.icon} />
            </IconButton>
            {isRestaging &&
              <CircularProgress
                size={30}
                className={classnames(
                  classes.restageProgress,
                  isRestageTriggered ? classes.colorRed : classes.colorGreen,
                )}
              />}
          </div>
        </div>
      );
    };

    const listItems = apps.map(item =>
      <Grid item xs={4} key={item.metadata.guid}>
        <Card className={classes.card}>
          <div className={classes.details}>
            <CardContent className={classes.content}>
              <div className={classes.header}>
                <Typography type="headline">
                  <img src={bootImage} className={classes.appIcon} />
                  <Button
                    dense
                    color="accent"
                    onClick={() => changeRoute(`/apps/${item.metadata.guid}`)}
                  >
                    {item.entity.name}
                  </Button>
                </Typography>

                <div className={classes.filler} />
                {controls(item)}
              </div>
              <div className={classes.data}>
                <Typography color="secondary" className={classes.dataItem}>
                  <TimerIcon className={classes.miniIcon} />
                  <TimeAgo datetime={item.entity.package_updated_at} />
                </Typography>

                <Typography color="secondary" className={classes.dataItem}>
                  <MemoryIcon className={classes.miniIcon} />
                  {item.entity.memory}
                </Typography>
              </div>
              <div className={classes.instances}>
                <Typography color="secondary" className={classes.dataItem}>
                  <ComputerIcon className={classes.miniIcon} />
                  {item.entity.instances}
                </Typography>
                {instancesItems(item)}
              </div>
            </CardContent>
          </div>
        </Card>
      </Grid>,
    );

    return (
      <div className={classes.root}>
        <Grid container spacing={24}>
          {listItems}
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(AppsBoard);
