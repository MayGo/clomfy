import * as React from 'react';

import { withStyles, createStyleSheet } from 'material-ui/styles';
import Card, { CardContent } from 'material-ui/Card';
import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';
import IconButton from 'material-ui/IconButton';
import Typography from 'material-ui/Typography';
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

const styleSheet = createStyleSheet({
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
    paddingLeft: 5,
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
  green: {
    background: green[300],
  },
  red: {
    background: red[300],
  },
  instanceItem: {
    width: 20,
    height: 20,
    display: 'flex',
    position: 'absolute',
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
  apps?: any[];
  page?: number;
  classes?: any;
  total?: number;
  orderDirection: string;
  orderBy: string;
  changePage: any;
  onRequestSort: any;
}
interface IListState {
  display: number;
}

class AppsBoard extends React.Component<IListProps, IListState> {
  constructor(props: any) {
    super(props);
    this.state = {
      display: 7,
    };
  }

  createSortHandler = (orderBy: string, orderDirection: string) => event => {
    console.log('Sorting apps:', orderBy, orderDirection);
    this.props.onRequestSort(
      orderBy,
      orderDirection === 'desc' ? 'asc' : 'desc',
    );
  };

  handleInstanceClick = event => {
    alert(1);
    //this.setState({ open: true, anchorEl: event.currentTarget });
  };

  public render() {
    const {
      loading,
      error,
      apps,
      orderDirection,
      orderBy,
      classes,
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

        return (
          <div
            key={key}
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

    const listItems = apps.map(item =>
      <Grid item xs={4} key={item.metadata.guid}>
        <Card className={classes.card}>
          <div className={classes.details}>
            <CardContent className={classes.content}>
              <div className={classes.header}>
                <Typography type="headline">
                  <img src={bootImage} className={classes.appIcon} />
                  {item.entity.name}
                </Typography>
                <div className={classes.filler} />
                <div className={classes.controls}>
                  <IconButton
                    aria-label="Start/Stop"
                    className={classes.controlsBtn}
                  >
                    {item.entity.state === 'STOPPED'
                      ? <PlayArrowIcon className={classes.icon} />
                      : <StopIcon className={classes.icon} />}
                  </IconButton>
                  <IconButton
                    aria-label="Restart"
                    className={classes.controlsBtn}
                  >
                    <ReplayIcon className={classes.icon} />
                  </IconButton>
                </div>
              </div>
              <div className={classes.data}>
                <Typography color="secondary" className={classes.dataItem}>
                  <TimerIcon className={classes.miniIcon} />
                  <TimeAgo datetime={item.entity.package_updated_at} />
                </Typography>
                <Typography color="secondary" className={classes.dataItem}>
                  <ComputerIcon className={classes.miniIcon} />
                  {item.entity.instances}
                </Typography>
                <Typography color="secondary" className={classes.dataItem}>
                  <MemoryIcon className={classes.miniIcon} />
                  {item.entity.memory}
                </Typography>
              </div>
              <div>
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

export default withStyles(styleSheet)(AppsBoard);
