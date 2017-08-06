import * as React from 'react';

import { withStyles, createStyleSheet } from 'material-ui/styles';
import Card, { CardContent } from 'material-ui/Card';
import IconButton from 'material-ui/IconButton';
import Typography from 'material-ui/Typography';
import PlayArrowIcon from 'material-ui-icons/PlayArrow';
import StopIcon from 'material-ui-icons/Stop';
import ReplayIcon from 'material-ui-icons/Replay';

import { LinearProgress } from 'material-ui/Progress';

import * as bootImage from '../../resources/boot.png';

const styleSheet = createStyleSheet({
  card: {
    display: 'flex',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
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
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 100,
    marginLeft: 10,
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: 8,
    paddingBottom: 8,
  },
  icon: {
    height: 25,
    width: 25,
  },
});

import TimeAgo from 'timeago-react';
import Pagination from '../Pagination';

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

    const listItems = apps.map(item =>
      <Card className={classes.card} key={item.metadata.guid}>
        <div className={classes.imageContainer}>
          <img src={bootImage} className={classes.image} />
        </div>
        <div className={classes.details}>
          <CardContent className={classes.content}>
            <Typography type="headline">
              {item.entity.name}
            </Typography>
            <div className={classes.data}>
              <Typography color="secondary" className={classes.dataItem}>
                <TimeAgo datetime={item.entity.package_updated_at} />
              </Typography>
              <Typography color="secondary" className={classes.dataItem}>
                Instances: {item.entity.instances}
              </Typography>
              <Typography color="secondary" className={classes.dataItem}>
                Memory: {item.entity.memory}
              </Typography>
            </div>
          </CardContent>
          <div className={classes.controls}>
            <IconButton aria-label="Start/Stop">
              {item.entity.state === 'STOPPED'
                ? <PlayArrowIcon className={classes.icon} />
                : <StopIcon className={classes.icon} />}
            </IconButton>
            <IconButton aria-label="Restart">
              <ReplayIcon className={classes.icon} />
            </IconButton>
          </div>
        </div>
      </Card>,
    );

    return (
      <div>
        {listItems}
      </div>
    );
  }
}

export default withStyles(styleSheet)(AppsBoard);
