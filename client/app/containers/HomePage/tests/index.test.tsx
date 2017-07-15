/**
 * Test the HomePage
 */

import * as expect from 'expect';
import { shallow, mount } from 'enzyme';
import * as React from 'react';


import { HomePage, mapDispatchToProps } from '../index';
import { changeUsername } from '../actions';
import { loadRepos } from '../../App/actions';
import { push } from 'react-router-redux';
import RepoListItem from 'app/containers/RepoListItem';
import List from 'app/components/List';
import LoadingIndicator from 'app/components/LoadingIndicator';

describe('<HomePage />', () => {
  it('should render the loading indicator when its loading', () => {
    const renderedComponent = shallow(
      <HomePage loading />,
    );
    expect(renderedComponent.contains(<List component={LoadingIndicator} />)).toEqual(true);
  });



  it('should render the repositories if loading was successful', () => {
    const repos = [{
      owner: {
        login: 'mxstbr',
      },
      html_url: 'https://github.com/mxstbr/react-boilerplate',
      name: 'react-boilerplate',
      open_issues_count: 20,
      full_name: 'mxstbr/react-boilerplate',
    }];
    const renderedComponent = shallow(
      <HomePage
        repos={repos}
        error={false}
      />,
    );

    expect(renderedComponent.contains(<List items={repos} component={RepoListItem} />)).toEqual(true);
  });

 

  describe('mapDispatchToProps', () => {
    describe('onChangeUsername', () => {
      it('should be injected', () => {
        const dispatch = expect.createSpy();
        const result = mapDispatchToProps(dispatch);
        expect(result.onChangeUsername).toExist();
      });

      it('should dispatch changeUsername when called', () => {
        const dispatch = expect.createSpy();
        const result = mapDispatchToProps(dispatch);
        const username = 'mxstbr';
        result.onChangeUsername({ target: { value: username } });
        expect(dispatch).toHaveBeenCalledWith(changeUsername(username));
      });
    });
  });

  describe('changeRoute', () => {
    it('should be injected', () => {
      const dispatch = expect.createSpy();
      const result = mapDispatchToProps(dispatch);
      expect(result.changeRoute).toExist();
    });

    it('should dispatch push when called', () => {
      const dispatch = expect.createSpy();
      const result = mapDispatchToProps(dispatch);
      const route = '/';
      result.changeRoute(route);
      expect(dispatch).toHaveBeenCalledWith(push(route));
    });
  });

  describe('onSubmitForm', () => {
    it('should be injected', () => {
      const dispatch = expect.createSpy();
      const result = mapDispatchToProps(dispatch);
      expect(result.onSubmitForm).toExist();
    });

    it('should dispatch loadRepos when called', () => {
      const dispatch = expect.createSpy();
      const result = mapDispatchToProps(dispatch);
      result.onSubmitForm(undefined);
      expect(dispatch).toHaveBeenCalledWith(loadRepos());
    });

    it('should preventDefault if called with event', () => {
      const preventDefault = expect.createSpy();
      const result = mapDispatchToProps(() => { }); // tslint:disable-line:no-empty
      const evt = { preventDefault };
      result.onSubmitForm(evt);
      expect(preventDefault).toHaveBeenCalledWith();
    });
  });
});
