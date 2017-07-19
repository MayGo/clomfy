
import * as React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { browserHistory } from 'react-router';
import { setRedirectUrl } from "app/containers/App/actions";

interface IPageProps {
    dispatch?: (route: string) => void;
    currentURL?: string;
    isLoggedIn?: boolean;
    onChangeRedirectUrl?: (url: string) => void;
}


class EnsureLoggedInContainer extends React.Component<IPageProps, {}> {
    componentDidMount() {
        const { dispatch, currentURL, isLoggedIn } = this.props

        if (!isLoggedIn) {
            // set the current url/path for future redirection (we use a Redux action)
            // then redirect (we use a React Router method)
            this.props.onChangeRedirectUrl(currentURL);
            browserHistory.replace("/login")
        }
    }

    render(): any {
        const { isLoggedIn } = this.props
        if (isLoggedIn) {
            return this.props.children
        } else {
            return null
        }
    }
}

export function mapDispatchToProps(dispatch) {
  return {
    onChangeRedirectUrl: (url) => dispatch(setRedirectUrl(url))
  };
}
const mapStateToProps = createStructuredSelector({
    loggedIn: (state) => state.get('loggedIn'),
    currentURL: (state, ownProps) => ownProps.location.pathname
});

export default connect<{}, {}, IPageProps>(mapStateToProps, undefined)(EnsureLoggedInContainer);