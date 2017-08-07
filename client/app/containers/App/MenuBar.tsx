import * as React from 'react';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';

import Menu, { MenuItem } from 'material-ui/Menu';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';

import { connect, Dispatch } from 'react-redux';
import { Link } from 'react-router';
import { push, RouterAction } from 'react-router-redux';
import { LocationDescriptor, LocationState } from 'history';
import { IAppState } from './IAppState';
import {
  AppsRoute,
  BuildpacksRoute,
  HomeRoute,
  LoginRoute,
  EventsRoute,
} from '../../RoutePaths';
import { selectLocationState } from 'app/containers/App/selectors';
import { selectIsAuthenticated } from 'app/containers/Login/selectors';

import { bindRoutineCreators } from 'redux-saga-routines';
import { fetchLogout } from '../Login/routines';

import { createStructuredSelector } from 'reselect';

import { translate } from 'react-i18next';
import { FlatButton } from 'material-ui';

import { withStyles, createStyleSheet } from 'material-ui/styles';

interface IMenuBarOwnProps {
  t?: any;
  classes?: any;
}
interface IMenuBarStateProps {
  location: Location | null;
  isAuthenticated: boolean;
}
interface IMenuBarDispatchProps {
  changeRoute?: (route: string) => void;
  fetchLogout?: any;
}
type IMenuBarProps = IMenuBarOwnProps &
  IMenuBarStateProps &
  IMenuBarDispatchProps;

interface IMenuBarReactState {
  open: boolean;
  openNotif: boolean;
}

const styleSheet = createStyleSheet({
  logo: {
    fontFamily: ' "Berkshire Swash", cursive',
    fontWeight: 200,
    letterSpacing: 1,
    flex: 1,
  },
  root: {
    marginTop: 30,
    width: '100%',
  },
  menu: {
    width: 250,
  },
});

class MenuBar extends React.Component<IMenuBarProps, IMenuBarReactState> {
  constructor(props: IMenuBarProps, context: any) {
    super(props, context);
    this.state = { open: false, openNotif: false };
  }

  public render(): JSX.Element {
    const { t, isAuthenticated, classes } = this.props;
    const fetchLogoutProp = this.props.fetchLogout;
    const MenuItemCustom = (props: {
      name: string;
      path: string;
    }): React.ReactElement<MenuItem> =>
      <MenuItem
        disabled={this.props.location!.pathname === props.path}
        onTouchTap={this.handleNavigate(props.path)}
      >
        {props.name}
      </MenuItem>;

    return (
      <div>
        <AppBar position="static">
          <Toolbar>
            <IconButton color="contrast" aria-label="Menu">
              <MenuIcon onClick={this.handleToggle} />
            </IconButton>
            <Typography type="title" color="inherit" className={classes.logo}>
              Clomfy
            </Typography>
            {isAuthenticated
              ? <Button
                  color="contrast"
                  onClick={() => {
                    fetchLogoutProp.trigger();
                  }}
                >
                  {t('routes.logout')}
                </Button>
              : <Button href="#login" color="contrast">
                  {t('routes.login')}
                </Button>}
            <IconButton color="contrast" aria-label="Menu">
              <MenuIcon onClick={this.handleNotifToggle} />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer
          docked={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          <div className={classes.menu}>
            <MenuItemCustom name={t('routes.home')} path={HomeRoute} />
            <MenuItemCustom
              name={t('routes.buildpacks')}
              path={BuildpacksRoute}
            />
            <MenuItemCustom name={t('routes.apps')} path={AppsRoute} />
            <MenuItemCustom name={t('routes.events')} path={EventsRoute} />
            <MenuItemCustom name={t('routes.login')} path={LoginRoute} />
          </div>
        </Drawer>
        <Drawer
          anchor="right"
          docked={false}
          open={this.state.openNotif}
          onRequestClose={this.handleNotifClose}
        >
          <div className={classes.menu}>
            <MenuItemCustom name={t('routes.home')} path={HomeRoute} />
          </div>
        </Drawer>
      </div>
    );
  }
  /**
   * Changes the route
   *
   * @param  {string} route The route we want to go to
   */
  private handleNavigate = (route: string) => {
    return () => {
      this.props.changeRoute(route);
      this.setState({ open: false });
    };
  };

  private handleToggle = () => this.setState({ open: !this.state.open });
  private handleNotifToggle = () =>
    this.setState({ openNotif: !this.state.openNotif });
  private handleClose = () => this.setState({ open: false });
  private handleNotifClose = () => this.setState({ openNotif: false });
}

const mapStateToProps = createStructuredSelector({
  location: selectLocationState(),
  isAuthenticated: selectIsAuthenticated(),
});

export function mapDispatchToProps(dispatch: any) {
  return {
    ...bindRoutineCreators({ fetchLogout }, dispatch),
    changeRoute: url => dispatch(push(url)),
  };
}

export default connect<
  IMenuBarStateProps,
  IMenuBarDispatchProps,
  IMenuBarOwnProps
>(mapStateToProps, mapDispatchToProps)(
  translate()(withStyles(styleSheet)(MenuBar)),
);
