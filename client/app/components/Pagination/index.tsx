import * as React from 'react';

import { withStyles, StyleRules } from 'material-ui/styles';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import NavigationFirstPage from 'material-ui-icons/FirstPage';
import NavigationLastPage from 'material-ui-icons/LastPage';

const styles: StyleRules = {
  root: {
    display: 'flex',
  },
  button: {
    margin: 0,
    minWidth: 16,
  },
  iconButton: {
    margin: 0,
    minWidth: 16,
  },
};

const calculateRange = arg => {
  const { total, current, display } = arg;
  let end = total;
  let start = 1;
  if (display < end) {
    // rounded to the nearest integer smaller
    let beforeNumber = Math.round(display / 2 - 0.5);
    const afterNumber = beforeNumber;
    if (display % 2 === 0) {
      beforeNumber -= 1;
    }

    if (current <= beforeNumber + 1) {
      end = display;
    } else if (current >= total - afterNumber) {
      start = total - display + 1;
    } else {
      start = current - beforeNumber;
      end = current + afterNumber;
    }
  }

  return { end, start };
};

const getStateFromProps = props => {
  let { total, current, display } = props;
  total = total > 0 ? total : 1;
  current = current > 0 ? current : 1;
  display = display > 0 ? display : 1;
  current = current < total ? current : total;
  display = display < total ? display : total;
  return { current, display, total };
};

interface IProps {
  total: number;
  current: number;
  display: number;
  onChange: any;
  classes?: any;
}
interface IState {
  current: number;
  display: number;
  total: number;
  start: number;
  end: number;
}

const PageBtn = ({ value, isActive, onClick, className }) =>
  <Button
    className={className}
    color={isActive ? 'primary' : 'default'}
    onClick={onClick}
  >
    {value.toString()}
  </Button>;

const FirstPageLink = ({ onClick, className }) =>
  <Button className={className} onClick={onClick}>
    <NavigationFirstPage />
  </Button>;

const LastPageLink = ({ onClick, className }) =>
  <Button className={className} onClick={onClick}>
    <NavigationLastPage />
  </Button>;

class Pagination extends React.Component<IProps, IState> {
  constructor(props: any) {
    super(props);
    const tem = getStateFromProps(props);
    this.setCurrent = this.setCurrent.bind(this);

    this.state = {
      ...tem,
      ...calculateRange(tem),
    };
  }

  componentWillReceiveProps(nextProps: IProps) {
    const tem = getStateFromProps(nextProps);
    this.setState({
      ...tem,
      ...calculateRange(tem),
    });
  }

  setCurrent(current: number) {
    const tem = { ...this.state, current };
    this.props.onChange(current);
    this.setState({
      ...tem,
      ...calculateRange(tem),
    });
  }

  render() {
    const classes = this.props.classes;
    const array = [];
    for (let i = this.state.start; i <= this.state.end; i += 1) {
      array.push(i);
    }

    return (
      <div className={classes.root}>
        <FirstPageLink
          onClick={() => this.setCurrent(1)}
          className={classes.iconButton}
        />
        {array.map((page, k) =>
          <PageBtn
            key={k}
            value={page}
            isActive={this.state.current === page}
            onClick={() => this.setCurrent(page)}
            className={classes.button}
          />,
        )}
        <LastPageLink
          onClick={() => this.setCurrent(this.state.total)}
          className={classes.iconButton}
        />
      </div>
    );
  }
}

export default withStyles(styles)(Pagination);
