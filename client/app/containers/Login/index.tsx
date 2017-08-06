import muiTheme from '../../muiTheme';
import * as React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import compose from 'recompose/compose';

import { withStyles, createStyleSheet } from 'material-ui/styles';
import TextField from 'material-ui/TextField';

import Avatar from 'material-ui/Avatar';

import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card';
import Button from 'material-ui/Button';
import { CircularProgress } from 'material-ui/Progress';
import LockIcon from 'material-ui-icons/LockOutline';

import { changeForm } from './actions';

import { red900 } from 'material-ui/colors';

import { translate } from 'react-i18next';

import { propTypes, reduxForm, Field } from 'redux-form';

import { makeQueryFormState } from './selectors';
import { LinearProgress } from 'material-ui';

import { bindRoutineCreators } from 'redux-saga-routines';
import { fetchLogin } from './routines';
import { selectLoading } from './selectors';

interface ILoginPageProps {
  classes: any;
  dispatch?: (route: string) => void;
  formState?: any;
  fetchLogin: any;
  submitting?: any;
  error?: any;
  loading?: boolean;
  history?: any;
  t?: any;

  onChangeUsername?: () => React.EventHandler<React.FormEvent<any>>;
  onChangePassword?: () => React.EventHandler<React.FormEvent<any>>;
}

const styleSheet = createStyleSheet({
  main: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: muiTheme.palette.primary1Color,
  },
  card: {
    minWidth: 300,
  },
  avatar: {
    margin: '1em',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    padding: '0 1em 1em 1em',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  input: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  submit: {
    width: '100%',
  },
  error: {
    color: red900,
    paddingTop: 5,
  },
});

class LoginPage extends React.Component<ILoginPageProps, {}> {
  constructor(props: any) {
    super(props);

    this.login = this.login.bind(this);
  }

  login(e: any) {
    console.log('Login submitted:', this.props.formState);

    this.props.fetchLogin.trigger(this.props.formState);
    e.preventDefault();
  }

  render() {
    const { classes, submitting, formState, t, error, loading } = this.props;

    return (
      <div>
        <div className={classes.main}>
          <Card className={classes.card}>
            <CardMedia className={classes.avatar}>
              <Avatar>
                <LockIcon />
              </Avatar>
              <div className={classes.error}>
                {error}
              </div>
            </CardMedia>
            <form onSubmit={this.login}>
              <CardContent>
                <div className={classes.form}>
                  <TextField
                    label={t('login.username')}
                    onChange={this.props.onChangeUsername}
                    value={formState.username}
                    margin="normal"
                    fullWidth
                  />

                  <TextField
                    label={t('login.password')}
                    onChange={this.props.onChangePassword}
                    type="password"
                    margin="normal"
                    value={formState.password}
                    fullWidth
                  />
                </div>
              </CardContent>

              <CardActions>
                {loading && <LinearProgress mode="indeterminate" />}

                <Button
                  raised
                  type="submit"
                  color="primary"
                  className={classes.submit}
                  disabled={loading}
                >
                  {t('login.signIn')}
                </Button>
              </CardActions>
            </form>
          </Card>
        </div>
      </div>
    );
  }
}

export function mapDispatchToProps(dispatch: any, ownProps: any) {
  return {
    ...bindRoutineCreators({ fetchLogin }, dispatch),
    onChangeUsername: evt =>
      dispatch(changeForm({ username: evt.target.value })),
    onChangePassword: evt =>
      dispatch(changeForm({ password: evt.target.value })),

    dispatch,
  };
}

const mapStateToProps = createStructuredSelector({
  formState: makeQueryFormState(),
  loading: selectLoading(),
});

export default connect<{}, {}, ILoginPageProps>(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styleSheet)(translate()(LoginPage)));
