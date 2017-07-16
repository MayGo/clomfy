import * as React from 'react';
import MuiAppBar from 'material-ui/AppBar';
import MuiDrawer from 'material-ui/Drawer';
import MuiMenuItem from 'material-ui/MenuItem';

import { connect, Dispatch } from 'react-redux';
import { push, RouterAction } from 'react-router-redux';
import { LocationDescriptor, LocationState } from 'history';
import { IAppState } from './IAppState';
import { BuildpacksRoute, CounterListRoute, HomeRoute, LoginRoute } from '../../RoutePaths';
import { selectLocationState } from 'app/containers/App/selectors';

import { createStructuredSelector } from 'reselect';

interface IMenuBarOwnProps {
  title: string;
}
interface IMenuBarStateProps {
  location: Location | null;
}
interface IMenuBarDispatchProps {
  changeRoute?: (route: string) => void;
}
type IMenuBarProps = IMenuBarOwnProps & IMenuBarStateProps & IMenuBarDispatchProps;

interface IMenuBarReactState {
  open: boolean;
}

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

    const MenuItem = (props: { name: string, path: string }): React.ReactElement<MuiMenuItem> => (
      <MuiMenuItem disabled={this.props.location!.pathname === props.path}
        onTouchTap={this.handleNavigate(props.path)}>{props.name}</MuiMenuItem>
    );

    return (
      <div>
        <MuiAppBar onLeftIconButtonTouchTap={this.handleToggle} title={this.props.title} />
        <MuiDrawer docked={false} width={250} open={this.state.open}
          onRequestChange={(open) => this.setState({ open })}>
          <MenuItem name='Home' path={HomeRoute} />
          <MenuItem name='Counter List' path={CounterListRoute} />
          <MenuItem name='Buildpacks' path={BuildpacksRoute} />
          <MenuItem name='Login' path={LoginRoute} />
        </MuiDrawer>
      </div>
    );
  }

  private handleToggle = () => this.setState({ open: !this.state.open });
}

const mapStateToProps = createStructuredSelector({
  location: selectLocationState()
});

export function mapDispatchToProps(dispatch) {
  return {
    changeRoute: (url) => dispatch(push(url)),
    dispatch,
  };
}

export default connect<IMenuBarStateProps, IMenuBarDispatchProps, IMenuBarOwnProps>(mapStateToProps, mapDispatchToProps)(MenuBar);
