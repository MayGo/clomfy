/**
 * Testing the NotFoundPage
 */

import * as expect from 'expect';
import { shallow } from 'enzyme';
import * as React from 'react';

import { NotFound } from '../index';

/*
describe('<NotFound />', () => {
  it('should render the Page Not Found text', () => {
    const renderedComponent = shallow(
      <NotFound />,
    );
    expect(renderedComponent.contains(
      <H1>
        Not found
      </H1>)).toEqual(true);
  });

  it('should render a button', () => {
    const renderedComponent = shallow(
      <NotFound />,
    );
    const renderedButton = renderedComponent.find(Button);
    expect(renderedButton.length).toEqual(1);
  });

  it('should link to "/"', (done) => {
    const dispatch = (action) => {
      expect(action.payload.args).toEqual('/');
      done();
    };

    const renderedComponent = shallow(
      <NotFound dispatch={dispatch} />,
    );
    const button = renderedComponent.find(Button);
    button.prop<() => void>('handleRoute')();
  });
});*/
