import muiTheme from '../../muiTheme';
import * as React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import compose from 'recompose/compose';

import TextField from 'material-ui/TextField';

import Avatar from 'material-ui/Avatar';
import { Card, CardActions } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import CircularProgress from 'material-ui/CircularProgress';
import LockIcon from 'material-ui/svg-icons/action/lock-outline';

import { loginRequest, changeForm } from './actions';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import { cyan500, pinkA200, red900 } from 'material-ui/styles/colors';

import { translate } from 'react-i18next';

import { propTypes, reduxForm, Field } from 'redux-form';

import { selectError, makeQueryFormState, makeQueryCurrentlySending, selectLoading } from "./selectors";
import { LinearProgress } from "material-ui";

interface ILoginPageProps {
  dispatch?: (route: string) => void;
  onLogin?: (username: string, password: string) => React.EventHandler<React.FormEvent<any>>;
  formState?: any,
  submitting?: any,
  error?: any,
  loading?: boolean,
  history?: any;
  t?: any;

  onChangeUsername?: () => React.EventHandler<React.FormEvent<any>>;
  onChangePassword?: () => React.EventHandler<React.FormEvent<any>>;
}

// see http://redux-form.com/6.4.3/examples/material-ui/
const renderInput = ({ meta: { touched = false, error = '' } = {}, input: { ...inputProps }, ...props }) =>
  <TextField
    errorText={touched && error}
    {...inputProps}
    {...props}
    fullWidth
  />;

const styles: any = {
  main: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: muiTheme.palette.primary1Color
  },
  card: {
    minWidth: 300,
  },
  avatar: {
    margin: '1em',
    textAlign: 'center ',
  },
  form: {
    padding: '0 1em 1em 1em',
  },
  input: {
    display: 'flex',
  },
  error: {
    color: red900,
    paddingTop: 5
  }
};

class LoginPage extends React.Component<ILoginPageProps, {}>  {
  constructor(props) {
    super(props)

    this.login = this.login.bind(this);
  }
  render() {
    const { submitting, formState, t, error, loading } = this.props;

    return (
      <div>
        <div style={styles.main}>
          <Card style={styles.card}>
            {loading && <LinearProgress mode="indeterminate" />}

            <div style={styles.avatar}>
              <Avatar backgroundColor={muiTheme.palette.accent1Color} icon={<LockIcon />} size={60} />
              <div style={styles.error}>{error}</div>
            </div>
            <form onSubmit={this.login}>
              <div style={styles.form}>
                <div style={styles.input} >
                  <TextField
                    floatingLabelText={t('login.username')}
                    onChange={this.props.onChangeUsername}
                    value={formState.username}
                  />

                </div>
                <div style={styles.input}>
                  <TextField
                    floatingLabelText={t('login.password')}
                    onChange={this.props.onChangePassword}
                    type="password"
                    value={formState.password}
                  />
                </div>
              </div>
              <CardActions>
                <RaisedButton
                  type="submit"
                  primary
                  disabled={submitting}
                  icon={submitting && <CircularProgress size={25} thickness={2} />}
                  label={t('login.signIn')}
                  fullWidth
                />
              </CardActions>
            </form>
          </Card>
        </div>
      </div>
    )
  }

  login(e) {
    console.log("Login submitted");
    this.props.onLogin(this.props.formState.username, this.props.formState.password);
    e.preventDefault();
  }
}

export function mapDispatchToProps(dispatch, ownProps) {
  return {
    onLogin: (username: string, password: string) => {
      dispatch(loginRequest({ username, password }));
    },
    onChangeUsername: (evt) => dispatch(changeForm({ username: evt.target.value })),
    onChangePassword: (evt) => dispatch(changeForm({ password: evt.target.value })),

    dispatch,
  };
}

const mapStateToProps = createStructuredSelector({
  formState: makeQueryFormState(),
  submitting: makeQueryCurrentlySending(),
  error: selectError(),
  loading: selectLoading()
});

export default connect<{}, {}, ILoginPageProps>(mapStateToProps, mapDispatchToProps)(translate()(LoginPage));
