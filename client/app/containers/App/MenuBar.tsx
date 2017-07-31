import * as React from 'react';
import MuiAppBar from 'material-ui/AppBar';
import MuiDrawer from 'material-ui/Drawer';
import MuiMenuItem from 'material-ui/MenuItem';

import { connect, Dispatch } from 'react-redux';
import { Link } from 'react-router';
import { push, RouterAction } from 'react-router-redux';
import { LocationDescriptor, LocationState } from 'history';
import { IAppState } from './IAppState';
import { AppsRoute, BuildpacksRoute, HomeRoute, LoginRoute, EventsRoute } from '../../RoutePaths';
import { selectLocationState } from 'app/containers/App/selectors';
import { selectIsAuthenticated } from 'app/containers/Login/selectors';


import { bindRoutineCreators } from 'redux-saga-routines';
import { fetchLogout } from '../Login/routines';

import { createStructuredSelector } from 'reselect';

import { translate } from 'react-i18next';
import { FlatButton } from "material-ui";

interface IMenuBarOwnProps {
  t?: any
}
interface IMenuBarStateProps {
  location: Location | null;
  isAuthenticated: boolean;
}
interface IMenuBarDispatchProps {
  changeRoute?: (route: string) => void;
  fetchLogout?: any;
}
type IMenuBarProps = IMenuBarOwnProps & IMenuBarStateProps & IMenuBarDispatchProps;

interface IMenuBarReactState {
  open: boolean;
}

const styles: any = {
  logo: {
    fontFamily: " 'Berkshire Swash', cursive",
    fontWeight: 200,
    letterSpacing: 1
  }
};

class MenuBar extends React.Component<IMenuBarProps, IMenuBarReactState> {

  constructor(props: IMenuBarProps, context: any) {
    super(props, context);
    this.state = { open: false };
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
  }

  public render(): JSX.Element {

    let { t, isAuthenticated, fetchLogout } = this.props;
    const MenuItem = (props: { name: string, path: string }): React.ReactElement<MuiMenuItem> => (
      <MuiMenuItem disabled={this.props.location!.pathname === props.path}
        onTouchTap={this.handleNavigate(props.path)}>{props.name}</MuiMenuItem>
    );

    return (
      <div>
        <MuiAppBar onLeftIconButtonTouchTap={this.handleToggle}
          titleStyle={styles.logo}
          iconElementRight={isAuthenticated ? <FlatButton label={t('routes.logout')} onClick={fetchLogout.trigger} /> : <FlatButton label={t('routes.login')} containerElement={<Link to="/login" />} />}
          title="Clomfy" />
        <MuiDrawer docked={false} width={250} open={this.state.open}
          onRequestChange={(open) => this.setState({ open })}>
          <MenuItem name={t('routes.home')} path={HomeRoute} />
          <MenuItem name={t('routes.buildpacks')} path={BuildpacksRoute} />
          <MenuItem name={t('routes.apps')} path={AppsRoute} />
          <MenuItem name={t('routes.events')} path={EventsRoute} />
          <MenuItem name={t('routes.login')} path={LoginRoute} />
        </MuiDrawer>
      </div>
    );
  }

  private handleToggle = () => this.setState({ open: !this.state.open });
}

const mapStateToProps = createStructuredSelector({
  location: selectLocationState(),
  isAuthenticated: selectIsAuthenticated()
});

export function mapDispatchToProps(dispatch) {
  return {
    ...bindRoutineCreators({ fetchLogout }, dispatch),
    changeRoute: (url) => dispatch(push(url))
  };
}

export default connect<IMenuBarStateProps, IMenuBarDispatchProps, IMenuBarOwnProps>(mapStateToProps, mapDispatchToProps)(translate()(MenuBar));
