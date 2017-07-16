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

import { cyan500, pinkA200 } from 'material-ui/styles/colors';

import { propTypes, reduxForm, Field } from 'redux-form';

import { makeQueryFormState, makeQueryCurrentlySending } from "app/containers/Login/selectors";
import { selectError } from "app/containers/App/selectors";

interface ILoginPageProps {
  dispatch?: (route: string) => void;
  onLogin?: (username: string, password: string) => React.EventHandler<React.FormEvent<any>>;
  formState?: any,
  submitting?: any,
  error?: any,
  history?: any;

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

const styles = {
  main: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    alignItems: 'center',
    justifyContent: 'center',
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
};
function getColorsFromTheme(theme) {
  if (!theme) return { primary1Color: cyan500, accent1Color: pinkA200 };
  const {
        palette: {
            primary1Color,
    accent1Color,
        },
      } = theme;
  return { primary1Color, accent1Color };
}

class LoginPage extends React.Component<ILoginPageProps, {}>  {
  constructor(props) {
    super(props)

    this.login = this.login.bind(this);
  }
  render() {
    const { submitting, formState } = this.props;
    return (
      <div >
        <Card style={styles.card}>
          <div style={styles.avatar}>
            <Avatar icon={<LockIcon />} size={60} />
          </div>
          <form onSubmit={this.login}>
            <div style={styles.form}>
              <div style={styles.input} >
                <TextField
                  hintText="Username"
                  onChange={this.props.onChangeUsername}
                  value={formState.username}
                />

              </div>
              <div style={styles.input}>
                <TextField
                  hintText="Password"
                  onChange={this.props.onChangePassword}
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
                label="Sign in"
                fullWidth
              />
            </CardActions>
          </form>
        </Card>
      </div>
    )
  }

  login() {
    this.props.onLogin(this.props.formState.username, this.props.formState.password);
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
  error: selectError()
});

export default connect<{}, {}, ILoginPageProps>(mapStateToProps, mapDispatchToProps)(LoginPage);
