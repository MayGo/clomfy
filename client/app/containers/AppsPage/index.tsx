import { changePage, order } from './actions';

import { bindRoutineCreators } from 'redux-saga-routines';
import { fetchApps, changeAppState } from './routines';

import * as React from 'react';
import AppsList from 'app/components/AppsList';
import AppsBoard from 'app/components/AppsBoard';
import toJS from 'app/components/ToJs';

import {
  makeQueryApps,
  selectLoading,
  selectError,
  selectTotal,
  selectOrderBy,
  selectOrderDirection,
  selectPage,
} from './selectors';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { AppAction } from 'app/containers/AppsPage/AppActionEnum';
import { push } from 'react-router-redux';

interface IAppsPageProps {
  fetchApps: any;
  loading?: boolean;
  error?: Error | false;
  page: number;
  total: number;
  orderDirection: string;
  orderBy: string;
  apps?: any[];
  onRequestSort: any;
  changePage: any;
  changeAppState: any;
  changeRoute?: (route: string) => void;
}

export class AppsPage extends React.Component<IAppsPageProps, {}> {
  constructor(props) {
    super(props);
  }
  public componentDidMount() {
    console.log('Load initial apps');
    this.props.changePage(1);
  }

  public render() {
    const {
      loading,
      error,
      page,
      apps,
      total,
      orderDirection,
      orderBy,
      onRequestSort,
      changeAppState,
      changeRoute,
    } = this.props;

    const appsListProps = {
      loading,
      error,
      apps,
      page,
      total,
      orderDirection,
      orderBy,
      onRequestSort,
      changeRoute,
    };

    return (
      <div>
        <AppsBoard
          {...appsListProps}
          restageApp={guid =>
            changeAppState.trigger({
              guids: [guid],
              action: AppAction.RESTAGE,
            })}
          startApp={guid =>
            changeAppState.trigger({
              guids: [guid],
              action: AppAction.START,
            })}
          stopApp={guid =>
            changeAppState.trigger({
              guids: [guid],
              action: AppAction.STOP,
            })}
          changePage={currentPage => this.props.changePage(currentPage)}
        />
      </div>
    );
  }
}

export function mapDispatchToProps(dispatch: any) {
  return {
    changePage: (page: number) => dispatch(changePage({ page })),
    ...bindRoutineCreators({ changeAppState }, dispatch),
    ...bindRoutineCreators({ fetchApps }, dispatch),
    onRequestSort: (orderBy: string, orderDirection: string) =>
      dispatch(order({ orderBy, orderDirection })),
    changeRoute: url => dispatch(push(url)),
  };
}

const mapStateToProps = createStructuredSelector({
  loading: selectLoading(),
  error: selectError(),
  apps: makeQueryApps(),
  total: selectTotal(),
  orderBy: selectOrderBy(),
  page: selectPage(),
  orderDirection: selectOrderDirection(),
});

// Wrap the component to inject dispatch and state into it
export default connect<{}, {}, IAppsPageProps>(
  mapStateToProps,
  mapDispatchToProps,
)(toJS(AppsPage));
